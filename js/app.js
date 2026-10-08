/**
 * ÁRBOL DE DECISIONES 1: CONTROLADOR PRINCIPAL DE LA APLICACIÓN
 * Gestiona el ciclo de vida, transiciones, renderizado dinámico,
 * enrutamiento por nodos, accesibilidad y atajos de teclado.
 */

class DecisionApp {
  constructor() {
    this.data = window.DECISION_TREE_DATA;
    this.currentNodeId = 'portada';
    this.history = [];
    this.visitedNodes = new Set(['portada']);
    this.isMapOpen = false;

    // Elementos DOM principales
    this.mainContainer = document.getElementById('app-main');
    this.progressBar = document.getElementById('progress-fill');
    this.progressStep = document.getElementById('progress-step-text');
    this.breadcrumbsNav = document.getElementById('breadcrumbs-container');
    this.mapModal = document.getElementById('map-modal');
    this.btnMapTrigger = document.getElementById('btn-open-map');
    this.btnCloseMap = document.getElementById('btn-close-map');
    this.btnBack = document.getElementById('btn-nav-back');
    this.btnRestart = document.getElementById('btn-nav-restart');
    this.btnSoundToggle = document.getElementById('btn-toggle-sound');

    // Inicializar visualizador de mapa
    this.treeMapViewer = new window.TreeMapViewer('modal-map-view', {
      onSelectNode: (nodeId) => {
        this.closeMapModal();
        this.navigateTo(nodeId);
      }
    });

    this.initEventListeners();
    this.navigateTo('portada', false);
  }

