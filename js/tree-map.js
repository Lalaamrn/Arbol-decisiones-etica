/**
 * ÁRBOL DE DECISIONES 1: MAPA INTERACTIVO DEL ÁRBOL
 * Estilo arquitectónico, sobrio, limpio y navegable.
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

    this.container.innerHTML = `
      <div class="tree-map-content">
        <div class="tree-map-header">
          <span class="tree-map-kicker">Estructura del Dilema</span>
          <h3 class="tree-map-title">Mapa de Decisiones y Rutas Consecuenciales</h3>
          <p class="tree-map-instructions">
            Selecciona cualquier nodo para navegar directamente a esa etapa del dilema.
          </p>
        </div>

        <div class="tree-map-visual-container">
          <!-- Ilustración conceptual del árbol -->
          <div class="tree-concept-card">
            <figure class="tree-concept-figure">
              <img src="assets/images/img-mapa.jpg" alt="Mapa conceptual de toma de decisiones en ingeniería" class="tree-concept-img" />
              <figcaption class="tree-concept-caption">
                Ingeniería · Decisión · Consecuencias
              </figcaption>
            </figure>
          </div>

          <!-- Estructura interactiva tipo árbol -->
          <div class="tree-flowchart">
            
            <!-- NODO RAÍZ: INICIO -->
            <div class="tree-node-level level-0">
              <div class="tree-node ${current === 'inicio' ? 'active is-current' : ''} ${this.visitedNodes.has('inicio') ? 'visited' : ''}" 
                   data-node-id="inicio" tabindex="0" role="button" aria-label="Ir a Situación Inicial">
                <div class="node-content">
                  <span class="node-tag">INICIO</span>
                  <strong class="node-name">Situación del Proyecto</strong>
                </div>
                ${current === 'inicio' ? '<span class="current-badge">Nodo actual</span>' : ''}
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
                <div class="tree-node ${current === 'opcion-a' ? 'active is-current' : ''} ${this.visitedNodes.has('opcion-a') ? 'visited' : ''}" 
                     data-node-id="opcion-a" tabindex="0" role="button" aria-label="Ir a Opción A">
                  <span class="node-marker">A</span>
                  <div class="node-content">
                    <span class="node-tag">OPCIÓN A</span>
                    <strong class="node-name">Reducir Costos</strong>
                  </div>
                  ${current === 'opcion-a' ? '<span class="current-badge">Nodo actual</span>' : ''}
                </div>

                <div class="sub-branch-connector">
                  <div class="connector-line-vert-sm"></div>
                  <div class="connector-line-horiz-sm"></div>
                </div>

                <div class="sub-routes-grid">
                  <!-- A1 -->
                  <div class="tree-leaf-node ${current === 'a1' ? 'active is-current' : ''} ${this.visitedNodes.has('a1') ? 'visited' : ''} leaf-a1" 
                       data-node-id="a1" tabindex="0" role="button" aria-label="Ir a A1: Ruta 1 - Impacto Ambiental">
                    <span class="leaf-marker">A1</span>
                    <div class="leaf-content">
                      <strong class="leaf-name">Ruta 1 · Impacto Ambiental</strong>
                      <span class="leaf-desc">Filtros de agua al río</span>
                    </div>
                    ${current === 'a1' ? '<span class="current-badge">Nodo actual</span>' : ''}
                  </div>

                  <!-- A2 -->
                  <div class="tree-leaf-node ${current === 'a2' ? 'active is-current' : ''} ${this.visitedNodes.has('a2') ? 'visited' : ''} leaf-a2" 
                       data-node-id="a2" tabindex="0" role="button" aria-label="Ir a A2: Ruta 2 - Vida y Salud">
                    <span class="leaf-marker">A2</span>
                    <div class="leaf-content">
                      <strong class="leaf-name">Ruta 2 · Vida y Salud</strong>
                      <span class="leaf-desc">Sensores y alarmas</span>
                    </div>
                    ${current === 'a2' ? '<span class="current-badge">Nodo actual</span>' : ''}
                  </div>
                </div>
              </div>

              <!-- RAMA B -->
              <div class="tree-branch-col branch-b">
                <div class="tree-node ${current === 'opcion-b' ? 'active is-current' : ''} ${this.visitedNodes.has('opcion-b') ? 'visited' : ''}" 
                     data-node-id="opcion-b" tabindex="0" role="button" aria-label="Ir a Opción B">
                  <span class="node-marker">B</span>
                  <div class="node-content">
                    <span class="node-tag">OPCIÓN B</span>
                    <strong class="node-name">Alta Tensión</strong>
                  </div>
                  ${current === 'opcion-b' ? '<span class="current-badge">Nodo actual</span>' : ''}
                </div>

                <div class="sub-branch-connector single-child">
                  <div class="connector-line-vert-md"></div>
                </div>

                <div class="sub-routes-grid single-item">
                  <!-- RUTA 5 -->
                  <div class="tree-leaf-node ${current === 'opcion-b' ? 'active is-current' : ''} ${this.visitedNodes.has('opcion-b') ? 'visited' : ''} leaf-b" 
                       data-node-id="opcion-b" tabindex="0" role="button" aria-label="Ir a Ruta 5: Idoneidad">
                    <span class="leaf-marker">B</span>
                    <div class="leaf-content">
                      <strong class="leaf-name">Ruta 5 · Idoneidad</strong>
                      <span class="leaf-desc">Cortocircuito y apagón</span>
                    </div>
                    ${current === 'opcion-b' ? '<span class="current-badge">Nodo actual</span>' : ''}
                  </div>
                </div>
              </div>

              <!-- RAMA C -->
              <div class="tree-branch-col branch-c">
                <div class="tree-node ${current === 'opcion-c' ? 'active is-current' : ''} ${this.visitedNodes.has('opcion-c') ? 'visited' : ''}" 
                     data-node-id="opcion-c" tabindex="0" role="button" aria-label="Ir a Opción C">
                  <span class="node-marker">C</span>
                  <div class="node-content">
                    <span class="node-tag">OPCIÓN C</span>
                    <strong class="node-name">Presión del Cliente</strong>
                  </div>
                  ${current === 'opcion-c' ? '<span class="current-badge">Nodo actual</span>' : ''}
                </div>

                <div class="sub-branch-connector">
                  <div class="connector-line-vert-sm"></div>
                  <div class="connector-line-horiz-sm"></div>
                </div>

                <div class="sub-routes-grid">
                  <!-- C1 -->
                  <div class="tree-leaf-node ${current === 'c1' ? 'active is-current' : ''} ${this.visitedNodes.has('c1') ? 'visited' : ''} leaf-c1" 
                       data-node-id="c1" tabindex="0" role="button" aria-label="Ir a C1: Ruta 3 - Daños Evitables">
                    <span class="leaf-marker">C1</span>
                    <div class="leaf-content">
                      <strong class="leaf-name">Ruta 3 · Daños Evitables</strong>
                      <span class="leaf-desc">Emisión continua de humo</span>
                    </div>
                    ${current === 'c1' ? '<span class="current-badge">Nodo actual</span>' : ''}
                  </div>

                  <!-- C2 -->
                  <div class="tree-leaf-node ${current === 'c2' ? 'active is-current' : ''} ${this.visitedNodes.has('c2') ? 'visited' : ''} leaf-c2" 
                       data-node-id="c2" tabindex="0" role="button" aria-label="Ir a C2: Ruta 4 - Aptitud y Diligencia">
                    <span class="leaf-marker">C2</span>
                    <div class="leaf-content">
                      <strong class="leaf-name">Ruta 4 · Aptitud y Diligencia</strong>
                      <span class="leaf-desc">Revisión superficial</span>
                    </div>
                    ${current === 'c2' ? '<span class="current-badge">Nodo actual</span>' : ''}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="tree-map-footer">
          <div class="tree-legend">
            <span class="legend-item"><span class="legend-color legend-current"></span> Selección actual</span>
            <span class="legend-item"><span class="legend-color legend-visited"></span> Visitado</span>
            <span class="legend-item"><span class="legend-color legend-unvisited"></span> Por explorar</span>
          </div>
        </div>
      </div>
    `;

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
