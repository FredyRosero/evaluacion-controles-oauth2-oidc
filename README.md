# Diseño de un modelo de evaluación de controles de seguridad para arquitecturas de identidad federada basadas en OAuth 2.0 y OpenID Connect

Repositorio académico del trabajo de tesis y de su entregable aplicado.

Este repositorio reúne el documento fuente de la tesis, su versión PDF, los anexos técnicos y el formulario web estático que operacionaliza el modelo de evaluación propuesto para escenarios OAuth 2.0 y OpenID Connect.

## Naturaleza del repositorio

El proyecto está compuesto por dos piezas complementarias:

1. **Documento de tesis**: desarrolla el marco conceptual, el modelo de evaluación, los escenarios arquitectónicos, las fórmulas de calificación y el experimento aplicado.
2. **Entregable web**: implementa en una interfaz estática el catálogo maestro, el diligenciamiento de la evaluación y el cálculo de score, eficacia, eficiencia y exposición observada.

## Dónde consultar la tesis

- **Versión Markdown editable**: [tesis/README.md](tesis/README.md)
- **Versión PDF generada**: [tesis/Tesis.Fredy_Rosero.pdf](tesis/Tesis.Fredy_Rosero.pdf)
- **Anexos, diagramas y artefactos complementarios**: [tesis/anexos/](tesis/anexos/)

## Contenido principal del repositorio

| Ruta                                                                       | Descripción                                                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [tesis/README.md](tesis/README.md)                                         | Documento principal de la tesis en Markdown.                        |
| [tesis/Tesis.Fredy_Rosero.pdf](tesis/Tesis.Fredy_Rosero.pdf)               | Versión PDF renderizada de la tesis.                                |
| [tesis/anexos/](tesis/anexos/)                                             | Diagramas, artefactos JSON y material de apoyo.                     |
| [index.html](index.html)                                                   | Punto de entrada del formulario web.                                |
| [app.js](app.js)                                                           | Lógica cliente del entregable web.                                  |
| [catalogo/data/catalogo-maestro.json](catalogo/data/catalogo-maestro.json) | Catálogo maestro de riesgos, controles y relaciones riesgo-control. |

## Resumen del aporte

La tesis propone un modelo de evaluación de controles de seguridad para arquitecturas de identidad federada basadas en OAuth 2.0 y OpenID Connect desde un enfoque de aseguramiento orientado a riesgos. En este repositorio, ese aporte se materializa mediante:

- un catálogo maestro versionado de riesgos, controles, referencias y ponderadores;
- tres escenarios evaluables de arquitectura OAuth 2.0/OIDC;
- un formulario web para diligenciar contexto, riesgos, controles y evidencia;
- un motor de cálculo para score de control, eficacia frente al riesgo, eficiencia frente al riesgo y evaluación global;
- exportación de resultados en formato Excel.

## Alcance funcional del entregable web

- Catálogo maestro cargado dinámicamente desde [catalogo/data/catalogo-maestro.json](catalogo/data/catalogo-maestro.json).
- Evaluación de 3 escenarios OAuth 2.0/OIDC con filtros activos por escenario.
- Cobertura de 14 riesgos del catálogo (5 globales y 9 específicos) y 20 controles esperados.
- Contexto de evaluación ampliado con organización, evaluador, ambiente, sistema evaluado y notas de alcance.
- Registro de riesgos con descripción, probabilidad, impacto, vulnerabilidad, lucro cesante y hallazgos.
- Registro de controles con madurez, automatización, momento, periodicidad, alcance funcional, evidencia y costo sugerido.
- Motor de cálculo alineado al catálogo maestro para score, eficacia frente al riesgo, costo asignado, eficiencia frente al riesgo y métricas globales.
- Tabla de resultados por riesgo con eficacia, eficiencia, costo asignado, beneficio estimado y exposición observada.
- Exportación Excel con hojas `Resumen`, `Riesgos`, `Controles` y `Resultados riesgo`.

## Uso local del entregable web

1. Servir el repositorio con un servidor HTTP simple para permitir la carga del catálogo, por ejemplo: `python3 -m http.server 8000` o `npx http-server`.
2. Abrir `http://localhost:8000/index.html` en el navegador.
3. Seleccionar la arquitectura y completar contexto, riesgos y controles.
4. Presionar **Calcular resultados** para ver métricas globales y resultados por riesgo.
5. Presionar **Exportar informe Excel** para descargar un archivo con nombre dinámico: `informe-evaluacion-oauth2-oidc-<organizacion>-<timestamp>.xls`.

## Generación local del PDF de la tesis

Si se desea regenerar la versión PDF del documento:

1. Ir a la carpeta [tesis/](tesis/).
2. Ejecutar `./render-pdf.ps1` en PowerShell.
3. El archivo resultante se genera como [tesis/Tesis.Fredy_Rosero.pdf](tesis/Tesis.Fredy_Rosero.pdf).

## Despliegue en GitHub Pages

1. Ir a **Settings > Pages** del repositorio.
2. En **Build and deployment**, seleccionar **Deploy from a branch**.
3. Elegir la rama principal y la carpeta `/ (root)`.
4. Guardar y abrir la URL publicada por GitHub Pages.

## Observación

Este repositorio no solo contiene un formulario web. También funciona como repositorio de tesis: conserva el documento académico, sus diagramas, los anexos de soporte y el entregable aplicado que implementa el modelo propuesto.
