# evaluacion-controles-oauth2-oidc

Formulario web estático para evaluar riesgos y controles de seguridad en escenarios OAuth 2.0/OIDC, con generación de informe en Excel.

## Uso local

1. Servir el repositorio con un servidor HTTP simple para permitir la carga del catálogo, por ejemplo: `python3 -m http.server 8000` o `npx http-server`.
2. Abrir `http://localhost:8000/index.html` en el navegador.
3. Seleccionar la arquitectura y completar contexto, riesgos y controles.
4. Presionar **Calcular resultados** para ver métricas globales y resultados por riesgo.
5. Presionar **Exportar informe Excel** para descargar un archivo con nombre dinámico:
   `informe-evaluacion-oauth2-oidc-<organizacion>-<timestamp>.xls`.

## Despliegue en GitHub Pages

1. Ir a **Settings > Pages** del repositorio.
2. En **Build and deployment**, seleccionar **Deploy from a branch**.
3. Elegir la rama principal y la carpeta `/ (root)`.
4. Guardar y abrir la URL publicada por GitHub Pages.

## Cobertura funcional implementada

- Catálogo maestro cargado dinámicamente desde `catalogo/data/catalogo-maestro.json`.
- Evaluación de 3 escenarios OAuth 2.0/OIDC con filtros activos por escenario.
- Cobertura de 14 riesgos del catálogo (5 globales y 9 específicos) y 20 controles esperados.
- Contexto de evaluación ampliado con organización, evaluador, ambiente, sistema evaluado y notas de alcance.
- Tarjetas de riesgo con:
  - descripción del riesgo desde catálogo;
  - probabilidad e impacto cualitativos;
  - nivel de riesgo identificado calculado automáticamente;
  - vulnerabilidad o condición habilitante;
  - lucro cesante;
  - hallazgo, brecha u observación.
- Tarjetas de control con:
  - descripción del control y referencia normativa desde catálogo;
  - madurez, automatización, momento, periodicidad y alcance funcional;
  - factor de evidencia;
  - evidencia encontrada y fuente de evidencia;
  - costo sugerido desde `costoTotal.medio` del catálogo;
  - score del control calculado con la fórmula del catálogo.
- Motor de cálculo alineado al catálogo maestro para score, eficacia frente al riesgo, costo asignado, eficiencia frente al riesgo y métricas globales.
- Tabla nueva de **Resultados por riesgo** con eficacia, eficiencia, costo asignado, beneficio estimado y exposición observada.
- Exportación Excel con hojas: **Resumen**, **Riesgos**, **Controles** y **Resultados riesgo**.
