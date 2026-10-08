/**
 * ÁRBOL DE DECISIONES 1: MAPA INTERACTIVO DEL ÁRBOL
 * Renderiza el diagrama de decisiones interactivo con SVG/HTML,
 * resaltado del nodo actual, trazado de rutas exploradas y salto directo.
 */

class TreeMapViewer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.currentNodeId = 'portada';
    this.visitedNodes = new Set(['portada', 'inicio']);
    this.onSelectNode = options.onSelectNode || (() => {});
  }

  updateState(currentNodeId) {
    this.currentNodeId = currentNodeId;
    this.visitedNodes.add(currentNodeId);
    this.render();
  }

  render() {
    if (!this.container) return;

    const current = this.currentNodeId;

    // Generar el diagrama interactivo
    this.container.innerHTML = `
      <div class="tree-map-content">
        <div class="tree-map-header">
          <div class="tree-map-title-row">
            <div class="tree-map-badge">
              <span class="pulse-dot"></span>
              Diagrama Estructural
            </div>
            <h3 class="tree-map-title">Mapa de Decisiones y Rutas Consecuenciales</h3>
          </div>
          <p class="tree-map-instructions">
            Explora la arquitectura completa del dilema ético. Haz clic en cualquier nodo para navegar directamente a esa etapa.
          </p>
        </div>

        <div class="tree-map-visual-container">
          <!-- Ilustración conceptual del árbol -->
          <div class="tree-concept-card">
            <div class="tree-concept-image-wrap">
              <img src="assets/images/img-mapa.jpg" alt="Mapa conceptual de toma de decisiones en ingeniería" class="tree-concept-img" />
              <div class="tree-concept-overlay">
                <span class="concept-tag">Ingeniería → Decisión → Consecuencias</span>
              </div>
            </div>
          </div>

          <!-- Estructura interactiva tipo árbol -->
          <div class="tree-flowchart">
            <!-- NODO RAÍZ: INICIO -->
            <div class="tree-node-level level-0">
              <div class="tree-node ${current === 'inicio' ? 'active pulse-highlight' : ''} ${this.visitedNodes.has('inicio') ? 'visited' : ''}" 
                   data-node-id="inicio" tabindex="0" role="button" aria-label="Ir a Situación Inicial">
                <div class="node-icon root-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div class="node-content">
                  <span class="node-tag">INICIO</span>
                  <strong class="node-name">Situación del Proyecto</strong>
                </div>
                ${current === 'inicio' ? '<span class="current-indicator">Ubicación actual</span>' : ''}
              </div>
            </div>

            <!-- CONECTORES HACIA RAMAS PRINCIPALES -->
            <div class="tree-branches-connector">
              <div class="connector-line-vert"></div>
              <div class="connector-line-horiz"></div>
            </div>

            <!-- TRES RAMAS PRINCIPALES: OPCIÓN A, B, C -->
            <div class="tree-node-branches-row">

              <!-- RAMA A -->
              <div class="tree-branch-col branch-a">
                <div class="tree-node ${current === 'opcion-a' ? 'active pulse-highlight' : ''} ${this.visitedNodes.has('opcion-a') ? 'visited' : ''}" 
                     data-node-id="opcion-a" tabindex="0" role="button" aria-label="Ir a Opción A">
                  <div class="node-badge-letter letter-a">A</div>
                  <div class="node-content">
                    <span class="node-tag">OPCIÓN A</span>
                    <strong class="node-name">Reducir Costos</strong>
                  </div>
                  ${current === 'opcion-a' ? '<span class="current-indicator">Ubicación actual</span>' : ''}
                </div>

                <div class="sub-branch-connector">
                  <div class="connector-line-vert-sm"></div>
                  <div class="connector-line-horiz-sm"></div>
                </div>

                <div class="sub-routes-grid">
                  <!-- A1 -->
                  <div class="tree-leaf-node ${current === 'a1' ? 'active pulse-highlight' : ''} ${this.visitedNodes.has('a1') ? 'visited' : ''} leaf-a1" 
                       data-node-id="a1" tabindex="0" role="button" aria-label="Ir a A1: Ruta 1 - Impacto Ambiental">
                    <div class="leaf-badge leaf-badge-env">A1</div>
                    <div class="leaf-content">
                      <span class="leaf-tag">Filtros de agua</span>
                      <strong class="leaf-name">RUTA 1: IMPACTO AMBIENTAL</strong>
                      <span class="leaf-desc">Contaminación del río</span>
                    </div>
                    ${current === 'a1' ? '<span class="current-indicator">Ubicación actual</span>' : ''}
                  </div>

                  <!-- A2 -->
                  <div class="tree-leaf-node ${current === 'a2' ? 'active pulse-highlight' : ''} ${this.visitedNodes.has('a2') ? 'visited' : ''} leaf-a2" 
                       data-node-id="a2" tabindex="0" role="button" aria-label="Ir a A2: Ruta 2 - Vida y Salud">
                    <div class="leaf-badge leaf-badge-safe">A2</div>
                    <div class="leaf-content">
                      <span class="leaf-tag">Sensores térmicos</span>
                      <strong class="leaf-name">RUTA 2: VIDA Y SALUD</strong>
                      <span class="leaf-desc">Riesgo a trabajadores</span>
                    </div>
                    ${current === 'a2' ? '<span class="current-indicator">Ubicación actual</span>' : ''}
                  </div>
                </div>
              </div>

              <!-- RAMA B -->
              <div class="tree-branch-col branch-b">
                <div class="tree-node ${current === 'opcion-b' ? 'active pulse-highlight' : ''} ${this.visitedNodes.has('opcion-b') ? 'visited' : ''}" 
                     data-node-id="opcion-b" tabindex="0" role="button" aria-label="Ir a Opción B">
                  <div class="node-badge-letter letter-b">B</div>
                  <div class="node-content">
                    <span class="node-tag">OPCIÓN B</span>
                    <strong class="node-name">Alta Tensión</strong>
                  </div>
                  ${current === 'opcion-b' ? '<span class="current-indicator">Ubicación actual</span>' : ''}
                </div>

                <div class="sub-branch-connector single-child">
                  <div class="connector-line-vert-md"></div>
                </div>

                <div class="sub-routes-grid single-item">
                  <!-- RUTA 5 -->
                  <div class="tree-leaf-node ${current === 'opcion-b' ? 'active pulse-highlight' : ''} ${this.visitedNodes.has('opcion-b') ? 'visited' : ''} leaf-b" 
                       data-node-id="opcion-b" tabindex="0" role="button" aria-label="Ir a Ruta 5: Idoneidad">
                    <div class="leaf-badge leaf-badge-elec">B</div>
                    <div class="leaf-content">
                      <span class="leaf-tag">Falta de preparación</span>
                      <strong class="leaf-name">RUTA 5: IDONEIDAD</strong>
                      <span class="leaf-desc">Cortocircuito y apagón masivo</span>
                    </div>
                    ${current === 'opcion-b' ? '<span class="current-indicator">Ubicación actual</span>' : ''}
                  </div>
                </div>
              </div>

              <!-- RAMA C -->
              <div class="tree-branch-col branch-c">
                <div class="tree-node ${current === 'opcion-c' ? 'active pulse-highlight' : ''} ${this.visitedNodes.has('opcion-c') ? 'visited' : ''}" 
                     data-node-id="opcion-c" tabindex="0" role="button" aria-label="Ir a Opción C">
                  <div class="node-badge-letter letter-c">C</div>
                  <div class="node-content">
                    <span class="node-tag">OPCIÓN C</span>
                    <strong class="node-name">Presión del Cliente</strong>
                  </div>
                  ${current === 'opcion-c' ? '<span class="current-indicator">Ubicación actual</span>' : ''}
                </div>

                <div class="sub-branch-connector">
                  <div class="connector-line-vert-sm"></div>
                  <div class="connector-line-horiz-sm"></div>
                </div>

                <div class="sub-routes-grid">
                  <!-- C1 -->
                  <div class="tree-leaf-node ${current === 'c1' ? 'active pulse-highlight' : ''} ${this.visitedNodes.has('c1') ? 'visited' : ''} leaf-c1" 
                       data-node-id="c1" tabindex="0" role="button" aria-label="Ir a C1: Ruta 3 - Daños Evitables">
                    <div class="leaf-badge leaf-badge-dmg">C1</div>
                    <div class="leaf-content">
                      <span class="leaf-tag">Humo tóxico continuo</span>
                      <strong class="leaf-name">RUTA 3: DAÑOS EVITABLES</strong>
                      <span class="leaf-desc">Afectación a la salud comunitaria</span>
                    </div>
                    ${current === 'c1' ? '<span class="current-indicator">Ubicación actual</span>' : ''}
                  </div>

                  <!-- C2 -->
                  <div class="tree-leaf-node ${current === 'c2' ? 'active pulse-highlight' : ''} ${this.visitedNodes.has('c2') ? 'visited' : ''} leaf-c2" 
                       data-node-id="c2" tabindex="0" role="button" aria-label="Ir a C2: Ruta 4 - Aptitud y Diligencia">
                    <div class="leaf-badge leaf-badge-dil">C2</div>
                    <div class="leaf-content">
                      <span class="leaf-tag">Revisión 'por encimita'</span>
                      <strong class="leaf-name">RUTA 4: APTITUD Y DILIGENCIA</strong>
                      <span class="leaf-desc">Fallas técnicas ocultas</span>
                    </div>
                    ${current === 'c2' ? '<span class="current-indicator">Ubicación actual</span>' : ''}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="tree-map-footer">
          <div class="tree-legend">
            <span class="legend-item"><span class="legend-color legend-current"></span> Nodo actual</span>
            <span class="legend-item"><span class="legend-color legend-visited"></span> Visitado</span>
            <span class="legend-item"><span class="legend-color legend-unvisited"></span> Por explorar</span>
          </div>
          <p class="legend-hint">Haz clic en cualquier nodo para teletransportarte a esa decisión o consecuencia.</p>
        </div>
      </div>
    `;

    // Asignar eventos de clic y teclado a todos los nodos interactivos
    const interactiveNodes = this.container.querySelectorAll('[data-node-id]');
    interactiveNodes.forEach(node => {
      const nodeId = node.getAttribute('data-node-id');
      node.addEventListener('click', () => {
        if (window.soundController) window.soundController.playClick();
        this.onSelectNode(nodeId);
      });
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (window.soundController) window.soundController.playClick();
          this.onSelectNode(nodeId);
        }
      });
    });
  }
}

window.TreeMapViewer = TreeMapViewer;
