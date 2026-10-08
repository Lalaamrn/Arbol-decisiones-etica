/**
 * ÁRBOL DE DECISIONES : ÉTICA PROFESIONAL EN INGENIERÍA
 * Estructura de datos formal y modular del árbol de decisiones.
 * Todos los textos conservan EXACTAMENTE la redacción, puntuación y signos originales.
 */

const DECISION_TREE_DATA = {
  metadata: {
    title: "Árbol de decisiones ",
    subtitle: "Ética profesional y toma de decisiones en ingeniería",
    course: "Ética Profesional en Ingeniería",
    version: "1.0.0"
  },

  nodes: {
    // PANTALLA 1: PORTADA
    "portada": {
      id: "portada",
      type: "cover",
      stepNumber: 0,
      stepLabel: "Portada",
      title: "Árbol de decisiones ",
      subtitle: "Ética profesional y toma de decisiones en ingeniería",
      image: "assets/images/img-portada.jpg",
      imageAlt: "Ilustración de ingeniera frente a la fábrica, el río y la comunidad residencial",
      concept: "Una decisión de ingeniería puede afectar a la industria, la comunidad y el medio ambiente.",
      nextId: "inicio"
    },

    // PANTALLA 2: SITUACIÓN INICIAL
    "inicio": {
      id: "inicio",
      type: "situation",
      stepNumber: 1,
      stepLabel: "Situación Inicial",
      title: "Árbol de decisiones :",
      text: "Ponte en los zapatos de un ingeniero o ingeniera. Te contrataron para instalar los sistemas básicos de una nueva fábrica que queda al lado de un barrio residencial y un río. El proyecto está muy retrasado, el presupuesto se está acabando y los jefes te están presionando fuertemente para entregar resultados ya. Tienes 3 opciones sobre la mesa para solucionar el problema. ¿Cuál decides tomar?",
      image: "assets/images/img-portada.jpg",
      imageAlt: "Vista panorámica de la fábrica situada entre el río y la comunidad",
      parent: "portada",
      options: [
        {
          id: "opcion-a",
          letter: "A",
          title: "Opción A",
          shortDescription: "Reducir costos y saltar pruebas de seguridad",
          targetNodeId: "opcion-a",
          image: "assets/images/img-opcion-a.jpg",
          badgeColor: "amber",
          badgeLabel: "Ruta A: Costos y Pruebas"
        },
        {
          id: "opcion-b",
          letter: "B",
          title: "Opción B",
          shortDescription: "Aceptar alta tensión sin ser especialista",
          targetNodeId: "opcion-b",
          image: "assets/images/img-opcion-b.jpg",
          badgeColor: "purple",
          badgeLabel: "Ruta B: Alta Tensión"
        },
        {
          id: "opcion-c",
          letter: "C",
          title: "Opción C",
          shortDescription: "Encender con permisos provisionales bajo presión",
          targetNodeId: "opcion-c",
          image: "assets/images/img-opcion-c.jpg",
          badgeColor: "rose",
          badgeLabel: "Ruta C: Presión de Entrega"
        }
      ]
    },

    // OPCIÓN A: DECISIÓN Y SUB-OPCIONES (A1 y A2)
    "opcion-a": {
      id: "opcion-a",
      type: "decision_branch",
      stepNumber: 2,
      stepLabel: "Decisión A",
      letter: "A",
      title: "Opción A",
      text: "Opción A: “Decides reducir los costos comprando componentes mucho más baratos y saltándote las pruebas de seguridad, prometiendo que arreglarás cualquier problema meses después cuando haya más plata.\"",
      subQuestion: "- Decidiste ahorrar comprando componentes baratos. ¿En qué parte decides aplicar ese recorte de presupuesto?",
      image: "assets/images/img-opcion-a.jpg",
      imageAlt: "Ingeniera revisando cajas de componentes económicos en la fábrica",
      concept: "Reducir costos puede afectar la seguridad y la calidad.",
      parent: "inicio",
      options: [
        {
          id: "a1",
          subKey: "A1",
          title: "Opción A1",
          text: "A1: \"En los filtros que limpian el agua de la fábrica antes de que caiga al río.\" ",
          shortDescription: "Recorte en los filtros de tratamiento de agua",
          targetNodeId: "a1",
          destinationRoute: "RUTA 1 – IMPACTO AMBIENTAL",
          badgeColor: "teal",
          image: "assets/images/img-ruta-1.jpg"
        },
        {
          id: "a2",
          subKey: "A2",
          title: "Opción A2",
          text: "A2: \"En los sensores térmicos y alarmas contra incendios de las máquinas.\" ",
          shortDescription: "Recorte en sensores térmicos y alarmas de incendio",
          targetNodeId: "a2",
          destinationRoute: "RUTA 2 – VIDA Y SALUD",
          badgeColor: "red",
          image: "assets/images/img-ruta-2.jpg"
        }
      ]
    },

    // RUTA 1: IMPACTO AMBIENTAL (Desde A1)
    "a1": {
      id: "a1",
      type: "consequence_route",
      stepNumber: 3,
      stepLabel: "Consecuencia Final",
      routeBadge: "RUTA 1 – IMPACTO AMBIENTAL",
      routeNumber: "Ruta 1",
      routeName: "Impacto Ambiental",
      routeClass: "route-environmental",
      decisionText: "A1: \"En los filtros que limpian el agua de la fábrica antes de que caiga al río.\" ",
      consequenceTitle: "Consecuencia",
      consequenceText: "Consecuencia: Los componentes económicos que instalaste fallaron a los tres meses de operación. La planta comenzó a verter residuos líquidos sin tratar directamente al río cercano, afectando el agua de la que se abastece la comunidad.",
      image: "assets/images/img-ruta-1.jpg",
      imageAlt: "Tubería vertiendo residuos al río ante la preocupación de los vecinos",
      concept: "Una decisión económica provoca contaminación del río y afecta a la comunidad.",
      ethicalReflection: "Principio de Responsabilidad Ambiental y Social: Las decisiones técnicas orientadas a la reducción de costos no pueden comprometer los recursos naturales ni el bienestar de las comunidades aledañas.",
      parent: "opcion-a"
    },

    // RUTA 2: VIDA Y SALUD (Desde A2)
    "a2": {
      id: "a2",
      type: "consequence_route",
      stepNumber: 3,
      stepLabel: "Consecuencia Final",
      routeBadge: "RUTA 2 – VIDA Y SALUD",
      routeNumber: "Ruta 2",
      routeName: "Vida y Salud",
      routeClass: "route-safety",
      decisionText: "A2: \"En los sensores térmicos y alarmas contra incendios de las máquinas.\" ",
      consequenceTitle: "Consecuencia",
      consequenceText: "Consecuencia: Al no contar con alarmas de seguridad avanzadas, una máquina se recalentó sin previo aviso y se produjo un conato de incendio que puso en riesgo la integridad física de los trabajadores de la planta.",
      image: "assets/images/img-ruta-2.jpg",
      imageAlt: "Máquina recalentada con humo y alarma de emergencia mientras el operario corre hacia la zona de seguridad",
      concept: "Una falla en los sistemas de seguridad pone en riesgo a los trabajadores.",
      ethicalReflection: "Principio de Primacía de la Seguridad Humana: La integridad física y la salud de los trabajadores constituyen un límite no negociable ante cualquier restricción presupuestal o de cronograma.",
      parent: "opcion-a"
    },

    // OPCIÓN B: ALTA TENSIÓN Y RUTA 5 (IDONEIDAD)
    "opcion-b": {
      id: "opcion-b",
      type: "direct_route",
      stepNumber: 2,
      stepLabel: "Decisión y Consecuencia",
      letter: "B",
      title: "Opción B",
      text: "Opción B: \"El gerente te ofrece pagarte el doble de sueldo si tú mismo te encargas de instalar la red eléctrica principal de alta tensión de la fábrica. El detalle es que tu especialidad no es la electricidad y nunca has hecho algo así, pero te dicen: 'Tú eres ingeniero, acepta, miras un par de tutoriales y lo sacamos adelante'.\"",
      initialImage: "assets/images/img-opcion-b.jpg",
      initialImageAlt: "Ingeniera frente a tableros de alta tensión intentando seguir un tutorial en su teléfono",
      initialConcept: "Realizar un trabajo especializado sin contar con la preparación necesaria.",
      routeBadge: "RUTA 5 – IDONEIDAD",
      routeNumber: "Ruta 5",
      routeName: "Idoneidad",
      routeClass: "route-competence",
      consequenceTitle: "Consecuencia",
      consequenceText: "Consecuencia: Como aceptaste un trabajo para el que no estabas preparado (falta de idoneidad), calculaste mal los cables, hiciste un cortocircuito masivo y dejaste sin energía a todo el sector.",
      consequenceImage: "assets/images/img-ruta-5.jpg",
      consequenceImageAlt: "Apagón masivo en la fábrica y el barrio tras cortocircuito en el tablero eléctrico",
      consequenceConcept: "Una falta de idoneidad profesional provoca una falla eléctrica que afecta a todo el sector.",
      ethicalReflection: "Principio de Idoneidad y Competencia Profesional: Los profesionales de ingeniería solo deben prestar servicios y asumir responsabilidades en las áreas en las cuales cuenten con la competencia técnica y legal demostrable.",
      parent: "inicio"
    },

    // OPCIÓN C: PRESIÓN DEL CLIENTE Y SUB-OPCIONES (C1 y C2)
    "opcion-c": {
      id: "opcion-c",
      type: "decision_branch",
      stepNumber: 2,
      stepLabel: "Decisión C",
      letter: "C",
      title: "Opción C",
      text: "Opción C: \"El cliente te ruega que enciendas la fábrica ya mismo usando permisos provisionales, aunque todavía falten instalar sistemas importantes, porque si no abren hoy pierden un contrato millonario.\"",
      subQuestion: "- Decidiste encender la fábrica a las carreras. ¿Cómo manejas esa situación?",
      image: "assets/images/img-opcion-c.jpg",
      imageAlt: "Cliente en traje presionando a la ingeniera señalando su reloj frente a sistemas incompletos",
      concept: "Presión por poner en funcionamiento una fábrica que todavía no está completamente lista.",
      parent: "inicio",
      options: [
        {
          id: "c1",
          subKey: "C1",
          title: "Opción C1",
          text: "C1: \"La dejas funcionando así indefinidamente, ignorando que está botando humo tóxico al barrio, con tal de mantener contento al cliente.\" ",
          shortDescription: "Ignorar humo tóxico continuo para complacer al cliente",
          targetNodeId: "c1",
          destinationRoute: "RUTA 3 – DAÑOS EVITABLES",
          badgeColor: "orange",
          image: "assets/images/img-ruta-3.jpg"
        },
        {
          id: "c2",
          subKey: "C2",
          title: "Opción C2",
          text: "C2: \"Haces una revisión 'por encimita' a toda carrera, firmas que todo está perfecto y entregas la obra cruzando los dedos para que nada falle.\" ",
          shortDescription: "Revisión superficial apresurada y firma sin verificación",
          targetNodeId: "c2",
          destinationRoute: "RUTA 4 – APTITUD Y DILIGENCIA",
          badgeColor: "amber",
          image: "assets/images/img-ruta-4.jpg"
        }
      ]
    },

    // RUTA 3: DAÑOS EVITABLES (Desde C1)
    "c1": {
      id: "c1",
      type: "consequence_route",
      stepNumber: 3,
      stepLabel: "Consecuencia Final",
      routeBadge: "RUTA 3 – DAÑOS EVITABLES",
      routeNumber: "Ruta 3",
      routeName: "Daños Evitables",
      routeClass: "route-avoidable-damage",
      decisionText: "C1: \"La dejas funcionando así indefinidamente, ignorando que está botando humo tóxico al barrio, con tal de mantener contento al cliente.\" ",
      consequenceTitle: "Consecuencia",
      consequenceText: "Consecuencia: La 'solución temporal' generó emisiones de gas que afectaron la salud de los vecinos del sector. El cliente te amenaza con cancelar el contrato si no renuevas el permiso temporal en lugar de instalar el filtro definitivo.",
      image: "assets/images/img-ruta-3.jpg",
      imageAlt: "Chimeneas emitiendo humo sobre el vecindario mientras los habitantes tosen y reclaman",
      concept: "Una solución temporal termina afectando la salud de la comunidad.",
      ethicalReflection: "Principio de Prevención de Daños Evitables: Permitir que una medida provisoria defectuosa se vuelva permanente vulnera la confianza pública y genera responsabilidades éticas y legales directas.",
      parent: "opcion-c"
    },

    // RUTA 4: APTITUD Y DILIGENCIA (Desde C2)
    "c2": {
      id: "c2",
      type: "consequence_route",
      stepNumber: 3,
      stepLabel: "Consecuencia Final",
      routeBadge: "RUTA 4 – APTITUD Y DILIGENCIA",
      routeNumber: "Ruta 4",
      routeName: "Aptitud y Diligencia",
      routeClass: "route-diligence",
      decisionText: "C2: \"Haces una revisión 'por encimita' a toda carrera, firmas que todo está perfecto y entregas la obra cruzando los dedos para que nada falle.\" ",
      consequenceTitle: "Consecuencia",
      consequenceText: "Consecuencia: Por hacer las revisiones 'por encimita' y sin la dedicación necesaria, el sistema quedó lleno de fallas técnicas no detectadas a tiempo, y el cliente terminó perdiendo su inversión.",
      image: "assets/images/img-ruta-4.jpg",
      imageAlt: "Ingeniera firmando y sellando una inspección apresuradamente sin revisar fallas mecánicas visibles",
      concept: "Una revisión superficial permite que fallas técnicas permanezcan ocultas.",
      ethicalReflection: "Principio de Aptitud y Diligencia Profesional: La firma y aprobación de un proyecto o sistema por parte de un ingeniero representa fe pública sobre la rigurosidad y veracidad técnica del trabajo realizado.",
      parent: "opcion-c"
    }
  },

  // ESTRUCTURA COMPLETA DEL ÁRBOL PARA EL MAPA INTERACTIVO
  treeStructure: {
    root: "inicio",
    nodes: [
      { id: "inicio", label: "Inicio: Situación Inicial", level: 0, category: "root" },
      { id: "opcion-a", label: "Opción A: Reducir Costos", level: 1, parent: "inicio", category: "decision" },
      { id: "a1", label: "A1 → Ruta 1: Impacto Ambiental", level: 2, parent: "opcion-a", category: "route", routeNum: 1 },
      { id: "a2", label: "A2 → Ruta 2: Vida y Salud", level: 2, parent: "opcion-a", category: "route", routeNum: 2 },
      { id: "opcion-b", label: "Opción B / Ruta 5: Idoneidad", level: 1, parent: "inicio", category: "route", routeNum: 5 },
      { id: "opcion-c", label: "Opción C: Presión del Cliente", level: 1, parent: "inicio", category: "decision" },
      { id: "c1", label: "C1 → Ruta 3: Daños Evitables", level: 2, parent: "opcion-c", category: "route", routeNum: 3 },
      { id: "c2", label: "C2 → Ruta 4: Aptitud y Diligencia", level: 2, parent: "opcion-c", category: "route", routeNum: 4 }
    ],
    connections: [
      { from: "inicio", to: "opcion-a" },
      { from: "inicio", to: "opcion-b" },
      { from: "inicio", to: "opcion-c" },
      { from: "opcion-a", to: "a1" },
      { from: "opcion-a", to: "a2" },
      { from: "opcion-c", to: "c1" },
      { from: "opcion-c", to: "c2" }
    ]
  }
};

// Exportar globalmente para navegación limpia en navegador
if (typeof window !== "undefined") {
  window.DECISION_TREE_DATA = DECISION_TREE_DATA;
}
