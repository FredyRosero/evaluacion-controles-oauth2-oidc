# evaluacion-controles-oauth2-oidc

Formulario web estático para evaluar riesgos y controles de seguridad en escenarios OAuth 2.0/OIDC, con generación de informe en Excel.

## Uso local

1. Abrir `index.html` en el navegador.
2. Seleccionar arquitectura y completar datos de riesgos/controles.
3. Presionar **Calcular resultados** para ver métricas globales.
4. Presionar **Exportar informe Excel** para descargar un archivo con nombre dinámico:
   `informe-evaluacion-oauth2-oidc-<organizacion>-<timestamp>.xls`.

## Despliegue en GitHub Pages

1. Ir a **Settings > Pages** del repositorio.
2. En **Build and deployment**, seleccionar **Deploy from a branch**.
3. Elegir la rama principal y la carpeta `/ (root)`.
4. Guardar y abrir la URL publicada por GitHub Pages.

## Cobertura funcional implementada

- Riesgos globales de OAuth 2.0/OIDC.
- Riesgos específicos para 3 arquitecturas:
  - SPA + BFF + IdP corporativo.
  - M2M con AS actuando también como RS.
  - API Gateway federado con AS corporativo.
- Evaluación de riesgo por activo, amenaza, probabilidad e impacto.
- Evaluación de controles en 5 dimensiones:
  - Madurez.
  - Automatización.
  - Momento.
  - Periodicidad.
  - Alcance funcional.
- Homologación cuantitativa por dimensión y score ponderado por control.
- Métricas globales de eficiencia/eficacia cuantitativa y cualitativa.
- Exportación del informe a Excel (hojas: Resumen, Riesgos, Controles).
