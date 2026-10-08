/**
 * ÁRBOL DE DECISIONES 1: CONTROLADOR PRINCIPAL DE LA APLICACIÓN
 * Estilo: Orgánico, Editorial, Humano y Académico.
 * Sin saturación visual, sin emojis, con distribución armónica de lectura.
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
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
    }
    this.btnSoundToggle.setAttribute('aria-label', enabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido');
  }

  handleKeyboard(e) {
    if (e.key === 'Escape') {
      if (this.isMapOpen) {
        this.closeMapModal();
        return;
      }
    }

    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'm' || e.key === 'M') {
      if (this.isMapOpen) this.closeMapModal();
      else this.openMapModal();
      return;
    }

    if (e.key === 'r' || e.key === 'R') {
      this.restart();
      return;
    }

    if (e.key === 'ArrowLeft') {
      if (this.currentNodeId !== 'portada') {
        this.goBack();
      }
      return;
    }

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

    const nodeData = this.data.nodes[nodeId];
    if (nodeData.type === 'consequence_route' || nodeId === 'opcion-b') {
      if (window.soundController) window.soundController.playAlert();
    } else if (nodeId !== 'portada') {
      if (window.soundController) window.soundController.playTransition();
    }

    this.updateNavigationUI();
    this.renderCurrentNode();
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

    let progressPercent = 0;
    let stepText = "Presentación";

    switch (node.stepNumber) {
      case 0:
        progressPercent = 5;
        stepText = "Portada";
        break;
      case 1:
        progressPercent = 33;
        stepText = "Situación Inicial";
        break;
      case 2:
        progressPercent = 66;
        stepText = `Decisión (${node.title || 'Opciones'})`;
        break;
      case 3:
        progressPercent = 100;
        stepText = `Consecuencia (${node.routeBadge || 'Ruta'})`;
        break;
      default:
        progressPercent = 50;
        stepText = "Exploración";
    }

    if (this.progressBar) this.progressBar.style.width = `${progressPercent}%`;
    if (this.progressStep) this.progressStep.textContent = stepText;

    if (this.btnBack) {
      this.btnBack.style.display = isCover ? 'none' : 'inline-flex';
    }

    this.renderBreadcrumbs();
  }

  renderBreadcrumbs() {
    if (!this.breadcrumbsNav) return;

    if (this.currentNodeId === 'portada') {
      this.breadcrumbsNav.innerHTML = `<span class="breadcrumb-item current">Portada</span>`;
      return;
    }

    const items = [];
    items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('inicio')">Inicio</button>`);

    if (this.currentNodeId === 'opcion-a') {
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">Opción A</span>`);
    } else if (this.currentNodeId === 'a1') {
      items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('opcion-a')">Opción A</button>`);
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">A1 · Ruta 1</span>`);
    } else if (this.currentNodeId === 'a2') {
      items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('opcion-a')">Opción A</button>`);
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">A2 · Ruta 2</span>`);
    } else if (this.currentNodeId === 'opcion-b') {
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">Opción B · Ruta 5</span>`);
    } else if (this.currentNodeId === 'opcion-c') {
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">Opción C</span>`);
    } else if (this.currentNodeId === 'c1') {
      items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('opcion-c')">Opción C</button>`);
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">C1 · Ruta 3</span>`);
    } else if (this.currentNodeId === 'c2') {
      items.push(`<button class="breadcrumb-btn" onclick="app.navigateTo('opcion-c')">Opción C</button>`);
      items.push(`<span class="breadcrumb-sep">/</span><span class="breadcrumb-item current">C2 · Ruta 4</span>`);
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

    this.mainContainer.classList.remove('fade-enter-active');
    this.mainContainer.innerHTML = html;
    
    void this.mainContainer.offsetWidth;
    this.mainContainer.classList.add('fade-enter-active');

    this.attachInternalListeners();
  }

  renderCoverScreen(node) {
    return `
      <section class="screen-view screen-cover" aria-labelledby="cover-title">
        <div class="cover-hero-grid">
          
          <div class="cover-text-panel">
            <div class="meta-label-group">
              <span class="meta-tag">Caso Práctico Universitario</span>
              <span class="meta-dot">·</span>
              <span class="meta-subtag">Toma de Decisiones</span>
            </div>

            <h1 id="cover-title" class="cover-main-title">${node.title}</h1>
            <p class="cover-subtitle">${node.subtitle}</p>

            <div class="editorial-premise">
              <span class="editorial-premise-label">Premisa:</span>
              <p class="editorial-premise-text">${node.concept}</p>
            </div>

            <div class="cover-actions-row">
              <button class="btn btn-primary btn-xl" id="btn-start-experience">
                <span>Comenzar</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button class="btn btn-secondary btn-xl" onclick="app.openMapModal()">
                <span>Ver mapa de decisiones</span>
              </button>
            </div>

            <div class="keyboard-helper">
              <span>Navega con teclado: <kbd>Enter</kbd> para iniciar · <kbd>M</kbd> para abrir el mapa</span>
            </div>
          </div>

          <div class="cover-media-panel">
            <figure class="editorial-figure">
              <img src="${node.image}" alt="${node.imageAlt}" class="editorial-img" />
              <figcaption class="editorial-figcaption">
                Entorno de instalación: fábrica industrial junto a barrio residencial y río.
              </figcaption>
            </figure>
          </div>

        </div>
      </section>
    `;
  }

  renderSituationScreen(node) {
    return `
      <section class="screen-view screen-situation" aria-labelledby="situation-heading">
        
        <header class="section-intro">
          <span class="section-kicker">Situación Inicial</span>
          <h2 id="situation-heading" class="situation-title">${node.title}</h2>
        </header>

        <div class="situation-layout-grid">
          
          <!-- Narrativa principal -->
          <article class="narrative-article">
            <figure class="narrative-figure">
              <img src="${node.image}" alt="${node.imageAlt}" class="editorial-img" />
            </figure>
            
            <div class="narrative-copy">
              <p class="narrative-paragraph">${node.text}</p>
            </div>
          </article>

          <!-- Opciones de decisión A, B, C -->
          <aside class="decision-aside">
            <div class="decision-lead-text">
              Selecciona una alternativa para continuar el curso del proyecto:
            </div>

            <div class="options-stack">
              ${node.options.map((opt, idx) => `
                <div class="option-decision-card card-${opt.letter.toLowerCase()}" 
                     tabindex="0" 
                     role="button" 
                     data-target-id="${opt.targetNodeId}"
                     aria-label="Seleccionar ${opt.title}">
                  
                  <div class="card-thumb-wrap">
                    <img src="${opt.image}" alt="${opt.title}" class="card-thumb" />
                    <span class="letter-marker">${opt.letter}</span>
                  </div>

                  <div class="card-info">
                    <div class="card-headline">
                      <h3 class="card-name">${opt.title}</h3>
                      <span class="category-indicator">${opt.badgeLabel}</span>
                    </div>

                    <p class="card-summary">${opt.shortDescription}</p>

                    <div class="card-action-bar">
                      <span class="card-action-link">Seleccionar ${opt.title} →</span>
                      <kbd class="key-shortcut">${opt.letter}</kbd>
                    </div>
                  </div>

                </div>
              `).join('')}
            </div>
          </aside>

        </div>

        <footer class="screen-bottom-bar">
          <button class="btn btn-ghost" onclick="app.openMapModal()">
            <span>Ver mapa de decisiones</span>
          </button>
        </footer>
      </section>
    `;
  }

  renderDecisionBranchScreen(node) {
    return `
      <section class="screen-view screen-branch" aria-labelledby="branch-heading">
        
        <header class="section-intro">
          <span class="section-kicker">Decisión en Curso · ${node.title}</span>
          <h2 id="branch-heading" class="subquestion-headline">${node.subQuestion}</h2>
        </header>

        <div class="branch-layout-grid">
          
          <!-- Contexto del dilema -->
          <div class="dilemma-summary-col">
            <figure class="editorial-figure">
              <img src="${node.image}" alt="${node.imageAlt}" class="editorial-img" />
            </figure>

            <div class="editorial-quote-card">
              <p class="dilemma-exact-body">${node.text}</p>
              <div class="concept-note">
                <span class="concept-note-label">Enfoque:</span>
                <p class="concept-note-text">${node.concept}</p>
              </div>
            </div>
          </div>

          <!-- Opciones A1/A2 o C1/C2 -->
          <div class="choices-col">
            <div class="choices-stack">
              ${node.options.map((subOpt, idx) => `
                <div class="sub-option-card sub-card-${subOpt.subKey.toLowerCase()}" 
                     tabindex="0" 
                     role="button" 
                     data-target-id="${subOpt.targetNodeId}"
                     aria-label="Seleccionar ${subOpt.title}">
                  
                  <div class="sub-card-media-col">
                    <img src="${subOpt.image}" alt="${subOpt.title}" class="sub-thumb-img" />
                    <span class="sub-key-mark">${subOpt.subKey}</span>
                  </div>

                  <div class="sub-card-content-col">
                    <span class="target-route-label">${subOpt.destinationRoute}</span>
                    <p class="sub-exact-paragraph">${subOpt.text}</p>
                    
                    <div class="sub-action-footer">
                      <span class="sub-action-text">Elegir ${subOpt.subKey} →</span>
                      <kbd class="key-shortcut">${idx + 1}</kbd>
                    </div>
                  </div>

                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <footer class="screen-bottom-bar">
          <button class="btn btn-ghost" onclick="app.goBack()">
            <span>← Volver a la situación inicial</span>
          </button>
          <button class="btn btn-ghost" onclick="app.openMapModal()">
            <span>Ver mapa de decisiones</span>
          </button>
        </footer>
      </section>
    `;
  }

  renderDirectRouteScreen(node) {
    return `
      <section class="screen-view screen-direct-b" aria-labelledby="direct-b-heading">
        
        <header class="section-intro">
          <span class="section-kicker">Opción B · Consecuencia Directa</span>
          <h2 id="direct-b-heading" class="route-headline">${node.routeBadge}</h2>
        </header>

        <div class="direct-b-layout">
          
          <!-- Bloque 1: Propuesta B -->
          <article class="two-part-card">
            <div class="card-part-header">
              <span class="part-index">1. La Propuesta</span>
              <h3 class="part-title">Opción B</h3>
            </div>

            <figure class="card-part-figure">
              <img src="${node.initialImage}" alt="${node.initialImageAlt}" class="editorial-img" />
            </figure>

            <div class="card-part-content">
              <p class="exact-prose">${node.text}</p>
              <div class="concept-note">
                <span class="concept-note-label">Principio:</span>
                <p class="concept-note-text">${node.initialConcept}</p>
              </div>
            </div>
          </article>

          <!-- Bloque 2: Consecuencia / Ruta 5 -->
          <article class="two-part-card outcome-card">
            <div class="card-part-header outcome-header">
              <span class="part-index">2. Resultado</span>
              <h3 class="part-title">${node.consequenceTitle}</h3>
            </div>

            <figure class="card-part-figure">
              <img src="${node.consequenceImage}" alt="${node.consequenceImageAlt}" class="editorial-img" />
            </figure>

            <div class="card-part-content">
              <div class="consequence-prose-wrap">
                <p class="consequence-prose">${node.consequenceText}</p>
              </div>

              <div class="reflection-box">
                <span class="reflection-label">Reflexión Deontológica:</span>
                <p class="reflection-text">${node.ethicalReflection}</p>
              </div>
            </div>
          </article>

        </div>

        <footer class="consequence-nav-footer">
          <div class="nav-cluster-left">
            <button class="btn btn-secondary" onclick="app.goBack()">
              <span>Atrás</span>
            </button>
            <button class="btn btn-secondary" onclick="app.navigateTo('inicio')">
              <span>Volver a la situación inicial</span>
            </button>
          </div>

          <div class="nav-cluster-right">
            <button class="btn btn-primary" onclick="app.openMapModal()">
              <span>Ver mapa de decisiones</span>
            </button>
            <button class="btn btn-ghost" onclick="app.restart()">
              <span>Reiniciar</span>
            </button>
          </div>
        </footer>
      </section>
    `;
  }

  renderConsequenceScreen(node) {
    return `
      <section class="screen-view screen-consequence ${node.routeClass}" aria-labelledby="consequence-heading">
        
        <header class="section-intro">
          <span class="section-kicker">Resultado de la Decisión</span>
          <h2 id="consequence-heading" class="route-headline">${node.routeBadge}</h2>
        </header>

        <div class="consequence-layout-grid">
          
          <!-- Panel de imagen y referencia -->
          <div class="consequence-visual-col">
            <figure class="editorial-figure">
              <img src="${node.image}" alt="${node.imageAlt}" class="editorial-img" />
            </figure>

            <div class="prior-decision-note">
              <span class="prior-decision-label">Decisión previa tomada:</span>
              <p class="prior-decision-text">${node.decisionText}</p>
            </div>
          </div>

          <!-- Panel de consecuencia y análisis -->
          <div class="consequence-text-col">
            
            <div class="consequence-narrative-card">
              <h3 class="consequence-label">${node.consequenceTitle}</h3>
              <p class="consequence-body-text">${node.consequenceText}</p>
            </div>

            <div class="concept-callout">
              <span class="callout-label">Criterio:</span>
              <p class="callout-text">${node.concept}</p>
            </div>

            <div class="reflection-box">
              <span class="reflection-label">Reflexión Deontológica:</span>
              <p class="reflection-text">${node.ethicalReflection}</p>
            </div>

            <div class="consequence-button-row">
              <button class="btn btn-primary" onclick="app.navigateTo('inicio')">
                <span>Explorar otra decisión</span>
              </button>

              <button class="btn btn-secondary" onclick="app.openMapModal()">
                <span>Ver mapa de decisiones</span>
              </button>

              <button class="btn btn-ghost" onclick="app.goBack()">
                <span>Atrás</span>
              </button>

              <button class="btn btn-ghost" onclick="app.restart()">
                <span>Reiniciar</span>
              </button>
            </div>

          </div>

        </div>
      </section>
    `;
  }

  attachInternalListeners() {
    const btnStart = document.getElementById('btn-start-experience');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        if (window.soundController) window.soundController.playClick();
        this.navigateTo('inicio');
      });
    }

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

document.addEventListener('DOMContentLoaded', () => {
  window.app = new DecisionApp();
});