  initEventListeners() {
    // Botón abrir mapa
    if (this.btnMapTrigger) {
      this.btnMapTrigger.addEventListener('click', () => this.openMapModal());
    }

    // Botón cerrar mapa
    if (this.btnCloseMap) {
      this.btnCloseMap.addEventListener('click', () => this.closeMapModal());
    }

    // Cerrar mapa con click fuera del modal
    if (this.mapModal) {
      this.mapModal.addEventListener('click', (e) => {
        if (e.target === this.mapModal) this.closeMapModal();
      });
    }

    // Botón Atrás
    if (this.btnBack) {
      this.btnBack.addEventListener('click', () => this.goBack());
    }

    // Botón Reiniciar
    if (this.btnRestart) {
      this.btnRestart.addEventListener('click', () => this.restart());
    }

    // Botón Sonido
    if (this.btnSoundToggle) {
      this.btnSoundToggle.addEventListener('click', () => {
        const enabled = window.soundController.toggleSound();
        this.updateSoundButtonUI(enabled);
      });
    }

    // Atajos de teclado para presentaciones y accesibilidad
    window.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  updateSoundButtonUI(enabled) {
    if (!this.btnSoundToggle) return;
    const soundIcon = this.btnSoundToggle.querySelector('.sound-state-icon');
    if (soundIcon) {
      soundIcon.innerHTML = enabled 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
    }
    this.btnSoundToggle.setAttribute('aria-label', enabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido');
  }

  handleKeyboard(e) {
    // Si modal está abierto, Esc lo cierra
    if (e.key === 'Escape') {
      if (this.isMapOpen) {
        this.closeMapModal();
        return;
      }
    }

    // Si el usuario escribe en un input (no aplica aquí, pero como buena práctica)
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Tecla M para alternar mapa
    if (e.key === 'm' || e.key === 'M') {
      if (this.isMapOpen) this.closeMapModal();
      else this.openMapModal();
      return;
    }

    // Tecla R para reiniciar
    if (e.key === 'r' || e.key === 'R') {
      this.restart();
      return;
    }

    // Tecla Flecha Izquierda o Backspace para volver
    if (e.key === 'ArrowLeft') {
      if (this.currentNodeId !== 'portada') {
        this.goBack();
      }
      return;
    }

    // Atajos contextuales de selección numérica o de letras (1, 2, 3 o A, B, C)
    if (this.currentNodeId === 'inicio') {
      if (e.key === '1' || e.key === 'a' || e.key === 'A') this.navigateTo('opcion-a');
      if (e.key === '2' || e.key === 'b' || e.key === 'B') this.navigateTo('opcion-b');
      if (e.key === '3' || e.key === 'c' || e.key === 'C') this.navigateTo('opcion-c');
    } else if (this.currentNodeId === 'opcion-a') {
      if (e.key === '1' || e.key === 'a' || e.key === 'A') this.navigateTo('a1');
      if (e.key === '2' || e.key === 'b' || e.key === 'B') this.navigateTo('a2');
    } else if (this.currentNodeId === 'opcion-c') {
      if (e.key === '1' || e.key === 'a' || e.key === 'A') this.navigateTo('c1');
      if (e.key === '2' || e.key === 'b' || e.key === 'B') this.navigateTo('c2');
    } else if (this.currentNodeId === 'portada') {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        this.navigateTo('inicio');
      }
    }
  }

  openMapModal() {
    this.isMapOpen = true;
    this.mapModal.classList.add('active');
    document.body.classList.add('modal-open');
    if (window.soundController) window.soundController.playModalOpen();
    this.treeMapViewer.updateState(this.currentNodeId);
    if (this.btnCloseMap) this.btnCloseMap.focus();
  }

  closeMapModal() {
    this.isMapOpen = false;
    this.mapModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  navigateTo(nodeId, pushHistory = true) {
    if (!this.data.nodes[nodeId]) {
      console.error(`Nodo desconocido: ${nodeId}`);
      return;
    }

    if (pushHistory && this.currentNodeId !== nodeId) {
      this.history.push(this.currentNodeId);
    }

    this.currentNodeId = nodeId;
    this.visitedNodes.add(nodeId);

    // Reproducir sonido adecuado
    const nodeData = this.data.nodes[nodeId];
    if (nodeData.type === 'consequence_route' || nodeId === 'opcion-b') {
      if (window.soundController) window.soundController.playAlert();
    } else if (nodeId !== 'portada') {
      if (window.soundController) window.soundController.playTransition();
    }

    // Actualizar barra de navegación superior y progreso
    this.updateNavigationUI();

    // Renderizar contenido del nodo con animación suave
    this.renderCurrentNode();

    // Scroll arriba suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goBack() {
    if (this.history.length > 0) {
      const prevNodeId = this.history.pop();
      if (window.soundController) window.soundController.playClick();
      this.navigateTo(prevNodeId, false);
    } else {
      const node = this.data.nodes[this.currentNodeId];
      if (node && node.parent) {
        if (window.soundController) window.soundController.playClick();
        this.navigateTo(node.parent, false);
      }
    }
  }

  restart() {
    if (window.soundController) window.soundController.playClick();
    this.history = [];
    this.navigateTo('portada', false);
  }

  updateNavigationUI() {
    const node = this.data.nodes[this.currentNodeId];
    const isCover = this.currentNodeId === 'portada';

    // Barra de progreso y etapas
    let progressPercent = 0;
    let stepText = "Presentación";

    switch (node.stepNumber) {
      case 0:
        progressPercent = 5;
        stepText = "Portada";
        break;
      case 1:
        progressPercent = 33;
        stepText = "Paso 1: Situación Inicial";
        break;
      case 2:
        progressPercent = 66;
        stepText = `Paso 2: Dilema y Decisión (${node.title || 'Opciones'})`;
        break;
      case 3:
        progressPercent = 100;
        stepText = `Paso 3: Consecuencia & ${node.routeBadge || 'Ruta'}`;
        break;
      default:
        progressPercent = 50;
        stepText = "Exploración";
    }

    if (this.progressBar) this.progressBar.style.width = `${progressPercent}%`;
    if (this.progressStep) this.progressStep.textContent = stepText;

    // Botón volver
    if (this.btnBack) {
      if (isCover) {
        this.btnBack.style.display = 'none';
      } else {
        this.btnBack.style.display = 'inline-flex';
      }
    }

    // Breadcrumbs
    this.renderBreadcrumbs();
  }

  renderBreadcrumbs() {
    if (!this.breadcrumbsNav) return;

    if (this.currentNodeId === 'portada') {
      this.breadcrumbsNav.innerHTML = `
        <span class="breadcrumb-item current">Portada</span>
      `;
      return;
    }

    const items = [];
    items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('inicio')">Inicio</button>`);

    if (this.currentNodeId === 'opcion-a') {
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">Opción A</span>`);
    } else if (this.currentNodeId === 'a1') {
      items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('opcion-a')">Opción A</button>`);
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">A1 → Ruta 1</span>`);
    } else if (this.currentNodeId === 'a2') {
      items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('opcion-a')">Opción A</button>`);
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">A2 → Ruta 2</span>`);
    } else if (this.currentNodeId === 'opcion-b') {
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">Opción B → Ruta 5</span>`);
    } else if (this.currentNodeId === 'opcion-c') {
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">Opción C</span>`);
    } else if (this.currentNodeId === 'c1') {
      items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('opcion-c')">Opción C</button>`);
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">C1 → Ruta 3</span>`);
    } else if (this.currentNodeId === 'c2') {
      items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('opcion-c')">Opción C</button>`);
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">C2 → Ruta 4</span>`);
    }

    this.breadcrumbsNav.innerHTML = items.join('');
  }

  renderCurrentNode() {
    const node = this.data.nodes[this.currentNodeId];
    if (!node || !this.mainContainer) return;

    let html = '';

    switch (node.type) {
      case 'cover':
        html = this.renderCoverScreen(node);
        break;
      case 'situation':
        html = this.renderSituationScreen(node);
        break;
      case 'decision_branch':
        html = this.renderDecisionBranchScreen(node);
        break;
      case 'direct_route':
        html = this.renderDirectRouteScreen(node);
        break;
      case 'consequence_route':
        html = this.renderConsequenceScreen(node);
        break;
    }

    // Transición de salida y entrada
    this.mainContainer.classList.remove('fade-enter-active');
    this.mainContainer.innerHTML = html;
    
    // Forzar reflow para reiniciar animación CSS
    void this.mainContainer.offsetWidth;
    this.mainContainer.classList.add('fade-enter-active');

    // Asignar listeners internos de botones
    this.attachInternalListeners();
  }

  renderCoverScreen(node) {
    return `
      <section class="screen-view screen-cover" aria-labelledby="cover-title">
        <div class="cover-hero-grid">
          
          <div class="cover-text-panel">
            <div class="academic-badge-wrap">
              <span class="academic-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                Presentación Interactiva Universitaria
              </span>
              <span class="academic-pill">Simulador Ético</span>
            </div>

            <h1 id="cover-title" class="cover-main-title">${node.title}</h1>
            <p class="cover-subtitle">${node.subtitle}</p>

            <div class="cover-concept-card">
              <div class="concept-indicator">
                <span class="concept-icon">⚖️</span>
                <div class="concept-body">
                  <strong class="concept-label">Premisa Fundamental:</strong>
                  <p class="concept-text">"${node.concept}"</p>
                </div>
              </div>
            </div>

            <div class="cover-actions-row">
              <button class="btn btn-primary btn-xl" id="btn-start-experience">
                <span>Comenzar</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button class="btn btn-secondary btn-xl" onclick="app.openMapModal()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
                <span>Ver mapa de decisiones</span>
              </button>
            </div>

            <div class="keyboard-helper">
              <span>💡 Presiona <kbd>Enter</kbd> o <kbd>Espacio</kbd> para iniciar • <kbd>M</kbd> para ver el mapa</span>
            </div>
          </div>

          <div class="cover-media-panel">
            <div class="presentation-frame">
              <div class="frame-tag">Escenario de Ingeniería</div>
              <img src="${node.image}" alt="${node.imageAlt}" class="presentation-img" />
              <div class="frame-caption">
                <span>Instalación industrial adyacente a zona urbana y cuenca hídrica</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  renderSituationScreen(node) {
    return `
      <section class="screen-view screen-situation" aria-labelledby="situation-heading">
        <!-- Encabezado de situación -->
        <div class="screen-header-block">
          <div class="step-indicator-pill">
            <span class="dot-indicator"></span>
            Pantalla 2 • Situación Inicial
          </div>
          <h2 id="situation-heading" class="situation-title">${node.title}</h2>
        </div>

        <div class="situation-layout-grid">
          <!-- Tarjeta de situación narrativa -->
          <div class="narrative-card">
            <div class="narrative-visual-wrap">
              <img src="${node.image}" alt="${node.imageAlt}" class="narrative-banner-img" />
              <div class="narrative-overlay-badge">
                <span>Dilema Ético en Ingeniería</span>
              </div>
            </div>
            
            <div class="narrative-body">
              <div class="quote-symbol">“</div>
              <p class="narrative-text">${node.text}</p>
            </div>
          </div>

          <!-- Opciones de decisión (Tarjetas interactivas A, B, C) -->
          <div class="decision-options-container">
            <div class="decision-prompt-banner">
              <span class="prompt-icon">⚡</span>
              <span>Evalúa las 3 alternativas técnicas y selecciona tu curso de acción:</span>
            </div>

            <div class="options-grid-3">
              ${node.options.map((opt, idx) => `
                <div class="option-decision-card card-${opt.letter.toLowerCase()}" 
                     tabindex="0" 
                     role="button" 
                     data-target-id="${opt.targetNodeId}"
                     aria-label="Seleccionar ${opt.title}">
                  
                  <div class="card-image-preview">
                    <img src="${opt.image}" alt="${opt.title}" class="card-thumb" />
                    <span class="badge-letter badge-${opt.letter.toLowerCase()}">${opt.letter}</span>
                  </div>

                  <div class="card-content-block">
                    <div class="card-header-row">
                      <h3 class="card-title">${opt.title}</h3>
                      <span class="badge-tag tag-${opt.badgeColor}">${opt.badgeLabel}</span>
                    </div>

                    <p class="card-desc">${opt.shortDescription}</p>

                    <button class="btn btn-select btn-${opt.letter.toLowerCase()}">
                      <span>Elegir ${opt.title}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>

                  <div class="card-keyboard-badge">
                    <kbd>${idx + 1}</kbd> o <kbd>${opt.letter}</kbd>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Barra inferior de acciones auxiliares -->
        <div class="screen-footer-actions">
          <button class="btn btn-outline" onclick="app.openMapModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
              <line x1="8" y1="2" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="22"></line>
            </svg>
            <span>Ver mapa de decisiones</span>
          </button>
        </div>
      </section>
    `;
  }

  renderDecisionBranchScreen(node) {
    return `
      <section class="screen-view screen-branch" aria-labelledby="branch-heading">
        <!-- Encabezado de la rama de decisión -->
        <div class="screen-header-block">
          <div class="step-indicator-pill pill-${node.letter.toLowerCase()}">
            <span class="letter-chip">${node.letter}</span>
            <span>Decisión en Curso • ${node.title}</span>
          </div>
        </div>

        <div class="branch-layout-grid">
          
          <!-- Panel de contexto del dilema seleccionado -->
          <div class="branch-dilemma-panel">
            <div class="presentation-frame">
              <img src="${node.image}" alt="${node.imageAlt}" class="presentation-img" />
              <div class="frame-tag-danger">Dilema Ético Seleccionado</div>
            </div>

            <div class="dilemma-text-box">
              <p class="dilemma-exact-text">${node.text}</p>
              
              <div class="concept-quote-box">
                <span class="quote-label">Principio Ético en Tensión:</span>
                <p class="quote-content">"${node.concept}"</p>
              </div>
            </div>
          </div>

          <!-- Panel de bifurcación secundaria (A1/A2 o C1/C2) -->
          <div class="branch-choices-panel">
            <div class="subquestion-banner">
              <span class="subquestion-icon">🎯</span>
              <h3 class="subquestion-text">${node.subQuestion}</h3>
            </div>

            <div class="sub-options-container">
              ${node.options.map((subOpt, idx) => `
                <div class="sub-option-card sub-card-${subOpt.subKey.toLowerCase()}" 
                     tabindex="0" 
                     role="button" 
                     data-target-id="${subOpt.targetNodeId}"
                     aria-label="Seleccionar ${subOpt.title}">
                  
                  <div class="sub-card-media">
                    <img src="${subOpt.image}" alt="${subOpt.title}" class="sub-thumb-img" />
                    <span class="sub-key-badge">${subOpt.subKey}</span>
                  </div>

                  <div class="sub-card-body">
                    <div class="sub-card-tag-row">
                      <span class="destination-pill tag-${subOpt.badgeColor}">
                        ${subOpt.destinationRoute}
                      </span>
                    </div>

                    <p class="sub-card-exact-text">${subOpt.text}</p>

                    <div class="sub-card-action-row">
                      <button class="btn btn-select-sub">
                        <span>Seleccionar ${subOpt.subKey}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                      <span class="sub-key-hint"><kbd>${idx + 1}</kbd></span>
                    </div>
                  </div>

                </div>
              `).join('')}
            </div>

          </div>

        </div>

        <div class="screen-footer-actions">
          <button class="btn btn-outline" onclick="app.goBack()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Volver a la situación inicial</span>
          </button>

          <button class="btn btn-outline" onclick="app.openMapModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
              <line x1="8" y1="2" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="22"></line>
            </svg>
            <span>Ver mapa de decisiones</span>
          </button>
        </div>
      </section>
    `;
  }

  renderDirectRouteScreen(node) {
    // Caso especial Opción B: conduce directamente a Ruta 5 - Idoneidad
    return `
      <section class="screen-view screen-direct-b" aria-labelledby="direct-b-heading">
        <div class="screen-header-block">
          <div class="step-indicator-pill pill-purple">
            <span class="letter-chip">B</span>
            <span>Opción B • Consecuencia Directa</span>
          </div>
          <div class="route-badge-hero route-competence">
            <span class="route-badge-icon">⚡</span>
            <h2 id="direct-b-heading" class="route-badge-text">${node.routeBadge}</h2>
          </div>
        </div>

        <div class="direct-b-grid">
          <!-- Columna 1: La decisión / propuesta no idónea -->
          <div class="direct-card decision-phase-card">
            <div class="phase-header">
              <span class="phase-number">Paso 1: La Propuesta</span>
              <h3 class="phase-title">Opción B</h3>
            </div>

            <div class="phase-image-frame">
              <img src="${node.initialImage}" alt="${node.initialImageAlt}" class="phase-img" />
              <div class="phase-overlay-tag">Instalación fuera de especialidad</div>
            </div>

            <div class="phase-body">
              <p class="phase-exact-text">${node.text}</p>
              <div class="concept-quote-box">
                <span class="quote-label">Dilema de Idoneidad:</span>
                <p class="quote-content">"${node.initialConcept}"</p>
              </div>
            </div>
          </div>

          <!-- Columna 2: La Consecuencia inmediata (Ruta 5) -->
          <div class="direct-card consequence-phase-card">
            <div class="phase-header phase-header-danger">
              <span class="phase-number phase-danger">Paso 2: Impacto Real</span>
              <h3 class="phase-title title-danger">${node.consequenceTitle}</h3>
            </div>

            <div class="phase-image-frame">
              <img src="${node.consequenceImage}" alt="${node.consequenceImageAlt}" class="phase-img" />
              <div class="phase-overlay-danger">Apagón masivo y cortocircuito</div>
            </div>

            <div class="phase-body">
              <div class="consequence-alert-box">
                <span class="alert-icon">⚠️</span>
                <p class="consequence-exact-text">${node.consequenceText}</p>
              </div>

              <div class="ethical-analysis-box">
                <div class="analysis-header">
                  <span class="analysis-icon">📜</span>
                  <strong class="analysis-title">Análisis Ético Profesional</strong>
                </div>
                <p class="analysis-text">${node.ethicalReflection}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones finales de exploración -->
        <div class="consequence-navigation-bar">
          <div class="nav-left">
            <button class="btn btn-secondary" onclick="app.goBack()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Atrás</span>
            </button>
            <button class="btn btn-secondary" onclick="app.navigateTo('inicio')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              <span>Volver a la situación inicial</span>
            </button>
          </div>

          <div class="nav-right">
            <button class="btn btn-primary" onclick="app.openMapModal()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
              <span>Ver mapa de decisiones</span>
            </button>
            <button class="btn btn-outline" onclick="app.restart()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 4v6h-6"></path>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>Reiniciar experiencia</span>
            </button>
          </div>
        </div>
      </section>
    `;
  }

  renderConsequenceScreen(node) {
    return `
      <section class="screen-view screen-consequence ${node.routeClass}" aria-labelledby="consequence-heading">
        <!-- Encabezado con insignia oficial de la Ruta -->
        <div class="screen-header-block">
          <div class="step-indicator-pill">
            <span class="dot-indicator"></span>
            Resultado Final de la Decisión
          </div>

          <div class="route-badge-hero ${node.routeClass}">
            <span class="route-badge-icon">📍</span>
            <h2 id="consequence-heading" class="route-badge-text">${node.routeBadge}</h2>
          </div>
        </div>

        <div class="consequence-layout-grid">
          
          <!-- Panel de imagen representativa -->
          <div class="consequence-media-panel">
            <div class="presentation-frame">
              <img src="${node.image}" alt="${node.imageAlt}" class="presentation-img" />
              <div class="frame-tag-danger">Impacto Observado</div>
            </div>

            <div class="decision-recap-box">
              <span class="recap-label">Decisión previa tomada:</span>
              <p class="recap-text">${node.decisionText}</p>
            </div>
          </div>

          <!-- Panel de consecuencia y reflexión ética -->
          <div class="consequence-content-panel">
            
            <div class="consequence-card">
              <div class="consequence-header">
                <span class="consequence-icon">⚠️</span>
                <h3 class="consequence-title">${node.consequenceTitle}</h3>
              </div>
              <p class="consequence-text-body">${node.consequenceText}</p>
            </div>

            <div class="concept-quote-box">
              <span class="quote-label">Concepto Ético Evaluado:</span>
              <p class="quote-content">"${node.concept}"</p>
            </div>

            <div class="ethical-analysis-box">
              <div class="analysis-header">
                <span class="analysis-icon">⚖️</span>
                <strong class="analysis-title">Lección para la Práctica Profesional de Ingeniería</strong>
              </div>
              <p class="analysis-text">${node.ethicalReflection}</p>
            </div>

            <!-- Botones interactivos de acción -->
            <div class="consequence-actions-grid">
              <button class="btn btn-primary btn-lg" onclick="app.navigateTo('inicio')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 15l-6-6-6 6"/>
                </svg>
                <span>Explorar otra decisión</span>
              </button>

              <button class="btn btn-secondary btn-lg" onclick="app.openMapModal()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
                <span>Ver mapa de decisiones</span>
              </button>

              <button class="btn btn-outline" onclick="app.goBack()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>Atrás</span>
              </button>

              <button class="btn btn-outline" onclick="app.restart()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 4v6h-6"></path>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
                <span>Reiniciar</span>
              </button>
            </div>

          </div>

        </div>
      </section>
    `;
  }

  attachInternalListeners() {
    // Botón de comenzar en portada
    const btnStart = document.getElementById('btn-start-experience');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        if (window.soundController) window.soundController.playClick();
        this.navigateTo('inicio');
      });
    }

    // Tarjetas interactivas con atributo data-target-id
    const targetCards = this.mainContainer.querySelectorAll('[data-target-id]');
    targetCards.forEach(card => {
      const targetId = card.getAttribute('data-target-id');
      card.addEventListener('click', () => {
        if (window.soundController) window.soundController.playClick();
        this.navigateTo(targetId);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (window.soundController) window.soundController.playClick();
          this.navigateTo(targetId);
        }
      });
    });
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.app = new DecisionApp();
});
