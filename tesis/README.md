---
Titulo: Diseño de un modelo de evaluación de controles de seguridad para arquitecturas de identidad federada basadas en OAuth 2.0 y OpenID Connect
Autor: Fredy Andres Rosero Cristancho
Versión: 11
---

## 1. Introducción

### 1.1. Contexto

En el diseño de soluciones seguras para la comunicación entre aplicaciones, APIs y servicios distribuidos, las arquitecturas modernas dependen cada vez más de mecanismos de identidad federada. En este contexto, **OAuth 2.0 y OpenID Connect** se han convertido en tecnologías ampliamente utilizadas para delegar autorización, autenticar usuarios y proteger recursos expuestos mediante APIs.

Sin embargo, ningún **sistema es 100% seguro**. El uso de OAuth 2.0 y OpenID Connect (en adelante, OIDC) no garantiza por sí mismo una arquitectura segura. La seguridad depende de cómo se implementan los flujos, cómo se emiten y validan los tokens, cómo se gestionan los clientes, cómo se aplican los controles de acceso y cómo se evidencia el cumplimiento de dichos controles.

Desde una perspectiva de **aseguramiento** de tecnologías de información, la evaluación de estas arquitecturas debe considerar la relación entre riesgos, controles y auditoría. Esto permite pasar de una revisión solamente técnica a una evaluación más estructurada sobre qué puede fallar, qué controles deben existir, cómo están diseñados y qué evidencias permiten verificar su operación.

En este sentido, el enfoque de Valencia Duque resulta pertinente para esta tesis, ya que propone evaluar los controles no solo desde su existencia formal, sino desde su capacidad para mitigar riesgos. En particular, el autor plantea que la efectividad del control puede analizarse a partir de dos variables: la **eficiencia del control**, relacionada con su diseño, y la **eficacia del control**, relacionada con el cumplimiento real del objetivo para el cual fue definido.

Aplicado al caso de OAuth 2.0 y OpenID Connect, esto implica que no basta con afirmar que existe un control, por ejemplo, validación de tokens, uso de scopes o gestión de secretos. También es necesario analizar si dicho control está adecuadamente diseñado para el riesgo que pretende mitigar y si realmente opera de forma verificable en la arquitectura evaluada.

### 1.2. Planteamiento del problema

En muchas organizaciones, OAuth 2.0 y OpenID Connect son adoptados como mecanismos estándar para autenticación, autorización y protección de APIs. No obstante, la presencia de estos protocolos en una solución no implica necesariamente que los riesgos estén correctamente:

1. identificados,
2. controlados,
3. evaluados y auditados.

Una arquitectura puede utilizar OAuth 2.0 u OIDC y aun así presentar debilidades como exposición de tokens, validación incompleta de claims, uso excesivo de privilegios, gestión deficiente de secretos, clientes mal configurados, tokens con vigencia inadecuada o falta de trazabilidad sobre las operaciones realizadas.

El problema no consiste únicamente en determinar si una solución utiliza OAuth 2.0 u OIDC, sino en evaluar si su implementación cuenta con controles adecuados frente a los riesgos del escenario **arquitectónico** en el que se aplica.

Adicionalmente, en la práctica puede existir una diferencia entre el control declarado y el control realmente implementado. Por ejemplo, un equipo puede afirmar que una API valida correctamente los tokens, pero dicha afirmación no necesariamente demuestra que se validen elementos como firma, expiración, `issuer`, `audience`, scopes o permisos de acuerdo con el riesgo del recurso protegido.

Por tanto, se requiere una forma estructurada de analizar arquitecturas basadas en OAuth 2.0 u OIDC desde la relación entre:

1. riesgos,
2. controles,
3. diseño del control,
4. evidencia de operación,
5. y evidencias auditables.

Esta tesis aborda ese problema mediante un modelo de evaluación, materializado en una matriz, que no solo identifica riesgos y controles, sino que también permite clasificar el estado del control y considerar su eficiencia y eficacia desde un enfoque de aseguramiento orientado a riesgos.

### 1.3. Pregunta de investigación

¿Cómo evaluar el aseguramiento (los riesgos, controles y evidencias auditables) asociados a escenarios representativos de arquitecturas de identidad federada basadas en OAuth 2.0 y OpenID Connect, considerando el diseño y operación de los controles?

### 1.4. Justificación

La identidad digital y la protección de APIs son componentes críticos en arquitecturas de sistemas distribuidos modernas. Una configuración incorrecta de OAuth 2.0 u OIDC puede afectar la **confidencialidad, integridad, disponibilidad** de los recursos protegidos, pero además la **trazabilidad** de las operaciones realizadas por usuarios, clientes técnicos o servicios.

Aunque ya existen estándares, guías y buenas prácticas sobre OAuth 2.0, OpenID Connect, seguridad de APIs y gestión de riesgos, estos recursos suelen encontrarse dispersos o formulados con distintos niveles de abstracción. Esto dificulta su aplicación directa y pragmática en una evaluación arquitectónica orientada a riesgos.

Esta tesis busca aportar un modelo de evaluación, materializado en una matriz, que organice riesgos, controles, estados de implementación y evidencias auditables para escenarios representativos de uso de OAuth 2.0 u OIDC. Una parte sustantiva de ese aporte consiste en construir un catálogo estructurado de riesgos globales, riesgos específicos por escenario y controles esperados para las arquitecturas evaluadas. El aporte no consiste en crear un nuevo marco de gestión de riesgos, sino en adaptar un enfoque de aseguramiento orientado a riesgos al análisis de arquitecturas de identidad federada que implementan OAuth 2.0 y OpenID Connect.

El trabajo se apoya conceptualmente en el enfoque de riesgo, control y auditoría presentado por Valencia Duque en el libro *Aseguramiento y auditoría de tecnologías de información orientados a riesgos: un enfoque basado en estándares internacionales*. En particular, se toma como referencia la idea de que la evaluación de controles debe considerar su efectividad, entendida a partir de la eficiencia y la eficacia del control.

Desde esta perspectiva, la matriz propuesta no solo pregunta si un control existe, sino también si está adecuadamente diseñado para el riesgo que pretende mitigar y si puede verificarse mediante evidencia suficiente.

Adicionalmente, la propuesta se condensa en un entregable aplicado que también forma parte del aporte de la tesis: un sitio web publicado en GitHub Pages, concebido como una interfaz de usuario (UI) para la evaluación. Tras seleccionar una de las tres arquitecturas del modelo, la UI carga el catálogo predefinido de riesgos globales, riesgos específicos del escenario y controles esperados. A partir de ese catálogo, el evaluador diligencia los datos de análisis, procesa y califica los controles, y genera un informe en formato Excel. Los algoritmos implementados en JavaScript no se definen de forma arbitraria, sino que derivan de las fórmulas y reglas de valoración que se expongan matemáticamente en esta tesis.

### 1.5. Objetivo general

Diseñar un modelo de evaluación de controles de seguridad para arquitecturas de identidad federada basadas en OAuth 2.0 y OpenID Connect desde un enfoque de aseguramiento orientado a riesgos.

### 1.6. Objetivos específicos

1. Caracterizar los conceptos fundamentales de identidad federada, OAuth 2.0, OpenID Connect, tokens, clientes, servidores de autorización y servidores de recursos. 

2. Identificar los riesgos de seguridad asociados a identidad federada y los controles técnicos y organizacionales aplicables.

3. Definir criterios de evaluación que permitan analizar la eficiencia del diseño y la eficacia operativa de los controles asociados a cada riesgo bajo NORMA ISO 27002 delimitados por arquitectura.

4. Aplicar el modelo de evaluación sobre tres escenarios con OAuth 2.0/OIDC para demostrar su utilidad como artefacto de análisis de riesgos, controles y evidencias auditables.

5. Condensar el modelo propuesto en un entregable web publicado en GitHub Pages, materializado como un formulario que cargue el catálogo predefinido de riesgos y controles del escenario seleccionado, procese las entradas de evaluación, calcule la calificación de los controles y genere un informe en Excel a partir de algoritmos JavaScript derivados de las fórmulas expuestas en la tesis.

### 1.7. Alcance y limitaciones

El alcance conceptual de esta tesis incluye dos casos base sin OAuth 2.0/OIDC y tres escenarios representativos donde sí se utilizan OAuth 2.0 y OpenID Connect.

Los dos casos base se usan únicamente como referencia del marco teórico. Su función es explicar el punto de partida arquitectónico antes de introducir identidad federada, Authorization Server, tokens, scopes y clientes OAuth:

1. Caso base 0A: monolito con autenticación y sesión local.
2. Caso base 0B: SPA estática con BFF y gestión local de usuarios.

El modelo de evaluación y su matriz se aplican únicamente a los tres escenarios OAuth 2.0/OIDC:

1. Escenario 1: SPA estática con BFF e IdP corporativo usando OAuth 2.0/OIDC.
2. Escenario 2: comunicación M2M donde el Authorization Server actúa también como Resource Server.
3. Escenario 3: API Gateway federado con Authorization Server corporativo, validación de tokens y posible propagación o intercambio de tokens.

La tesis no busca evaluar si un sistema utiliza OAuth 2.0 y OpenID Connect de forma nominal, sino analizar qué riesgos, controles y evidencias auditables deberían considerarse cuando estos protocolos aparecen en un escenario arquitectónico determinado. Los casos base permiten contraste conceptual, pero no hacen parte de la matriz del modelo de evaluación.

La evaluación propuesta no se basa únicamente en entrevistas o declaraciones de los responsables técnicos o funcionales. La matriz diferencia entre controles declarados, controles documentados y controles evidenciados técnicamente. Por tanto, una afirmación como “el sistema valida correctamente los tokens” no se considera evidencia suficiente si no está respaldada por configuración, documentación técnica, logs, pruebas o revisión de código, según corresponda.

La revisión de código puede ser considerada una fuente de evidencia cuando el control evaluado depende de la implementación de la aplicación, por ejemplo, validación de claims, manejo de tokens, uso de librerías de seguridad, almacenamiento de secretos o protección de sesiones. Sin embargo, esta tesis no pretende realizar una auditoría exhaustiva de repositorios ni inspeccionar todos los componentes de una organización específica.

La tesis considera la evaluación de controles desde dos dimensiones: su **eficiencia**, entendida como la adecuación del diseño del control frente al riesgo que busca mitigar; y su **eficacia**, entendida como la evidencia de que el control cumple realmente su objetivo. No obstante, la medición propuesta tiene un alcance académico y no reemplaza una auditoría formal de una entidad.

La tesis no pretende implementar un proveedor de identidad, comparar productos comerciales ni realizar una auditoría real sobre una organización específica.

Como materialización aplicada de la propuesta, sí contempla un entregable web publicado en GitHub Pages, concebido como formulario de evaluación para seleccionar una de las tres arquitecturas del modelo, cargar el catálogo predefinido de riesgos y controles asociados, registrar las entradas de evaluación, procesarlas, calificar los controles y generar un informe en Excel. Este entregable operacionaliza el modelo, pero no reemplaza el juicio profesional del evaluador ni constituye por sí mismo una plataforma integral de auditoría automatizada. Los algoritmos implementados en JavaScript derivan de las fórmulas y reglas de valoración expuestas matemáticamente en la tesis.

Tampoco busca cubrir todos los flujos, extensiones o perfiles existentes de OAuth 2.0 y OpenID Connect. El análisis se concentra en los elementos necesarios para construir una matriz de evaluación aplicable a los escenarios definidos.

### 1.8. Modelo general de evaluación

El modelo de evaluación propuesto en esta tesis está orientado a evaluar controles de seguridad en arquitecturas de identidad federada basadas en OAuth 2.0 y OpenID Connect.

El componente central del modelo será una matriz de evaluación que permita relacionar riesgos aplicables al escenario, controles esperados, evidencia auditable, nivel de madurez del control y nivel de exposición observado. El enfoque no se limita a verificar la existencia nominal de OAuth 2.0 u OIDC, sino a evaluar si los riesgos relevantes para el escenario están contemplados y caracterizados, y si los controles asociados son diseñados, implementados y evidenciados de forma suficiente.

Además de su formulación conceptual y matemática, el modelo se condensará en un entregable web publicado en GitHub Pages. En términos de aporte, esta materialización integra tres componentes: el catálogo predefinido de riesgos transversales, riesgos específicos y controles esperados; una interfaz de usuario (UI) web que aprovecha ese catálogo para guiar la evaluación; y unos algoritmos implementados en JavaScript que traducen operativamente las fórmulas y reglas de homologación expuestas en este documento. El formulario primero exige seleccionar una de las tres arquitecturas del modelo y, a partir de esa selección, carga el catálogo aplicable. Sobre ese catálogo, el evaluador diligencia los datos de evaluación, el sistema procesa y califica los controles, y genera un informe en formato Excel.

La aplicación del modelo se estructura en los siguientes pasos:

1. **Partir del catálogo de riesgos transversales o globales** aplicables a arquitecturas OAuth 2.0/OIDC, independientemente del escenario evaluado.

2. **Seleccionar la arquitectura o escenario evaluado**, delimitando actores, componentes, activos de información, relaciones de confianza y flujos relevantes.

3. **Activar y caracterizar los riesgos relevantes por escenario**, describiendo su manifestación en el estado actual de la arquitectura. Para cada riesgo se consideran, como mínimo:
   - activo afectado;
   - amenaza o causa;
   - vulnerabilidad o condición habilitante;
   - probabilidad;
   - impacto.

4. **Identificar controles esperados**, diferenciando entre:
   - controles transversales o globales;
   - controles específicos del escenario evaluado.

5. **Evaluar cada control esperado** mediante evidencia documental, técnica, operativa o de auditoría.

6. **Clasificar el control** según dimensiones de evaluación que permitan estimar su grado de madurez y capacidad real de mitigación:
   - madurez;
   - automatización;
   - momento de actuación;
   - periodicidad;
   - alcance funcional.

7. **Homologar cualitativa o cuantitativamente el estado del control**, con el fin de obtener una valoración comparable entre controles y escenarios.

8. **Evaluar la efectividad del control**, considerando:
   - eficiencia del control: adecuación del diseño frente al riesgo;
   - eficacia del control: evidencia de operación real.

9. **Estimar el nivel de exposición observado**, a partir del riesgo identificado, la efectividad de los controles existentes y la evidencia disponible al momento de la evaluación.

10. **Formular brechas, hallazgos y observaciones auditables**, manteniendo trazabilidad entre riesgo, control, evidencia y referencia normativa o técnica.

En términos operativos, el entregable web no funciona como un motor abierto para que el usuario invente riesgos desde cero. El evaluador primero selecciona una de las tres arquitecturas del modelo; con esa selección, el formulario carga un catálogo predefinido de riesgos globales OAuth 2.0/OIDC, riesgos específicos del escenario y controles esperados. Lo dinámico en la aplicación son los datos diligenciados por el evaluador para cada riesgo y control, como activo afectado, probabilidad, impacto, costo, evidencia y estado de las dimensiones del control.

De forma general, la lógica del modelo puede representarse así:

~~~mermaid
graph TD
A[Escenario OAuth 2.0/OIDC evaluado] --> B[Riesgos transversales y específicos]
B --> C[Controles esperados y estado observado]
C --> D[Evidencia auditable]
D --> E[Evaluación del control]
E --> F[Nivel de exposición observado]
F --> G[Hallazgos, brechas y observaciones]
~~~

Las dimensiones de evaluación del control son:

#### Madurez
- **Descripción:** Estado del control frente a su formalización, diseño, implementación y verificación.
- **Valores de referencia:** Declarado, diseñado, implementado, auditado.

#### Automatización
- **Descripción:** Grado en que el control depende de intervención humana o de mecanismos técnicos automatizados.
- **Valores de referencia:** Manual, semiautomático, automático.

#### Momento
- **Descripción:** Momento en el que el control actúa frente al riesgo.
- **Valores de referencia:** Preventivo, detectivo, correctivo.

#### Periodicidad
- **Descripción:** Frecuencia con la que el control se ejecuta o verifica.
- **Valores de referencia:** Ocasional, periódico, permanente.

#### Alcance funcional
- **Descripción:** Cobertura del control dentro de la arquitectura evaluada.
- **Valores de referencia:** Específico, general.

La matriz propuesta clasifica el estado de cada control según el nivel de evidencia disponible. Para ello se consideran, entre otros, los siguientes estados:

- **Declarado:** El control es afirmado por responsables técnicos o funcionales, pero no existe evidencia suficiente.
- **Diseñado:** El control aparece en documentación, arquitectura, configuración esperada o diseño técnico.
- **Implementado:** Existe evidencia técnica u operativa de que el control está implementado.
- **Auditado:** Existe evidencia de revisión, prueba, auditoría o verificación independiente del control.
- **Implementado parcialmente:** El control existe, pero no cubre completamente el riesgo identificado.
- **No implementado / deuda técnica:** El control no existe, está pendiente o fue identificado como deuda técnica.

Adicionalmente, la matriz incorpora una lectura de eficiencia y eficacia del control:

#### Eficiencia del control
- **Sentido en la tesis:** Evalúa si el control está adecuadamente diseñado para mitigar el riesgo.
- **Pregunta orientadora:** ¿El control es pertinente y suficiente frente al riesgo identificado?

#### Eficacia del control
- **Sentido en la tesis:** Evalúa si el control opera y cumple el objetivo para el cual fue definido.
- **Pregunta orientadora:** ¿Existe evidencia de que el control funciona en la arquitectura evaluada?

#### Efectividad del control
- **Sentido en la tesis:** Resultado conjunto entre diseño adecuado y operación verificable.
- **Pregunta orientadora:** ¿El control mitiga realmente el riesgo de forma verificable?

Las fuentes de evidencia pueden variar según el tipo de control evaluado. Estas pueden incluir documentación de arquitectura, configuración del proveedor de identidad, configuración del API Gateway, configuración del Resource Server, logs, resultados de pruebas técnicas, pipelines, políticas de seguridad o revisión puntual de código.

Este enfoque permite diferenciar entre la existencia declarada de un control, su diseño esperado, su implementación real, su verificación mediante evidencia auditable y su efecto sobre el nivel de exposición observado.

### 1.9. Estructura del documento

El documento se organiza de la siguiente manera:

El capítulo 1 presenta la introducción, el planteamiento del problema, la pregunta de investigación, la justificación, los objetivos, el alcance y el modelo general de evaluación.

El capítulo 2 desarrolla el marco conceptual sobre identidad federada, OAuth 2.0, OpenID Connect, tokens, clientes, servidores de autorización y APIs protegidas.

El capítulo 3 presenta el marco de aseguramiento orientado a riesgos, con énfasis en la relación entre riesgo, control y auditoría, y en la evaluación de controles a partir de eficiencia, eficacia y efectividad.

El capítulo 4 describe los dos casos base usados como referencia conceptual y los tres escenarios OAuth 2.0/OIDC que serán evaluados: SPA + BFF + IdP, M2M con Authorization Server como Resource Server y API Gateway federado con Authorization Server corporativo.

El capítulo 5 presenta el diseño del modelo de evaluación y de la matriz de riesgos, controles, estados de implementación, eficiencia, eficacia y evidencias auditables.

El capítulo 6 aplica la matriz únicamente a los tres escenarios OAuth 2.0/OIDC definidos, y analiza los resultados obtenidos.

El capítulo 7 presenta las conclusiones, limitaciones del trabajo y posibles líneas de trabajo futuro.

Los anexos incluyen la matriz completa, los diagramas de escenarios y la referencia del entregable web en GitHub Pages, junto con la estructura del formulario, el catálogo precargado de riesgos por escenario y el formato del reporte Excel.


---

## 2. Marco conceptual

Este capítulo establece el lenguaje técnico mínimo para evaluar arquitecturas de autenticación, autorización e identidad federada desde una perspectiva de riesgos, controles y evidencia auditable.

El propósito del marco conceptual no es describir exhaustivamente todos los perfiles y extensiones de OAuth 2.0 y OpenID Connect, sino explicar los conceptos que serán usados posteriormente en los casos base y en los tres escenarios OAuth 2.0/OIDC de la tesis.

La lógica del capítulo es la siguiente:

1. Primero se diferencia identidad digital, autenticación, autorización y federación.
2. Luego se explica qué resuelve OAuth 2.0 y qué no resuelve por sí solo.
3. Después se explica qué agrega OpenID Connect sobre OAuth 2.0.
4. Luego se analizan roles, tokens, validación, firmas JWT, PKCE y sesión con BFF.
5. Finalmente, se conecta el marco conceptual con los casos arquitectónicos de evaluación.

---

### 2.1. Identidad digital

La identidad digital es la representación de un sujeto dentro de un sistema de información. Ese sujeto puede ser:

- una persona;
- una aplicación;
- un servicio;
- una cuenta técnica;
- una carga de trabajo;
- un dispositivo;
- un proceso automático.

En el contexto de esta tesis, la identidad digital permite responder preguntas como:

1. ¿Quién o qué intenta acceder?
2. ¿Cómo se verifica esa identidad?
3. ¿Qué atributos describen al sujeto?
4. ¿Qué permisos tiene?
5. ¿Qué acciones ejecutó?
6. ¿Qué evidencia queda disponible para auditoría?

La identidad digital no se limita al usuario humano. En arquitecturas modernas, muchos accesos son ejecutados por servicios, pipelines, integraciones, aplicaciones backend o clientes técnicos. Por esta razón, la tesis considera tanto identidades humanas como identidades no humanas.

Desde la perspectiva de riesgo, una identidad digital mal gobernada puede generar:

- suplantación;
- exceso de privilegios;
- pérdida de trazabilidad;
- uso de cuentas huérfanas;
- abuso de credenciales técnicas;
- dificultad para atribuir acciones a un usuario, aplicación o servicio.

La identidad digital es el punto de partida para evaluar controles de autenticación, autorización, federación, emisión de tokens, validación de tokens y auditoría.

---

### 2.2. Autenticación, autorización y federación

#### 2.2.1. Autenticación

La autenticación es el proceso mediante el cual un sistema verifica la identidad de un sujeto.

Responde la pregunta:

> ¿Quién eres y cómo lo demuestras?

Ejemplos de mecanismos de autenticación:

- usuario y contraseña;
- certificado digital;
- llave criptográfica;
- autenticación multifactor;
- biometría;
- autenticación delegada ante un proveedor de identidad.

En OpenID Connect, la autenticación del usuario se representa principalmente mediante el `id_token`. Este token contiene claims sobre el evento de autenticación y sobre el usuario autenticado.

#### 2.2.2. Autorización

La autorización es el proceso mediante el cual un sistema decide si un sujeto autenticado o representado puede ejecutar una acción sobre un recurso.

Responde la pregunta:

> ¿Qué puedes hacer?

En OAuth 2.0, la autorización se expresa mediante:

- `access_token`;
- scopes;
- permisos;
- claims;
- políticas de acceso;
- relación entre cliente, recurso y servidor de autorización.

Un error común consiste en asumir que un token válido implica autorización suficiente. Esta suposición es débil. Un token puede ser válido criptográficamente, pero no estar destinado a la API correcta, no tener el scope requerido o no representar al sujeto adecuado para la operación solicitada.

#### 2.2.3. Federación de identidad

La federación de identidad ocurre cuando un sistema confía en una identidad autenticada o afirmada por otro sistema.

Responde la pregunta:

> ¿Acepto una identidad emitida por un tercero confiable?

En una arquitectura federada, una aplicación no necesariamente autentica directamente al usuario. En cambio, delega esa función en un proveedor de identidad o servidor de autorización.

Ejemplos de proveedores o plataformas de identidad:

- Keycloak;
- Microsoft Entra ID;
- Okta;
- Auth0;
- Ping Identity;
- ADFS;
- Amazon Cognito.

Federar no elimina el riesgo. Traslada parte de la confianza hacia un componente especializado. Por tanto, la evaluación debe revisar:

- quién emite la identidad o el token;
- qué relaciones de confianza existen;
- qué claims se aceptan;
- qué validaciones realiza el consumidor;
- qué evidencia queda de la autenticación y autorización.

---

### 2.3. OAuth 2.0

OAuth 2.0 es un marco de autorización. Permite que un cliente obtenga acceso limitado a recursos protegidos, ya sea en nombre de un usuario o en nombre de la propia aplicación.

Su propósito central no es autenticar usuarios, sino delegar autorización.

En términos simples:

> OAuth 2.0 permite que una aplicación acceda a un recurso protegido sin que el usuario entregue directamente sus credenciales a esa aplicación.

#### 2.3.1. Qué resuelve OAuth 2.0

OAuth 2.0 ayuda a resolver problemas como:

- evitar que una aplicación conozca la contraseña del usuario;
- limitar el acceso mediante scopes;
- emitir tokens con vigencia controlada;
- separar autorización de consumo de recursos;
- permitir acceso delegado entre aplicaciones y APIs;
- soportar escenarios con usuario y escenarios sin usuario humano.

#### 2.3.2. Qué no resuelve OAuth 2.0 por sí solo

OAuth 2.0 no garantiza automáticamente que una arquitectura sea segura. Su seguridad depende de la configuración, del flujo seleccionado, de la validación de tokens, del manejo de secretos y de la operación de controles complementarios.

OAuth 2.0 no resuelve por sí solo:

- autenticación completa del usuario, salvo que se use junto con OIDC;
- autorización fina de negocio;
- protección automática contra XSS o robo de sesión;
- gestión segura de secretos;
- trazabilidad completa;
- segregación de funciones;
- gobierno de clientes técnicos;
- auditoría de accesos.

Por esta razón, en la tesis OAuth 2.0 se evalúa como parte de una arquitectura de controles, no como garantía suficiente de seguridad.

---

### 2.4. OpenID Connect

OpenID Connect es una capa de identidad construida sobre OAuth 2.0. Permite que un cliente verifique la identidad de un usuario final y obtenga información básica de su perfil mediante claims.

En términos simples:

> OAuth 2.0 responde qué acceso fue autorizado; OpenID Connect permite además saber quién fue autenticado.

OIDC agrega elementos como:

- `id_token`;
- endpoint de autorización;
- endpoint de token;
- endpoint de UserInfo, si aplica;
- claims de identidad;
- discovery metadata;
- JWKS para validación criptográfica;
- parámetro `nonce` para mitigar repetición o sustitución.

#### 2.4.1. Qué agrega OIDC sobre OAuth 2.0

OIDC no reemplaza a OAuth 2.0. Lo extiende.

OAuth 2.0 proporciona el mecanismo de autorización delegada. OIDC usa esa base para representar autenticación de usuario mediante un `id_token`.

Elementos clave que suma OIDC:

- **`id_token`:** JWT que representa el evento de autenticación del usuario.
- **Claims de identidad:** atributos como sujeto, nombre, correo o grupos, según configuración.
- **`nonce`:** valor usado para mitigar ataques de repetición o sustitución en el flujo de autenticación.
- **UserInfo endpoint:** endpoint para consultar claims adicionales del usuario.
- **Discovery y JWKS:** metadatos y claves públicas para validar tokens.

#### 2.4.2. OAuth 2.0 no es lo mismo que OIDC

La tesis trata explícitamente esta diferencia porque la confusión entre OAuth 2.0 y OIDC genera riesgos de diseño.

#### Registro 1: Propósito

- **OAuth 2.0:** autorización delegada.
- **OIDC:** autenticación federada del usuario sobre OAuth 2.0.

#### Registro 2: Token principal

- **OAuth 2.0:** `access_token`, usado para consumir APIs protegidas.
- **OIDC:** `id_token`, usado para representar el login del usuario.

#### Registro 3: Pregunta que responde

- **OAuth 2.0:** ¿qué acceso fue autorizado?
- **OIDC:** ¿quién fue autenticado y bajo qué contexto?

#### Registro 4: Error frecuente

- Usar OAuth 2.0 como si fuera autenticación completa.
- Usar el `id_token` para consumir APIs de negocio.
- Aceptar claims sin validar emisor, audiencia, firma, expiración o contexto.
- Asumir que login federado implica autorización automática sobre recursos de negocio.

La matriz de evaluación debe verificar que cada token se use para el propósito correcto.

---

### 2.5. Roles de OAuth 2.0

OAuth 2.0 define roles lógicos. Estos roles pueden estar desplegados en sistemas separados o convivir dentro de una misma plataforma.

#### 2.5.1. Resource Owner

Es el sujeto que posee o está asociado al recurso protegido.

En escenarios con usuario final, suele ser una persona. En escenarios técnicos, puede no haber usuario humano directo y el acceso puede representar a un cliente técnico.

Riesgos asociados:

- ambigüedad sobre quién es el sujeto real;
- pérdida de trazabilidad;
- confusión entre acción de usuario y acción de sistema.

#### 2.5.2. Client

Es la aplicación que solicita autorización para acceder a un recurso protegido.

Puede ser:

- SPA;
- aplicación móvil;
- BFF;
- backend;
- proceso batch;
- servicio técnico;
- API Gateway actuando como intermediario.

La matriz debe evaluar si el tipo de cliente coincide con los controles aplicados. Un cliente público no debe depender de la confidencialidad de un `client_secret` embebido en la aplicación.

#### 2.5.3. Authorization Server

Es el componente que autentica al cliente, procesa la autorización y emite tokens.

Puede coincidir con un proveedor de identidad cuando se usa OIDC.

Controles relevantes:

- registro de clientes;
- redirect URIs;
- scopes;
- políticas de token;
- algoritmos permitidos;
- gestión de claves;
- autenticación de clientes;
- logs de emisión y revocación;
- rotación de secretos y certificados.

#### 2.5.4. Resource Server

Es la API o servicio que protege recursos y recibe tokens de acceso.

Su responsabilidad no es solo recibir el token. Debe validarlo y aplicar autorización.

Controles relevantes:

- validación de firma o introspección;
- validación de `issuer`;
- validación de `audience`;
- validación de expiración;
- validación de scopes o permisos;
- aplicación de reglas de negocio;
- trazabilidad de decisiones de acceso.

#### 2.5.5. Authorization Server y Resource Server pueden convivir

Conceptualmente, Authorization Server y Resource Server son roles distintos.

Sin embargo, en la práctica pueden convivir dentro del mismo servicio o producto. Esto puede ocurrir por:

- simplicidad operativa;
- bajo presupuesto;
- equipos pequeños;
- aplicaciones monolíticas;
- plataformas IAM que emiten tokens y exponen APIs administrativas propias.

En estos casos, el riesgo aumenta porque una misma plataforma concentra:

- emisión de tokens;
- validación de tokens;
- APIs administrativas;
- gestión de usuarios;
- gestión de clientes;
- gestión de claves;
- logs críticos de identidad.

La evaluación debe verificar que, aunque los roles convivan físicamente, estén separados lógicamente mediante controles de autorización, logging, segregación de funciones y mínimo privilegio.

---

### 2.6. Tokens en OAuth 2.0 y OIDC

Los tokens son artefactos de seguridad emitidos por un Authorization Server o proveedor de identidad. Representan información sobre autorización, autenticación, cliente, usuario, permisos o contexto.

Los tokens relevantes para la tesis son:

- `access_token`;
- `id_token`;
- `refresh_token`;
- código de autorización;
- tokens opacos;
- tokens JWT.

#### 2.6.1. Access token

El `access_token` es el token que el cliente presenta ante un Resource Server o API protegida para acceder a un recurso.

Aspectos que deben evaluarse:

- emisor;
- audiencia;
- expiración;
- scopes;
- permisos;
- sujeto o cliente representado;
- mecanismo de validación;
- protección en tránsito y almacenamiento;
- trazabilidad del uso.

Un `access_token` no debe tratarse como credencial de larga duración. Si se expone, puede permitir acceso indebido al recurso protegido, especialmente cuando se trata de tokens bearer.

#### 2.6.2. ID token

El `id_token` es propio de OpenID Connect. Representa información sobre la autenticación del usuario final.

Aspectos que deben evaluarse:

- firma;
- `issuer`;
- `audience`;
- expiración;
- `nonce`, cuando aplique;
- claims de autenticación;
- uso correcto por parte del cliente.

El `id_token` no debe usarse como token para invocar APIs de negocio. Su propósito principal es transmitir información de autenticación al cliente.

#### 2.6.3. Refresh token

El `refresh_token` permite obtener nuevos tokens de acceso sin repetir todo el flujo de autorización.

Es sensible porque suele tener mayor vida útil que el `access_token`.

Controles esperados:

- almacenamiento seguro;
- rotación;
- revocación;
- detección de reutilización;
- restricción por cliente;
- protección especial en clientes públicos.

#### 2.6.4. Código de autorización

El código de autorización es un artefacto temporal usado en Authorization Code Flow.

No es el token final. Es un código intermedio que el cliente cambia por tokens en el endpoint de token.

Riesgos asociados:

- interceptación del código;
- reutilización del código;
- redirect URI mal registrada;
- ausencia de PKCE;
- mezcla de códigos entre sesiones.

Controles esperados:

- PKCE;
- redirect URI exacta;
- expiración corta;
- un solo uso;
- validación de `state`;
- validación de cliente.

---

### 2.7. Token opaco y JWT embebido

OAuth 2.0 no obliga a que el `access_token` sea JWT. Un `access_token` puede ser opaco o auto-contenido.

#### 2.7.1. Token opaco

Un token opaco funciona como identificador de referencia.

Ejemplo conceptual:

~~~text
2YotnFZFEjr1zCsicMWpAA
~~~

El token no contiene información visible para el cliente ni para el Resource Server. Para saber si sigue activo y qué permisos representa, el Resource Server consulta al Authorization Server mediante introspección.

Flujo conceptual:

~~~text
Cliente → Resource Server: access_token opaco
Resource Server → Authorization Server: introspection
Authorization Server → Resource Server: active, scope, sub, client_id, exp
~~~

Ventajas:

- facilita revocación inmediata;
- evita exponer claims dentro del token;
- centraliza la verificación en el Authorization Server.

Costos:

- introduce una llamada adicional al Authorization Server;
- acopla al Resource Server con el Authorization Server en tiempo de ejecución;
- requiere caché o diseño de disponibilidad para evitar degradación.

#### 2.7.2. JWT embebido o self-contained

Un JWT auto-contenido lleva claims dentro del token.

Estructura conceptual:

~~~text
header.payload.signature
~~~

El payload puede contener claims como:

- `sub`;
- `iss`;
- `aud`;
- `exp`;
- `iat`;
- `scope`;
- `client_id`;
- roles o permisos, si aplica.

El Resource Server puede validar el token sin consultar al Authorization Server en cada request. Para esto usa la clave pública publicada por el Authorization Server, normalmente a través de JWKS.

Ventajas:

- permite validación local;
- escala bien en microservicios;
- reduce llamadas al Authorization Server.

Costos:

- revocar antes de `exp` es más complejo;
- si el token está firmado pero no cifrado, los claims pueden ser leídos por quien vea el token;
- exige buena gestión de claves y rotación de JWKS.

#### 2.7.3. Decisión arquitectónica

La elección entre token opaco y JWT embebido es una decisión de arquitectura.

Un token opaco favorece control centralizado y revocación. Un JWT auto-contenido favorece escalabilidad y validación distribuida.

La matriz debe evaluar si la decisión es coherente con:

- criticidad del recurso;
- necesidad de revocación;
- latencia aceptable;
- disponibilidad del Authorization Server;
- sensibilidad de los claims;
- capacidad de validar correctamente firma, `issuer`, `audience`, expiración y scopes.

---

### 2.8. JWT, JWS y JWE

JWT significa JSON Web Token. Es un formato compacto para representar claims entre dos partes.

Un JWT puede estar:

- firmado mediante JWS;
- cifrado mediante JWE;
- firmado y cifrado, según el diseño.

#### 2.8.1. JWS

JWS significa JSON Web Signature. Proporciona integridad y autenticidad.

En una arquitectura OAuth 2.0/OIDC, JWS permite verificar que:

- el contenido del token no fue alterado;
- el token fue emitido por una entidad confiable;
- la firma corresponde a una clave privada controlada por el emisor.

Riesgos típicos:

- aceptar tokens sin verificar firma;
- permitir algoritmos inseguros;
- no validar el algoritmo esperado;
- confiar en claims sin firma válida;
- no refrescar JWKS tras rotación de claves.

#### 2.8.2. JWE

JWE significa JSON Web Encryption. Proporciona confidencialidad sobre el contenido.

No debe confundirse con JWS:

- JWS protege integridad y autenticidad.
- JWE protege confidencialidad.

Muchos tokens en arquitecturas OAuth 2.0/OIDC están firmados, pero no cifrados. Por tanto, no se debe incluir información sensible innecesaria dentro de un JWT, incluso si está firmado.

#### 2.8.3. Cómo se firma y valida un JWT

De forma simplificada, el Authorization Server firma y el Resource Server verifica.

#### Authorization Server: emisión

1. Construye el header y el payload.
2. Codifica ambos en Base64URL.
3. Concatena `header.payload`.
4. Calcula una huella criptográfica sobre esa cadena.
5. Firma con su clave privada.
6. Entrega un token con forma `header.payload.signature`.

Ejemplo conceptual:

~~~text
base64url(header) + "." + base64url(payload) → datos firmados
SHA-256(datos firmados) → hash
firma(hash, clave_privada_AS) → signature
JWT final → header.payload.signature
~~~

#### Resource Server: validación

1. Recibe el JWT.
2. Descarga o consulta la clave pública del Authorization Server desde JWKS.
3. Recalcula la huella criptográfica sobre `header.payload`.
4. Verifica la firma con la clave pública.
5. Valida claims obligatorios como `iss`, `aud`, `exp` y scopes.
6. Aplica autorización de negocio.

La firma solo demuestra integridad y autenticidad del token. No reemplaza la autorización de negocio.

Riesgo conceptual importante:

> Un JWT con firma válida puede seguir siendo inválido para una API si la audiencia, expiración, emisor o scopes no corresponden.

---

### 2.9. Authorization Code Flow con PKCE

Authorization Code Flow es un flujo donde el cliente recibe un código de autorización y luego lo intercambia por tokens en el endpoint de token.

PKCE agrega una prueba criptográfica entre la solicitud inicial y el intercambio del código.

#### 2.9.1. Problema: robo del authorization code

Antes de PKCE, un atacante que interceptara el `authorization_code` podía intentar canjearlo por tokens.

Este riesgo es especialmente importante en clientes públicos, como aplicaciones móviles o SPAs, porque no pueden proteger un `client_secret` de forma confiable.

Ejemplo conceptual:

~~~text
1. App legítima inicia login.
2. Authorization Server devuelve authorization_code.
3. App maliciosa intercepta el callback.
4. App maliciosa canjea el code.
5. Authorization Server entrega tokens al atacante.
~~~

El Authorization Server no puede distinguir adecuadamente a las dos aplicaciones si ambas comparten elementos observables como `client_id` o esquemas de redirección inseguros.

#### 2.9.2. Solución: PKCE

PKCE introduce dos valores:

- `code_verifier`: secreto aleatorio generado por el cliente.
- `code_challenge`: derivado criptográfico del `code_verifier`.

Normalmente:

~~~text
code_challenge = BASE64URL(SHA-256(code_verifier))
~~~

Flujo conceptual:

~~~text
1. Cliente genera code_verifier.
2. Cliente calcula code_challenge.
3. Cliente inicia /authorize con code_challenge y code_challenge_method=S256.
4. Authorization Server guarda el challenge asociado al code.
5. Authorization Server devuelve authorization_code.
6. Cliente canjea code + code_verifier en /token.
7. Authorization Server verifica que SHA-256(code_verifier) coincida con el challenge guardado.
8. Si coincide, entrega tokens.
~~~

Metáfora útil:

> El `authorization_code` es el ticket. El `code_verifier` es el comprobante de retiro. Sin ambos, no se entrega el paquete.

#### 2.9.3. Qué mitiga PKCE

PKCE mitiga:

- interceptación del authorization code;
- inyección de código entre aplicaciones;
- canje indebido del código por un cliente que no conoce el `code_verifier`.

PKCE no hace que el navegador o el dispositivo sean seguros por sí solos. Solo protege el intercambio `authorization_code → tokens`.

#### 2.9.4. PKCE no es bala de plata

Aunque PKCE esté bien implementado, permanecen riesgos residuales:

#### Malware en el dispositivo

Si el atacante ejecuta código en el dispositivo, podría leer el `code_verifier` de memoria, logs o almacenamiento local.

Lectura de control:

> PKCE protege el flujo, no todo el cliente.

#### XSS en una SPA

Si un atacante inyecta JavaScript en una SPA, puede iniciar un flujo propio, manejar su propio `code_verifier` o robar tokens si la SPA los conserva.

Control complementario:

- patrón BFF;
- cookies `HttpOnly`;
- Content Security Policy;
- no almacenar tokens en `localStorage`.

#### Phishing del consentimiento

Si el usuario autoriza una aplicación maliciosa que se hace pasar por legítima, PKCE puede completar el flujo correctamente para la aplicación equivocada.

Control complementario:

- UX clara del Authorization Server;
- validación estricta del cliente;
- redirect URIs seguras;
- políticas de consentimiento.

#### Downgrade a `plain`

Si el Authorization Server acepta `code_challenge_method=plain`, el `code_challenge` puede equivaler al `code_verifier` en claro.

Control esperado:

- exigir `S256`;
- rechazar `plain` salvo justificación excepcional.

#### Verifier con baja entropía

Si el cliente genera el `code_verifier` con baja aleatoriedad, podría ser adivinado.

Control esperado:

- generador criptográfico seguro;
- suficiente entropía;
- no derivar el verifier de datos predecibles.

#### Después del token, PKCE termina

PKCE no protege el `access_token` ni el `refresh_token` después de emitidos.

Controles complementarios:

- expiración corta;
- rotación de refresh tokens;
- audience específica;
- scopes mínimos;
- almacenamiento seguro;
- monitoreo de uso anómalo.

#### Implicación para la matriz

No basta con preguntar:

> ¿Usan PKCE?

La matriz debe evaluar:

1. si se usa `S256`;
2. si el Authorization Server rechaza `plain`;
3. si el `code_verifier` tiene entropía suficiente;
4. si el `code_verifier` se almacena solo durante el flujo;
5. si existen controles complementarios contra XSS, malware y phishing;
6. si los tokens emitidos tienen controles propios después del canje.

---

### 2.10. SPA estática, BFF, cookies y tokens

En arquitecturas con SPA estática y Backend for Frontend, puede aparecer una confusión frecuente:

> ¿Es OAuth 2.0 con cookies?

La respuesta precisa es:

> No. OAuth 2.0/OIDC ocurre entre el BFF y el Authorization Server. La cookie ocurre entre el navegador y el BFF.

Son dos conversaciones separadas.

#### 2.10.1. Canal A: navegador hacia BFF

El navegador o SPA conserva una cookie de sesión emitida por el BFF.

Ejemplo conceptual:

~~~http
Cookie: SESSION_ID=abc123
~~~

La SPA no debería guardar:

- `access_token`;
- `refresh_token`;
- `client_secret`;
- tokens en `localStorage`;
- tokens en `sessionStorage`, salvo diseños justificados y controlados.

Controles esperados para la cookie:

- `HttpOnly`;
- `Secure`;
- `SameSite`;
- expiración adecuada;
- protección contra CSRF;
- rotación o renovación controlada de sesión.

#### 2.10.2. Canal B: BFF hacia Authorization Server y APIs

El BFF actúa como cliente OAuth 2.0/OIDC.

Responsabilidades del BFF:

- iniciar el flujo Authorization Code + PKCE;
- recibir el `authorization_code`;
- canjear el código por tokens;
- custodiar tokens server-side;
- mapear `SESSION_ID` a contexto de usuario y tokens;
- refrescar tokens cuando corresponda;
- llamar APIs protegidas con `Authorization: Bearer`.

Ejemplo conceptual:

~~~http
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
~~~

#### 2.10.3. Regla mental

~~~text
Frontend = cookie
BFF = custodia tokens
Authorization Server / IdP = emite tokens
API / Resource Server = valida tokens
~~~

#### 2.10.4. Implicación arquitectónica

Si la SPA solo consume al BFF con cookie, la SPA no ejecuta OAuth 2.0 directamente.

Pero el sistema completo sí usa OAuth 2.0/OIDC cuando el BFF delega identidad en un Authorization Server o consume APIs protegidas mediante tokens.

Si el BFF tiene gestión propia de usuarios y no consume APIs protegidas por un Authorization Server externo, entonces ese flujo de login puede operar como autenticación web tradicional basada en sesión, sin OAuth 2.0/OIDC.

Esta distinción justifica los dos casos base de la tesis:

- monolito con sesión local;
- SPA estática + BFF con gestión propia de usuarios.

Ambos sirven como línea base para comparar qué cambia cuando se introduce identidad federada, Authorization Server, tokens, scopes y controles OAuth 2.0/OIDC.

---

### 2.11. Single Sign-On

Single Sign-On es un patrón en el cual un usuario se autentica una vez ante un Identity Provider y varias aplicaciones aceptan esa identidad sin volver a pedir contraseña.

En el contexto de OIDC, el IdP autentica al usuario y emite tokens o claims que las aplicaciones pueden validar.

#### 2.11.1. SSO personal

Ejemplo:

> Iniciar sesión con Google.

Flujo conceptual:

1. Una aplicación como Notion, Spotify o Figma ofrece iniciar sesión con Google.
2. El usuario es redirigido a `accounts.google.com`.
3. Google autentica al usuario o reutiliza una sesión ya activa.
4. Google devuelve al cliente información de identidad mediante OIDC.
5. La aplicación crea su propia sesión y administra sus propios permisos.

Lectura de riesgo:

- el IdP es Google;
- el usuario controla parte del consentimiento;
- cada aplicación sigue siendo responsable de su autorización interna.

#### 2.11.2. SSO corporativo

Ejemplo:

> Iniciar sesión con Microsoft Entra ID.

Flujo conceptual:

1. El usuario abre Teams, Outlook, Power BI o una aplicación interna.
2. La aplicación redirige al tenant corporativo.
3. Entra ID aplica políticas como MFA, dispositivo gestionado, grupos o ubicación.
4. El IdP devuelve tokens y claims a la aplicación.
5. La aplicación crea su sesión y aplica autorización propia.

Lectura de riesgo:

- el IdP es la organización;
- TI gobierna usuarios, MFA, ciclo de vida y revocación;
- las aplicaciones deben validar tokens y claims;
- el login corporativo no reemplaza la autorización de negocio.

#### 2.11.3. Regla conceptual

La mecánica OIDC puede ser similar en SSO personal y corporativo. Lo que cambia es:

- quién opera el IdP;
- qué políticas aplica;
- qué claims emite;
- qué confianza deposita la aplicación en esos claims;
- qué evidencia queda disponible para auditoría.

---

### 2.12. Flujos relevantes para la tesis

La tesis no cubre todos los flujos de OAuth 2.0. Se concentra en los que son necesarios para los escenarios seleccionados.

#### 2.12.1. Authorization Code + PKCE

Aplica al escenario de usuario final con SPA estática + BFF + Authorization Server.

Aspectos evaluables:

- redirect URI exacta;
- `state`;
- `nonce` en OIDC;
- PKCE con `S256`;
- custodia server-side de tokens;
- cookie segura entre navegador y BFF;
- ausencia de tokens en el frontend;
- protección contra XSS y CSRF.

#### 2.12.2. Client Credentials

Aplica al escenario M2M.

Aspectos evaluables:

- registro de cliente técnico;
- `client_id`;
- `client_secret`, certificado o `private_key_jwt`;
- scopes mínimos;
- separación por ambiente;
- separación por propósito;
- vault;
- rotación;
- monitoreo del `client_id`.

#### 2.12.3. Token Introspection

Aplica cuando se usan tokens opacos o cuando un Resource Server necesita consultar estado activo y metadatos del token.

Aspectos evaluables:

- autenticación del Resource Server ante el endpoint de introspección;
- canal seguro;
- validación del campo `active`;
- validación de scopes, cliente, sujeto y expiración;
- cache controlado;
- disponibilidad del Authorization Server.

#### 2.12.4. Token Exchange

Aplica cuando un componente, por ejemplo un API Gateway, recibe un token y necesita obtener otro token para un Resource Server o dominio diferente.

Aspectos evaluables:

- audiencia específica por dominio;
- reducción o transformación de scopes;
- trazabilidad de delegación;
- separación entre token entrante y token saliente;
- evidencia de intercambio;
- logs correlacionados entre gateway, Authorization Server y Resource Server.

---

### 2.13. Relación del marco conceptual con los casos de evaluación

La tesis usa dos casos base y tres escenarios OAuth 2.0/OIDC.

#### Caso base 0A: monolito con sesión local

No usa OAuth 2.0/OIDC como mecanismo principal.

Sirve para observar una arquitectura donde:

- la aplicación autentica localmente;
- la sesión vive en el propio monolito;
- la autorización suele estar embebida en la lógica del sistema;
- la evidencia se concentra en logs, base de datos, configuración y código del monolito.

Riesgos dominantes:

- robo de sesión;
- contraseñas mal protegidas;
- autorización mezclada con lógica de negocio;
- baja separación de responsabilidades;
- auditoría limitada.

#### Caso base 0B: SPA estática + BFF con usuarios propios

No usa OAuth 2.0/OIDC para el login si el BFF gestiona sus propios usuarios.

Sirve para observar una arquitectura de tres capas donde:

- el frontend no autentica directamente;
- el BFF administra sesión con cookie;
- la identidad sigue siendo local al sistema;
- no existen tokens OAuth 2.0/OIDC en el flujo de login.

Riesgos dominantes:

- cookie mal configurada;
- CSRF contra el BFF;
- XSS en la SPA;
- mala gestión local de usuarios;
- autorización interna poco trazable.

#### Escenario 1: SPA estática + BFF + Authorization Server

Usa OAuth 2.0/OIDC.

El BFF actúa como cliente OAuth 2.0/OIDC. La SPA conserva cookie. El BFF custodia tokens. El Authorization Server emite tokens. Las APIs validan tokens.

Riesgo dominante:

- exposición de tokens si la SPA los maneja;
- robo de sesión del BFF;
- errores de PKCE, `state`, `nonce` o redirect URI;
- scopes excesivos.

Control crítico:

- Authorization Code + PKCE;
- tokens server-side;
- cookie `HttpOnly`, `Secure`, `SameSite`;
- validación de `state` y `nonce`;
- CSP contra XSS.

#### Escenario 2: M2M contra recursos protegidos del propio Authorization Server

Usa OAuth 2.0 mediante `client_credentials`.

El cliente técnico obtiene un `access_token` para consumir APIs protegidas que expone el propio Authorization Server, por ejemplo APIs administrativas de usuarios, clientes, scopes o claves.

Riesgo dominante:

- abuso de credenciales técnicas;
- privilegios administrativos excesivos;
- secretos hardcodeados;
- clientes huérfanos;
- movimiento lateral dentro de la plataforma de identidad.

Control crítico:

- scopes mínimos;
- inventario de clientes técnicos;
- vault;
- rotación;
- mTLS o `private_key_jwt`, si aplica;
- monitoreo por `client_id`.

#### Escenario 3: API Gateway federado + Authorization Server corporativo

Usa OAuth 2.0/OIDC en una arquitectura con múltiples dominios de recursos.

El API Gateway valida tokens frente a un Authorization Server corporativo y enruta hacia APIs de dominio. Según el diseño, puede propagar el token original o intercambiarlo por otro token con audiencia específica.

Riesgo dominante:

- confusión de audiencia;
- backend que confía ciegamente en el gateway;
- criterios de validación inconsistentes;
- propagación de tokens sin reducción de scopes;
- JWKS desactualizado;
- baja trazabilidad extremo a extremo.

Control crítico:

- validación de `audience` por dominio;
- revalidación en cada Resource Server;
- política única de firma, `issuer`, `exp` y scopes;
- token exchange con reducción de privilegios;
- logs correlacionados gateway-backend.

---

### 2.14. Riesgos comunes en arquitecturas OAuth 2.0/OIDC

Los riesgos en arquitecturas OAuth 2.0/OIDC no provienen únicamente del protocolo. Surgen de la interacción entre protocolo, configuración, arquitectura, implementación y operación.

#### 2.14.1. Riesgos transversales

Ejemplos:

- gestión deficiente de clientes OAuth;
- scopes excesivos;
- tokens con vigencia inadecuada;
- falta de rotación de secretos;
- ausencia de trazabilidad;
- configuración inconsistente entre ambientes;
- falta de revisión periódica de clientes y permisos;
- aceptación de algoritmos inseguros;
- ausencia de monitoreo sobre eventos de autenticación y autorización;
- falta de gobierno sobre cambios en el Authorization Server.

#### 2.14.2. Riesgos de usuario final

Ejemplos:

- exposición de tokens en navegador;
- almacenamiento inseguro en `localStorage` o logs;
- robo de sesión;
- redirect URIs débiles;
- ausencia o mala validación de `state`;
- ausencia o mala validación de `nonce`;
- uso de flujos no recomendados para clientes públicos;
- exceso de permisos solicitados al usuario.

#### 2.14.3. Riesgos de API protegida o Resource Server

Ejemplos:

- aceptar tokens sin validar firma;
- aceptar tokens emitidos por un `issuer` no confiable;
- no validar `audience`;
- aceptar tokens expirados;
- validar autenticación pero no autorización;
- confiar completamente en el API Gateway sin controles en backend;
- no registrar decisiones de acceso;
- tratar tokens opacos como si fueran JWT;
- usar claims no confiables para decisiones de negocio.

#### 2.14.4. Riesgos de M2M

Ejemplos:

- secretos hardcodeados;
- secretos almacenados en repositorios o pipelines sin protección;
- ausencia de rotación;
- clientes técnicos compartidos por varios servicios;
- scopes demasiado amplios;
- clientes técnicos sin responsable;
- uso cruzado de credenciales entre ambientes;
- dificultad para atribuir operaciones a un sistema específico;
- uso de M2M para operaciones que deberían conservar contexto de usuario.

---

### 2.15. Fuentes técnicas base del marco conceptual

Este marco conceptual se apoya principalmente en las siguientes fuentes técnicas:

- RFC 6749: OAuth 2.0 Authorization Framework.
- RFC 6750: OAuth 2.0 Bearer Token Usage.
- RFC 7515: JSON Web Signature.
- RFC 7516: JSON Web Encryption.
- RFC 7517: JSON Web Key.
- RFC 7519: JSON Web Token.
- RFC 7636: Proof Key for Code Exchange.
- RFC 7662: OAuth 2.0 Token Introspection.
- RFC 8693: OAuth 2.0 Token Exchange.
- RFC 8705: OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens.
- RFC 9068: JWT Profile for OAuth 2.0 Access Tokens.
- RFC 9449: OAuth 2.0 Demonstrating Proof of Possession.
- RFC 9700: Best Current Practice for OAuth 2.0 Security.
- OpenID Connect Core 1.0.
- OWASP OAuth 2.0 Cheat Sheet.
- OWASP Session Management Cheat Sheet.
- OWASP Cross-Site Request Forgery Prevention Cheat Sheet.

## 3. Marco de aseguramiento, riesgo, control y auditoría

3.1. Aseguramiento de tecnologías de información  
3.2. Riesgos de tecnologías de información  
3.3. Controles de tecnologías de información  
3.4. Auditoría de tecnologías de información basada en riesgos  
3.5. Relación riesgo–control–auditoría  
3.6. Uso del enfoque de Valencia Duque en esta tesis  
3.7. Complemento con estándares internacionales  
    3.7.1. ISO/IEC 27001 / 27002  
    3.7.2. NIST  
    3.7.3. OWASP  
    3.7.4. RFCs de OAuth 2.0/OIDC

---

## 4. Casos arquitectónicos de contraste y escenarios de evaluación

### 4.1. Criterios para seleccionar los casos

La tesis no parte directamente de OAuth 2.0/OIDC. Primero introduce dos casos base sin identidad federada para contrastar qué responsabilidades de seguridad existen antes de incorporar Authorization Server, tokens, scopes, clientes OAuth y federación de identidad.

Los casos se seleccionan con base en estos criterios:

1. **Contraste arquitectónico:** incluir arquitecturas sin OAuth 2.0/OIDC y arquitecturas donde OAuth 2.0/OIDC sí cambia la distribución de responsabilidades.
2. **Diferencia de superficie de riesgo:** cada caso debe exponer riesgos distintos: sesión local, BFF, tokens, clientes técnicos, API Gateway, propagación de identidad o token exchange.
3. **Aplicabilidad de la tríada riesgo-control-auditoría:** cada caso debe permitir relacionar riesgos aplicables, controles esperados y evidencias verificables.
4. **Pertinencia para sistemas reales:** los casos se expresan con ejemplos cercanos a sistemas bancarios, comercio electrónico, portales corporativos, APIs internas y plataformas IAM.
5. **Delimitación razonable:** la tesis no pretende cubrir todos los flujos OAuth 2.0/OIDC, sino escenarios suficientemente representativos para construir una matriz evaluable.

Con estos criterios se delimitan cinco casos de análisis: dos casos base de contraste conceptual y tres escenarios OAuth 2.0/OIDC que sí serán evaluados por la matriz.

1. **Caso base 0A:** monolito con autenticación y sesión local.
2. **Caso base 0B:** tres capas con SPA estática, BFF y gestión propia de usuarios.
3. **Escenario 1:** SPA estática + BFF + IdP corporativo usando OAuth 2.0/OIDC.
4. **Escenario 2:** M2M donde el Authorization Server actúa también como Resource Server.
5. **Escenario 3:** API Gateway federado con Authorization Server corporativo, propagación o intercambio de tokens.

Los dos primeros casos no son escenarios OAuth 2.0/OIDC. Son líneas base para explicar qué se pierde, qué se gana y qué riesgos nuevos aparecen cuando se introduce identidad federada.

#### Tipo de flujo de autenticación o autorización por caso

Esta clasificación evita una confusión conceptual: no todos los casos usan OAuth 2.0/OIDC. Los casos base usan autenticación local y sesión web; los escenarios OAuth 2.0/OIDC introducen Authorization Server, tokens, clientes OAuth, scopes, audiencia y validación de tokens.

##### Caso base 0A: monolito con autenticación local

- **Tipo de flujo:** autenticación web tradicional con sesión local.
- **Protocolo principal:** HTTP + cookie de sesión.
- **No usa:** OAuth 2.0, OIDC, Authorization Server externo, `access_token`, `id_token` ni PKCE.
- **Autenticación:** el monolito valida usuario y contraseña contra su propia base de usuarios o directorio interno.
- **Sesión:** el monolito crea una sesión server-side y entrega una cookie `SESSION_ID` al navegador.
- **Autorización:** el propio monolito aplica roles, permisos, perfiles o reglas internas de negocio.
- **Ejemplo:** portal bancario tradicional donde la misma aplicación maneja login, consultas, pagos y autorización funcional.

Lectura conceptual para el contraste: el riesgo principal no es la validación de tokens, sino la seguridad de sesión, credenciales locales, control de acceso interno, expiración de sesión, trazabilidad y protección contra CSRF/XSS.

##### Caso base 0B: tres capas con SPA estática, BFF y usuarios propios

- **Tipo de flujo:** autenticación local en el BFF con sesión web por cookie.
- **Protocolo principal:** SPA ↔ BFF mediante HTTPS + cookie de sesión.
- **No usa:** OAuth 2.0/OIDC para el login del usuario.
- **Autenticación:** el BFF valida correo/usuario y contraseña contra su propia base de usuarios.
- **Sesión:** el BFF crea una sesión server-side y entrega una cookie segura a la SPA.
- **Autorización:** el BFF aplica permisos propios y decide qué operaciones expone al frontend.
- **Ejemplo:** tienda virtual regional con frontend Angular/React en CDN y BFF propio para login, pedidos, pagos e inventario.

Lectura conceptual para el contraste: aparece separación de capas, pero no identidad federada. La SPA no maneja tokens OAuth; solo conserva cookie. El foco está en cookies seguras, CSRF, CORS, CSP, control de sesión y autorización interna del BFF.

##### Escenario 1: SPA estática + BFF + IdP corporativo

- **Tipo de flujo:** OpenID Connect Authorization Code Flow con PKCE.
- **Protocolo principal:** OIDC/OAuth 2.0 entre BFF y Authorization Server; cookie entre navegador y BFF.
- **Autenticación:** el usuario se autentica en el IdP corporativo.
- **Autorización:** el BFF recibe `access_token` para consumir APIs protegidas.
- **Tokens esperados:** `id_token`, `access_token` y eventualmente `refresh_token`.
- **PKCE:** protege el intercambio `authorization_code` → tokens mediante `code_verifier` y `code_challenge`.
- **Sesión frontend:** la SPA no guarda tokens; usa cookie de sesión del BFF.
- **Ejemplo:** portal de pagos donde usuarios internos o clientes entran con Keycloak, Entra ID, Okta o Auth0, mientras el BFF custodia tokens server-side.

Lectura para la matriz: el riesgo se desplaza desde “contraseña local” hacia configuración OIDC, redirect URI, `state`, `nonce`, PKCE, custodia server-side de tokens, cookies seguras y control de scopes.

##### Escenario 2: M2M con Authorization Server como Resource Server

- **Tipo de flujo:** OAuth 2.0 Client Credentials Grant.
- **Protocolo principal:** cliente técnico ↔ Authorization Server mediante token endpoint; cliente técnico ↔ API protegida mediante Bearer token.
- **Autenticación:** se autentica el cliente técnico, no un usuario humano.
- **Autorización:** el Authorization Server emite un `access_token` con scopes técnicos.
- **Tokens esperados:** `access_token` M2M.
- **Particularidad:** la misma plataforma puede cumplir dos roles lógicos: Authorization Server y Resource Server.
- **Ejemplo:** proceso batch de gobierno IAM que usa `client_id` + secreto/certificado para consumir una API administrativa del propio Keycloak/Auth Server.

Lectura para la matriz: el riesgo dominante es abuso de identidad técnica: secretos hardcodeados, cliente con permisos administrativos excesivos, falta de rotación, scopes amplios, clientes huérfanos y baja trazabilidad por `client_id`.

##### Escenario 3: API Gateway federado + Authorization Server corporativo

- **Tipo de flujo:** combinación de validación Bearer, propagación de token y/o OAuth 2.0 Token Exchange.
- **Flujo de entrada:** depende del cliente:
  - usuario final: OIDC Authorization Code + PKCE;
  - sistema o partner: OAuth 2.0 Client Credentials;
  - aplicación ya autenticada: presenta un Bearer token vigente.
- **En el Gateway:** se valida el token recibido: firma o introspección, `issuer`, `audience`, expiración y scopes.
- **Hacia APIs internas:** existen dos variantes:
  - **propagación:** el Gateway reenvía el token original hacia el backend;
  - **intercambio:** el Gateway solicita al Authorization Server un nuevo token con audiencia y scopes específicos para el dominio destino.
- **Tokens esperados:** `access_token` de entrada y, si aplica, `access_token` intercambiado por dominio.
- **Ejemplo:** aplicación de originación de crédito que entra por API Gateway y consume servicios internos de clientes, cupos, cartera, listas restrictivas y facturación.

Lectura para la matriz: el riesgo dominante es confusión de audiencia y exceso de confianza en el Gateway. El control crítico es que cada Resource Server valide su propia audiencia y que el intercambio de tokens reduzca scopes al cruzar dominios.


---

### 4.2. Vista general de los casos

#### Caso base 0A: monolito con autenticación local

Ejemplo de vida real: un **portal bancario tradicional** donde la misma aplicación maneja login, sesión, reglas de autorización, consultas de saldo y pagos de tarjeta. El usuario entra al portal, el monolito valida usuario y contraseña contra su propia base o directorio interno, crea una sesión HTTP y ejecuta las operaciones dentro del mismo despliegue.

Este caso no usa OAuth 2.0/OIDC. La seguridad se concentra en el monolito.

#### Caso base 0B: SPA estática + BFF con usuarios propios

Ejemplo de vida real: una **tienda virtual regional** donde el frontend React/Angular se publica como archivos estáticos en un CDN, pero todas las llamadas de negocio pasan por un BFF. El BFF valida correo/contraseña contra su propia base de usuarios, crea una cookie de sesión y luego consulta la base de pedidos, pagos o inventario.

Este caso tampoco usa OAuth 2.0/OIDC. Se diferencia del monolito porque separa frontend, BFF y backend/datos.

#### Escenario 1: SPA estática + BFF + IdP corporativo

Ejemplo de vida real: un **portal de pagos o portal de clientes** que no quiere administrar contraseñas localmente. La SPA consume un BFF mediante cookie, pero el BFF delega la autenticación en un IdP corporativo como Keycloak, Microsoft Entra ID, Okta o Auth0. El BFF actúa como cliente OAuth 2.0/OIDC.

En este escenario la SPA no maneja tokens OAuth. La SPA mantiene una cookie de sesión frente al BFF; el BFF obtiene y custodia tokens del lado servidor.

#### Escenario 2: M2M con Authorization Server como Resource Server

Ejemplo de vida real: un **servicio de automatización IAM** que debe consultar o administrar información en la misma plataforma de identidad. Por ejemplo, un proceso de gobierno de identidades que consume una API administrativa del Authorization Server para listar clientes, consultar configuración o ejecutar tareas controladas. En productos como Keycloak, la plataforma de identidad expone una Admin REST API protegida, lo cual ilustra que el componente que emite tokens también puede exponer recursos protegidos.

Este escenario usa OAuth 2.0 `client_credentials`. El cliente técnico obtiene un `access_token` y lo usa contra un recurso expuesto por la misma plataforma que emitió el token.

#### Escenario 3: API Gateway federado + Authorization Server corporativo

Ejemplo de vida real: una **aplicación de originación de crédito** o un **portal de clientes** consume APIs internas mediante un API Gateway. El Gateway valida tokens emitidos por un Authorization Server corporativo y enruta hacia servicios internos como cupos, cartera, listas restrictivas, productos, clientes o facturación.

En este escenario puede existir propagación del token original hacia APIs internas o intercambio de token para emitir un token nuevo con audiencia específica para el backend.

---

### 4.3. Caso base 0A: monolito con autenticación y sesión local

#### 4.3.1. Descripción técnica

En el monolito, la aplicación concentra interfaz web, lógica de negocio, autenticación, autorización y acceso a datos. El usuario se autentica directamente contra el monolito. Si las credenciales son válidas, el monolito crea una sesión HTTP y envía una cookie al navegador.

No hay Authorization Server externo, no hay `access_token`, no hay `id_token`, no hay scopes OAuth y no hay federación de identidad. La autorización se aplica internamente con roles, permisos o reglas propias de la aplicación.

Este caso permite mostrar el punto de partida: antes de OAuth 2.0/OIDC, la confianza se concentra en una aplicación central. Su función es servir como línea base conceptual para contrastar riesgos de sesión, contraseñas, controles de acceso internos y trazabilidad local frente a los escenarios federados.

#### 4.3.2. Ejemplo de vida real

Un portal bancario monolítico permite al cliente:

1. iniciar sesión con usuario y contraseña;
2. consultar saldos;
3. pagar tarjeta de crédito;
4. descargar certificados;
5. cerrar sesión.

Todo ocurre dentro de la misma aplicación. El navegador solo conserva una cookie de sesión. El monolito decide si el usuario puede ejecutar cada operación.

#### 4.3.3. Diagrama de despliegue

~~~plantuml
@startuml
title Caso base 0A - Monolito con sesión local

node "Navegador del cliente" as Browser {
  artifact "HTML/CSS/JS renderizado" as UI
  artifact "Cookie SESSION_ID" as Cookie
}

node "Servidor de aplicación" as AppServer {
  component "Monolito web" as Monolith
  component "Módulo de login" as Login
  component "Módulo de autorización local" as Authz
  component "Módulos de negocio\n(saldos, pagos, certificados)" as Business
}

database "Base de datos transaccional" as DB {
  artifact "Usuarios" as Users
  artifact "Sesiones" as Sessions
  artifact "Cuentas / pagos" as Accounts
}

Browser --> Monolith : HTTPS + Cookie
Monolith --> Login
Monolith --> Authz
Monolith --> Business
Login --> DB : valida usuario/hash
Authz --> DB : roles/permisos
Business --> DB : operaciones de negocio
@enduml
~~~

#### 4.3.4. Diagrama de secuencia

~~~plantuml
@startuml
title Caso base 0A - Login local y operación en monolito

actor Usuario
participant "Navegador" as Browser
participant "Monolito" as App
database "BD usuarios/sesiones" as DB

Usuario -> Browser : Ingresa usuario/contraseña
Browser -> App : POST /login
App -> DB : Consultar usuario y hash
DB --> App : Usuario válido
App -> DB : Crear sesión
DB --> App : session_id
App --> Browser : Set-Cookie: SESSION_ID; HttpOnly; Secure; SameSite

Usuario -> Browser : Consulta saldo
Browser -> App : GET /saldos + Cookie
App -> DB : Validar sesión
DB --> App : Sesión válida
App -> DB : Consultar cuentas
DB --> App : Saldos
App --> Browser : Respuesta HTML/JSON
@enduml
~~~

#### 4.3.5. Activos y controles relevantes

Activos:

- credenciales locales del usuario;
- hash de contraseña;
- cookie de sesión;
- identificador de sesión;
- roles y permisos locales;
- logs de autenticación y operación;
- datos transaccionales.

Controles esperados:

- almacenamiento seguro de contraseñas con hash robusto y salt;
- cookie `HttpOnly`, `Secure` y `SameSite`;
- expiración e invalidación de sesión;
- protección contra fijación de sesión;
- autorización por operación;
- bloqueo o control de fuerza bruta;
- trazabilidad de login, logout y operaciones sensibles;
- protección CSRF en operaciones que cambian estado.

#### 4.3.6. Superficie de riesgo

Riesgos principales:

- robo de cookie de sesión;
- fijación de sesión;
- credenciales débiles o reutilizadas;
- autorización interna incompleta;
- escalamiento de privilegios dentro del monolito;
- ausencia de trazabilidad suficiente;
- concentración de responsabilidades en una sola aplicación.

---

### 4.4. Caso base 0B: SPA estática + BFF con gestión propia de usuarios

#### 4.4.1. Descripción técnica

En este caso, el frontend está desacoplado del backend. La SPA se publica como contenido estático y consume un BFF. El BFF autentica usuarios contra su propia base, crea una sesión y entrega una cookie al navegador.

Tampoco hay OAuth 2.0/OIDC. La diferencia frente al monolito es arquitectónica: la interfaz está separada, el BFF concentra sesión y APIs de experiencia, y los servicios o bases de datos quedan detrás del BFF.

El patrón reduce exposición directa de APIs internas frente al navegador, pero introduce riesgos propios: CSRF contra el BFF, CORS mal configurado, sesión distribuida, autorización en endpoints REST y separación correcta entre frontend estático y backend sensible.

#### 4.4.2. Ejemplo de vida real

Una tienda virtual regional publica su frontend Angular en un CDN. El usuario inicia sesión con correo y contraseña. La SPA llama al BFF para consultar pedidos, actualizar dirección o iniciar un pago. El BFF valida la cookie y ejecuta operaciones contra servicios internos de pedidos, inventario y facturación.

#### 4.4.3. Diagrama de despliegue

~~~plantuml
@startuml
title Caso base 0B - SPA estática + BFF con usuarios propios

node "Navegador" as Browser {
  artifact "SPA estática" as SPA
  artifact "Cookie SESSION_ID" as Cookie
}

cloud "CDN / hosting estático" as CDN {
  artifact "index.html / JS / CSS" as StaticFiles
}

node "Zona backend" as Backend {
  component "BFF" as BFF
  component "Servicio pedidos" as Orders
  component "Servicio pagos" as Payments
}

database "BD identidad local" as IdentityDB {
  artifact "Usuarios / hashes" as Users
  artifact "Sesiones" as Sessions
}

database "BD negocio" as BusinessDB

Browser --> CDN : GET SPA
Browser --> BFF : HTTPS + Cookie
BFF --> IdentityDB : autentica / valida sesión
BFF --> Orders : llamada interna
BFF --> Payments : llamada interna
Orders --> BusinessDB
Payments --> BusinessDB
@enduml
~~~

#### 4.4.4. Diagrama de secuencia

~~~plantuml
@startuml
title Caso base 0B - SPA + BFF con login propio

actor Usuario
participant "SPA" as SPA
participant "BFF" as BFF
database "BD identidad local" as IDDB
participant "Servicio pedidos" as Orders

Usuario -> SPA : Ingresa correo/contraseña
SPA -> BFF : POST /login
BFF -> IDDB : Validar credenciales
IDDB --> BFF : Usuario válido
BFF -> IDDB : Crear sesión
BFF --> SPA : Set-Cookie: SESSION_ID; HttpOnly; Secure; SameSite

Usuario -> SPA : Consulta pedidos
SPA -> BFF : GET /me/orders + Cookie
BFF -> IDDB : Validar sesión
IDDB --> BFF : Sesión válida + usuario
BFF -> Orders : GET /orders?userId=...
Orders --> BFF : Pedidos
BFF --> SPA : JSON pedidos
@enduml
~~~

#### 4.4.5. Activos y controles relevantes

Activos:

- SPA estática;
- cookie de sesión;
- sesión server-side;
- base local de usuarios;
- endpoints del BFF;
- APIs internas;
- logs de acceso.

Controles esperados:

- cookies `HttpOnly`, `Secure`, `SameSite`;
- protección CSRF en endpoints del BFF;
- CORS restrictivo;
- validación server-side de sesión en cada operación;
- autorización por endpoint y recurso;
- no exponer APIs internas directamente a la SPA;
- expiración, renovación e invalidación de sesión;
- logs correlacionables entre SPA, BFF y servicios internos.

#### 4.4.6. Superficie de riesgo

Riesgos principales:

- CSRF contra el BFF;
- XSS en la SPA que abuse la sesión activa;
- CORS permisivo;
- endpoints del BFF sin autorización fina;
- fuga de información por respuestas del BFF;
- acoplamiento excesivo entre BFF y servicios internos;
- controles de sesión débiles.

---

### 4.5. Escenario 1: SPA estática + BFF + IdP corporativo usando OAuth 2.0/OIDC

#### 4.5.1. Descripción técnica

Este escenario conserva la separación SPA + BFF, pero elimina la gestión local de contraseñas en el BFF. La autenticación del usuario se delega en un IdP corporativo. El BFF actúa como cliente confidencial OAuth 2.0/OIDC.

La SPA no ejecuta OAuth 2.0 directamente. La SPA consume el BFF con cookie de sesión. El BFF inicia el flujo Authorization Code con PKCE, recibe el `authorization_code`, lo canjea por tokens y conserva los tokens del lado servidor. La cookie representa la sesión entre navegador y BFF; los tokens representan la relación entre BFF, Authorization Server y APIs protegidas.

OAuth 2.0 define el Authorization Code Grant como un flujo en el que el cliente obtiene un código de autorización y luego lo intercambia por un token. OIDC agrega el `id_token`, que contiene claims sobre la autenticación del usuario. PKCE agrega `code_verifier` y `code_challenge` para mitigar interceptación del código.

#### 4.5.2. Ejemplo de vida real

Un portal de pagos de una entidad financiera publica una SPA estática para que el cliente consulte obligaciones y pague productos. El banco no quiere que el portal administre contraseñas. El BFF redirige al usuario al IdP corporativo. Tras autenticarse, el BFF crea una sesión local y llama APIs internas usando `access_token`.

#### 4.5.3. Diagrama de despliegue

~~~plantuml
@startuml
title Escenario 1 - SPA + BFF + IdP corporativo

node "Navegador" as Browser {
  artifact "SPA estática" as SPA
  artifact "Cookie SESSION_ID" as Cookie
}

cloud "CDN / hosting estático" as CDN {
  artifact "Archivos SPA" as StaticFiles
}

node "Zona aplicación" as AppZone {
  component "BFF\nCliente OAuth 2.0/OIDC" as BFF
  database "Store de sesión / tokens" as SessionStore
}

node "Plataforma IAM corporativa" as IAM {
  component "Authorization Server / IdP" as AS
  database "Directorio corporativo" as Directory
  artifact "JWKS" as JWKS
}

node "Zona APIs" as APIZone {
  component "API protegida" as API
}

Browser --> CDN : GET SPA
Browser --> BFF : HTTPS + Cookie
BFF --> AS : Authorization Code + PKCE
AS --> Directory : autentica usuario
BFF --> SessionStore : guarda sesión/tokens
BFF --> API : Bearer access_token
API --> JWKS : valida firma, si aplica
@enduml
~~~

#### 4.5.4. Diagrama de secuencia

~~~plantuml
@startuml
title Escenario 1 - Authorization Code + PKCE en BFF

actor Usuario
participant "SPA" as SPA
participant "BFF" as BFF
participant "Authorization Server / IdP" as AS
participant "API protegida" as API

Usuario -> SPA : Abre portal
SPA -> BFF : GET /session
BFF --> SPA : 401 / requiere login
SPA -> BFF : GET /login
BFF -> BFF : Genera state, nonce, code_verifier, code_challenge
BFF --> SPA : 302 redirect al IdP
SPA -> AS : Authorization request + code_challenge + state + nonce
AS -> Usuario : Autenticación / MFA
Usuario --> AS : Credenciales / factor
AS --> SPA : 302 callback con authorization_code + state
SPA -> BFF : GET /callback?code=...&state=...
BFF -> BFF : Valida state
BFF -> AS : Token request + authorization_code + code_verifier
AS --> BFF : access_token + id_token + refresh_token, si aplica
BFF -> BFF : Valida id_token, nonce, issuer, audience, exp
BFF --> SPA : Set-Cookie: SESSION_ID; HttpOnly; Secure; SameSite
SPA -> BFF : GET /api/saldos + Cookie
BFF -> API : GET /saldos + Bearer access_token
API --> BFF : Respuesta
BFF --> SPA : JSON filtrado para UI
@enduml
~~~

#### 4.5.5. Activos y controles relevantes

Activos:

- `authorization_code`;
- `code_verifier` y `code_challenge`;
- `state`;
- `nonce`;
- `id_token`;
- `access_token`;
- `refresh_token`, si aplica;
- cookie de sesión;
- configuración del cliente OIDC;
- redirect URI;
- JWKS;
- logs de autenticación.

Controles esperados:

- Authorization Code Flow con PKCE;
- validación de `state`;
- validación de `nonce` en OIDC;
- redirect URI exacta;
- tokens almacenados server-side;
- cookie `HttpOnly`, `Secure`, `SameSite`;
- validación de `issuer`, `audience`, expiración y firma del `id_token`;
- no exposición de tokens en la SPA;
- rotación y protección de secretos del cliente, si aplica;
- trazabilidad de login, emisión de sesión y consumo de APIs.

#### 4.5.6. Superficie de riesgo

Riesgos principales:

- interceptación del `authorization_code`;
- CSRF en el callback OAuth 2.0/OIDC;
- sustitución o repetición de `id_token`;
- redirect URI insegura;
- exposición de tokens en navegador por diseño incorrecto;
- robo de cookie de sesión;
- BFF con permisos excesivos hacia APIs;
- falta de correlación entre usuario, sesión, token y operación.

---

### 4.6. Escenario 2: M2M con Authorization Server actuando también como Resource Server

#### 4.6.1. Descripción técnica

Este escenario representa una comunicación servicio-a-servicio donde no hay usuario humano. Un cliente técnico se autentica ante el Authorization Server usando `client_credentials` y obtiene un `access_token`. Ese token se usa para consumir un recurso protegido que está expuesto por la misma plataforma que actúa como Authorization Server.

OAuth 2.0 define roles lógicos. El Authorization Server y el Resource Server pueden estar separados o coincidir en la misma plataforma. Por eso este escenario es válido: la misma plataforma IAM puede emitir tokens y exponer APIs protegidas, por ejemplo APIs de administración, introspección, configuración o gobierno.

#### 4.6.2. Ejemplo de vida real

Un proceso de gobierno IAM necesita revisar clientes OAuth registrados, scopes asignados o configuración de realms/tenants. El proceso se autentica como cliente técnico, obtiene un token por `client_credentials` y consume una API administrativa del Authorization Server. Keycloak, por ejemplo, documenta una Admin REST API bajo rutas administrativas, lo que ilustra este patrón de plataforma IAM que también expone recursos protegidos.

#### 4.6.3. Diagrama de despliegue

~~~plantuml
@startuml
title Escenario 2 - M2M con AS actuando como RS

node "Plataforma de automatización" as WorkerNode {
  component "Servicio IAM Governance" as Worker
  artifact "client_id" as ClientId
}

node "Gestor de secretos" as Vault {
  artifact "client_secret / certificado" as Secret
}

node "Plataforma IAM" as IAM {
  component "Authorization Server" as AS
  component "Resource Server interno\n(Admin API / Introspection / Config API)" as RS
  database "Configuración IAM" as IAMDB
}

node "Observabilidad" as Obs {
  component "Logs / SIEM" as SIEM
}

Worker --> Vault : obtiene secreto
Worker --> AS : token request client_credentials
AS --> Worker : access_token
Worker --> RS : Bearer access_token
RS --> IAMDB : consulta/modifica recurso protegido
AS --> SIEM : log emisión token
RS --> SIEM : log acceso API
@enduml
~~~

#### 4.6.4. Diagrama de secuencia

~~~plantuml
@startuml
title Escenario 2 - Client Credentials contra recurso del AS

participant "Servicio IAM Governance" as Client
participant "Vault" as Vault
participant "Authorization Server" as AS
participant "Admin API / Resource Server" as RS
database "Config IAM" as DB

Client -> Vault : Solicitar secreto/certificado
Vault --> Client : Credencial técnica
Client -> AS : POST /token\ngrant_type=client_credentials\nclient_id + secret/cert
AS -> AS : Autentica cliente técnico
AS -> AS : Evalúa scopes permitidos
AS --> Client : access_token(scope=iam.read)
Client -> RS : GET /admin/clients\nAuthorization: Bearer access_token
RS -> AS : Validación local o introspection, si aplica
AS --> RS : token válido / claims / scopes
RS -> DB : Consultar clientes OAuth
DB --> RS : Lista de clientes
RS --> Client : Respuesta
@enduml
~~~

#### 4.6.5. Activos y controles relevantes

Activos:

- `client_id`;
- `client_secret` o certificado;
- `access_token` M2M;
- scopes técnicos;
- API administrativa o recurso protegido del AS;
- configuración IAM;
- logs de emisión y consumo;
- inventario de clientes técnicos.

Controles esperados:

- registro formal del cliente técnico;
- scopes mínimos y específicos;
- autenticación robusta del cliente;
- almacenamiento de secretos en vault;
- rotación de secretos o certificados;
- separación por ambiente y propósito;
- validación de audiencia, issuer, expiración y scopes;
- monitoreo del uso del `client_id`;
- revocación de clientes huérfanos;
- segregación de privilegios administrativos.

#### 4.6.6. Superficie de riesgo

Riesgos principales:

- abuso de cliente técnico privilegiado;
- secreto hardcodeado o filtrado;
- scopes administrativos excesivos;
- falta de rotación;
- cliente técnico sin dueño;
- concentración de riesgo por colocalización AS/RS;
- uso de credenciales de un ambiente en otro;
- trazabilidad insuficiente de acciones administrativas.

---

### 4.7. Escenario 3: API Gateway federado con Authorization Server corporativo y propagación/intercambio de tokens

#### 4.7.1. Descripción técnica

Este escenario representa una arquitectura donde el API Gateway actúa como punto de entrada hacia APIs internas. El Gateway valida tokens emitidos por un Authorization Server corporativo. Luego enruta la solicitud hacia uno o varios servicios backend.

El punto crítico es la frontera de confianza. No basta con que el Gateway valide el token. Debe definirse qué ocurre después:

1. **Propagación de token:** el Gateway envía el mismo `access_token` hacia el backend.
2. **Token exchange:** el Gateway intercambia el token original por otro token con audiencia y permisos específicos para el backend.
3. **Trusted subsystem:** el backend confía en el Gateway y recibe contexto de seguridad, pero este patrón exige controles fuertes de red, autenticación mutua, trazabilidad y no repudio interno.

RFC 8693 define OAuth 2.0 Token Exchange para solicitar y obtener tokens a partir de otro token. Este patrón es útil cuando cambia el destinatario del token o cuando se requiere representar delegación entre fronteras de confianza.

#### 4.7.2. Ejemplo de vida real

Un portal de originación de crédito recibe una solicitud del cliente. La SPA o canal llama al API Gateway. El Gateway valida el token corporativo y consulta servicios internos: cupos, cartera, listas restrictivas, perfilamiento de riesgo y datos maestros. Si el mismo token se propaga a todos los servicios, aparece riesgo de confusión de audiencia y privilegios excesivos. Si se usa token exchange, cada backend puede recibir un token con audiencia y scopes más precisos.

#### 4.7.3. Diagrama de despliegue

~~~plantuml
@startuml
title Escenario 3 - API Gateway federado + AS corporativo

node "Canal digital" as Channel {
  component "SPA / Mobile / BFF" as Client
}

node "DMZ / Zona de exposición" as Edge {
  component "API Gateway" as Gateway
}

node "Plataforma IAM corporativa" as IAM {
  component "Authorization Server" as AS
  artifact "JWKS / Introspection / Token Exchange" as TokenServices
}

node "Zona interna" as Internal {
  component "API Cupos" as Limits
  component "API Cartera" as Portfolio
  component "API Listas restrictivas" as Watchlists
  component "API Clientes" as Customers
}

node "Observabilidad" as Obs {
  component "Logs / SIEM / APM" as SIEM
}

Client --> Gateway : HTTPS + access_token
Gateway --> AS : valida JWT / introspection
Gateway --> AS : token exchange, si aplica
Gateway --> Limits : token propagado o token intercambiado
Gateway --> Portfolio : token propagado o token intercambiado
Gateway --> Watchlists : token propagado o token intercambiado
Gateway --> Customers : token propagado o token intercambiado
Gateway --> SIEM : logs de acceso y decisión
Limits --> SIEM
Portfolio --> SIEM
Watchlists --> SIEM
Customers --> SIEM
@enduml
~~~

#### 4.7.4. Diagrama de secuencia

~~~plantuml
@startuml
title Escenario 3 - Gateway, validación y token exchange

participant "Cliente / BFF" as Client
participant "API Gateway" as GW
participant "Authorization Server" as AS
participant "API Cupos" as Limits
participant "API Cartera" as Portfolio
participant "SIEM" as SIEM

Client -> GW : GET /originacion/resumen\nAuthorization: Bearer token_usuario
GW -> AS : Validar token\nJWKS o introspection
AS --> GW : token válido + claims + scopes
GW -> GW : Verifica issuer, audience, exp, scopes
alt Propagación directa
  GW -> Limits : Bearer token_usuario
  Limits -> Limits : Valida audience/scopes localmente
  GW -> Portfolio : Bearer token_usuario
  Portfolio -> Portfolio : Valida audience/scopes localmente
else Token exchange
  GW -> AS : Token exchange\nsubject_token=token_usuario\naudience=api-cupos
  AS --> GW : token_cupos
  GW -> Limits : Bearer token_cupos
  GW -> AS : Token exchange\nsubject_token=token_usuario\naudience=api-cartera
  AS --> GW : token_cartera
  GW -> Portfolio : Bearer token_cartera
end
Limits --> GW : Respuesta cupos
Portfolio --> GW : Respuesta cartera
GW -> SIEM : Log sujeto, cliente, audiencia, decisión
GW --> Client : Respuesta compuesta
@enduml
~~~

#### 4.7.5. Activos y controles relevantes

Activos:

- `access_token` original;
- tokens intercambiados, si aplica;
- claims de usuario y cliente;
- scopes;
- audiencia (`audience`);
- políticas del Gateway;
- configuración de introspection o JWKS;
- APIs internas;
- logs de decisión de acceso;
- correlación de trazas entre Gateway y backends.

Controles esperados:

- validación de firma o introspection;
- validación de `issuer`, `audience`, expiración y scopes;
- autorización por operación en Gateway;
- validación mínima también en backend;
- token exchange cuando cambia la audiencia o frontera de confianza;
- restricción de propagación de tokens;
- mTLS o canal seguro Gateway-backend;
- trazabilidad de sujeto, cliente, audiencia y decisión;
- manejo seguro de errores;
- separación entre autorización técnica y autorización de negocio.

#### 4.7.6. Superficie de riesgo

Riesgos principales:

- confusión de audiencia;
- propagación excesiva del token original;
- backends que confían ciegamente en el Gateway;
- pérdida de contexto de usuario;
- autorización de negocio incompleta;
- scopes demasiado amplios;
- trazabilidad fragmentada;
- abuso de relaciones de confianza entre zonas;
- dificultad para auditar qué token autorizó qué operación.

---

### 4.8. Comparación sintética de los casos

#### Registro 1: Uso de OAuth 2.0/OIDC

- **Caso base 0A - Monolito:** no usa OAuth 2.0/OIDC.
- **Caso base 0B - SPA + BFF local:** no usa OAuth 2.0/OIDC.
- **Escenario 1 - SPA + BFF + IdP:** usa OAuth 2.0/OIDC para login federado.
- **Escenario 2 - M2M AS=RS:** usa OAuth 2.0 `client_credentials`.
- **Escenario 3 - Gateway federado:** usa OAuth 2.0/OIDC, validación de tokens y posible token exchange.

#### Registro 2: Componente que autentica

- **Monolito:** la misma aplicación.
- **SPA + BFF local:** el BFF.
- **SPA + BFF + IdP:** el IdP corporativo.
- **M2M AS=RS:** el Authorization Server autentica al cliente técnico.
- **Gateway federado:** el Authorization Server autentica/emite tokens; el Gateway valida.

#### Registro 3: Artefacto de sesión o autorización dominante

- **Monolito:** cookie de sesión.
- **SPA + BFF local:** cookie de sesión.
- **SPA + BFF + IdP:** cookie navegador-BFF y tokens BFF-IdP/API.
- **M2M AS=RS:** `access_token` M2M.
- **Gateway federado:** `access_token` validado, propagado o intercambiado.

#### Registro 4: Riesgo dominante

- **Monolito:** concentración de responsabilidades y robo de sesión.
- **SPA + BFF local:** CSRF/CORS/sesión en BFF y exposición de APIs internas por mal diseño.
- **SPA + BFF + IdP:** errores en flujo OIDC, callback, PKCE, sesión y custodia server-side de tokens.
- **M2M AS=RS:** abuso de credenciales técnicas privilegiadas.
- **Gateway federado:** confusión de audiencia, exceso de confianza y propagación indebida.

#### Registro 5: Control crítico

- **Monolito:** seguridad de sesión, hash de contraseñas, autorización local y logs.
- **SPA + BFF local:** cookie segura, CSRF, CORS restrictivo y autorización server-side.
- **SPA + BFF + IdP:** Authorization Code + PKCE, `state`, `nonce`, redirect URI exacta y tokens fuera del navegador.
- **M2M AS=RS:** secretos en vault, scopes mínimos, rotación, trazabilidad por `client_id`.
- **Gateway federado:** validación de `issuer`, `audience`, expiración, scopes y token exchange cuando aplique.

#### Registro 6: Evidencia esperada

- **Monolito:** configuración de sesión, política de contraseñas, logs y pruebas de autorización.
- **SPA + BFF local:** configuración de cookies, CSRF/CORS, logs del BFF y pruebas de endpoint.
- **SPA + BFF + IdP:** configuración OIDC, cliente, redirect URI, PKCE, logs de IdP/BFF y evidencia de tokens server-side.
- **M2M AS=RS:** inventario de clientes, scopes, vault, rotación, logs de token y consumo.
- **Gateway federado:** configuración de Gateway, JWKS/introspection, políticas de audiencia, trazas, logs y pruebas de propagación o token exchange.


## 5. Diseño del modelo de evaluación

### 5.1. Propósito del modelo de evaluación

El modelo de evaluación tiene como propósito evaluar controles de seguridad en arquitecturas basadas en OAuth 2.0 y OpenID Connect desde la relación entre riesgo, control y auditoría.

En términos instrumentales, el modelo se operacionaliza mediante una matriz de evaluación y un checklist calificable.

Como entregable aplicado, el modelo se condensará en un sitio web publicado en GitHub Pages. Este sitio funcionará como formulario de evaluación: permitirá seleccionar una de las tres arquitecturas del modelo, cargará automáticamente el catálogo predefinido de riesgos y controles esperados del escenario, recibirá los datos de evaluación diligenciados por el usuario, ejecutará la lógica de calificación definida por la tesis y generará un informe en Excel. Los algoritmos implementados en JavaScript serán una traducción operativa de las fórmulas y reglas matemáticas definidas en este documento.

El modelo no se aplica a los casos base sin OAuth 2.0/OIDC. El monolito y la arquitectura SPA + BFF con usuarios propios pertenecen al marco conceptual porque ayudan a explicar qué cambia cuando aparece identidad federada. El uso del modelo inicia cuando la arquitectura ya incorpora Authorization Server, clientes OAuth, tokens, scopes, Resource Servers o propagación de identidad.

Por tanto, la matriz se aplica a los tres escenarios OAuth 2.0/OIDC definidos en la tesis:

1. Escenario 1: SPA estática + BFF + IdP corporativo.
2. Escenario 2: M2M con Authorization Server actuando también como Resource Server.
3. Escenario 3: API Gateway federado + Authorization Server corporativo.

El modelo permite relacionar:

1. escenario OAuth 2.0/OIDC evaluado;
2. riesgo transversal o específico;
3. activo afectado;
4. riesgo identificado;
5. control esperado;
6. evidencia auditable;
7. dimensiones del control;
8. evaluación del control;
9. nivel de exposición observado;
10. hallazgo, brecha u observación.

---

### 5.2. Fundamento del modelo de evaluación

#### 5.2.1. Relación riesgo, control y auditoría

El modelo de evaluación se aplica en un único corte sobre el estado actual de la arquitectura revisada. No presupone una secuencia antes/después ni una fase de implementación dentro del mismo instrumento. En su lugar, se operacionaliza mediante un procedimiento de aplicación compuesto por cuatro momentos: selección del catálogo aplicable de riesgos y controles, caracterización del riesgo, evaluación de cada control y evaluación global del sistema. Si posteriormente se aplican correcciones, una nueva aplicación del modelo constituye una reevaluación independiente.

La lógica base es:

~~~text
1. Selección del catálogo aplicable de riesgos y controles
  ↓
  Arquitectura evaluada
  ↓
  Riesgos globales OAuth 2.0/OIDC
  ↓
  Riesgos específicos de la arquitectura
  ↓
  Controles globales y controles esperados por riesgo
2. Caracterización de cada riesgo aplicable
  ↓
  Activo en riesgo, amenaza, probabilidad e impacto
3. Evaluación de cada control
  ↓
  Costo del control
  ↓
  Estado y evidencia en cinco dimensiones
  ↓
  Homologación cuantitativa por dimensión
  ↓
  Score ponderado del control
4. Evaluación global del sistema
  ↓
  Eficiencia y eficacia del sistema
  ↓
  Nivel de exposición observado
  ↓
  Hallazgo / brecha / observación
~~~

Esta estructura organiza la aplicación del modelo en cuatro momentos:

1. **Selección de riesgos y controles aplicables:** parte del catálogo de riesgos globales OAuth 2.0/OIDC, delimita la arquitectura evaluada y activa tanto los riesgos específicos como los controles aplicables definidos por el modelo.
2. **Caracterización del riesgo:** registra el activo en riesgo, la amenaza, la probabilidad y el impacto de cada riesgo aplicable.
3. **Evaluación individual del control:** levanta costo, estado y evidencia del control, clasifica sus cinco dimensiones y homologa sus valores para obtener un score comparable.
4. **Evaluación global del sistema:** integra los resultados de los controles evaluados para producir medidas agregadas de eficiencia, eficacia y nivel de exposición observado.

De forma sintética, el procedimiento de aplicación del modelo puede resumirse así:

1. **Seleccionar los riesgos y controles aplicables**
  - partir del catálogo de riesgos globales OAuth 2.0/OIDC propuesto por el modelo, es decir, riesgos que pueden aparecer con independencia de la arquitectura seleccionada;
  - seleccionar la arquitectura evaluada, limitada a una de las tres arquitecturas del modelo: SPA estática + BFF + IdP corporativo, M2M con Authorization Server actuando también como Resource Server, o API Gateway federado con Authorization Server corporativo;
  - activar los riesgos específicos correspondientes a la arquitectura seleccionada;
  - asociar los controles globales esperados para cada riesgo transversal;
  - asociar los controles específicos esperados para cada riesgo propio de la arquitectura evaluada.

2. **Caracterizar cada riesgo aplicable**
  - activo en riesgo;
  - amenaza;
  - probabilidad;
  - impacto.

3. **Evaluar cada control asociado a cada riesgo**
  - levantar el costo del control;
  - levantar el estado y la evidencia del control en cinco dimensiones: madurez, automatización, momento, periodicidad y alcance funcional;
  - homologar cada dimensión en una escala cuantitativa para hacer comparables los controles entre sí;
  - calcular un score ponderado del control a partir de esas dimensiones homologadas.

4. **Evaluar globalmente el sistema**
  - aplicar una lectura cuantitativa de eficiencia del sistema, considerando la relación entre costo del control, nivel de protección y afectación económica estimada del activo en riesgo;
  - aplicar una lectura cuantitativa de eficacia del sistema, considerando la cobertura de riesgos por parte de los controles evaluados;
  - aplicar una lectura cualitativa de eficiencia, valorando si el sistema consume recursos de manera adecuada en relación con la protección obtenida;
  - aplicar una lectura cualitativa de eficacia, valorando si el sistema cumple los objetivos de seguridad establecidos.

En esta síntesis, las cinco dimensiones del control se usan como base del algoritmo de calificación. La homologación cuantitativa y los ponderadores del score se formalizan a partir de los valores definidos por la tesis para madurez, automatización, momento, periodicidad y alcance funcional.

En la implementación web, el primer momento se materializa como un catálogo precargado. La selección de una de las tres arquitecturas habilita automáticamente los riesgos globales OAuth 2.0/OIDC, los riesgos específicos del escenario y los controles esperados asociados. El algoritmo no recibe riesgos libres escritos por el usuario; lo dinámico son los datos de evaluación diligenciados para cada registro.

Los casos base sin OAuth 2.0/OIDC no se incluyen en esta lógica del modelo de evaluación porque no contienen Authorization Server, clientes OAuth, tokens OAuth 2.0/OIDC, scopes ni validación federada de tokens. Sirven como contraste conceptual, no como objeto de evaluación de la matriz.

~~~mermaid
graph TD
A[Arquitectura evaluada] --> B[Riesgos globales OAuth 2.0/OIDC]
A --> C[Riesgos específicos de la arquitectura]
B --> D[Controles globales esperados]
C --> E[Controles específicos esperados]
D --> F[Caracterización del riesgo]
E --> F
F --> G[Evaluación individual del control]
G --> H[Costo, estado y evidencia]
H --> I[Homologación y score ponderado]
I --> J[Eficiencia y eficacia del sistema]
J --> K[Nivel de exposición observado]
K --> L[Hallazgo / brecha / observación]
~~~

#### 5.2.2. Riesgos transversales y específicos

Los riesgos transversales son aquellos que pueden afectar a cualquier escenario OAuth 2.0/OIDC. No dependen de un flujo particular, sino de debilidades comunes de gobierno, configuración, validación u operación.

Ejemplos:

- clientes OAuth sin inventario ni responsable;
- emisión de tokens con scopes excesivos;
- tokens con vigencia inadecuada;
- falta de rotación de secretos o certificados;
- aceptación de algoritmos inseguros;
- ausencia de monitoreo sobre emisión y uso de tokens;
- falta de trazabilidad sobre decisiones de autorización;
- configuración inconsistente entre ambientes.

Los riesgos específicos son aquellos que emergen de la arquitectura, el flujo y la frontera de confianza de un escenario particular. No reemplazan a los riesgos transversales, sino que los complementan.

Ejemplos:

- ausencia de `state` o `nonce` en el escenario 1;
- secretos hardcodeados o privilegios excesivos en clientes M2M del escenario 2;
- confusión de audiencia o propagación indebida de tokens en el escenario 3.

El modelo no separa, dentro de una misma ejecución, un riesgo "antes" y otro "después" de implantar controles. Trabaja con un único corte de evaluación sobre la arquitectura tal como existe al momento del levantamiento. Para cada riesgo se debe identificar:

1. activo afectado;
2. amenaza o causa;
3. vulnerabilidad o condición habilitante;
4. probabilidad;
5. impacto.

Esta separación es coherente con NIST SP 800-30, que estructura la evaluación de riesgos alrededor de amenazas, vulnerabilidades, probabilidad e impacto sobre activos u operaciones. En la tesis, transversal o específico describe el alcance del riesgo; el nivel de exposición observado expresa la conclusión evaluativa obtenida en ese mismo corte.

#### 5.2.3. Controles transversales

Los controles transversales son controles esperados para toda arquitectura OAuth 2.0/OIDC, independientemente del escenario específico.

Ejemplos:

- política de registro y gobierno de clientes OAuth;
- definición de scopes mínimos;
- políticas de vigencia de tokens;
- gestión de secretos y certificados;
- rotación de claves y publicación de JWKS;
- logging de autenticación, emisión y validación de tokens;
- monitoreo de uso anómalo de clientes, tokens o scopes;
- revisión periódica de clientes y permisos;
- segregación de ambientes;
- gestión de cambios sobre el Authorization Server.

Estos controles establecen una línea mínima de gobierno. Después, cada escenario agrega controles específicos.

#### 5.2.4. Controles específicos por escenario

Cada escenario introduce una superficie de riesgo distinta. Por eso la matriz no debe evaluar todos los escenarios con la misma lista de controles.

##### Escenario 1: SPA + BFF + IdP corporativo

Controles específicos:

- Authorization Code Flow con PKCE;
- `code_challenge_method=S256`;
- validación de `state`;
- validación de `nonce`;
- redirect URI exacta;
- tokens custodiados server-side en el BFF;
- cookie `HttpOnly`, `Secure` y `SameSite`;
- protección CSRF;
- Content Security Policy para reducir riesgo de XSS;
- evidencia de que la SPA no almacena tokens.

##### Escenario 2: M2M con AS como RS

Controles específicos:

- uso controlado de `client_credentials`;
- autenticación robusta del cliente técnico;
- scopes mínimos para APIs administrativas;
- cliente distinto por ambiente y propósito;
- secretos o certificados en vault;
- rotación periódica;
- revocación de clientes inactivos;
- monitoreo por `client_id`;
- trazabilidad de acciones administrativas;
- revisión periódica de privilegios.

##### Escenario 3: API Gateway federado + AS corporativo

Controles específicos:

- validación de firma o introspection;
- validación de `issuer`;
- validación de `audience` por dominio;
- validación de expiración;
- validación de scopes;
- política común de validación entre Gateway y Resource Servers;
- revalidación mínima en backends críticos;
- token exchange cuando cambie la audiencia o frontera de confianza;
- reducción de scopes al intercambiar tokens;
- correlación de logs Gateway-backend;
- actualización y caché controlada de JWKS.

#### 5.2.5. Eficiencia, eficacia y efectividad del control

Siguiendo el enfoque de Valencia Duque, la efectividad del control se analiza a partir de dos dimensiones:

1. **Eficiencia del control:** evalúa si el control está bien diseñado frente al riesgo.
2. **Eficacia del control:** evalúa si existe evidencia de que el control opera y cumple su objetivo.

En esta tesis, la eficiencia responde:

> ¿El control es pertinente y suficiente para mitigar el riesgo identificado?

La eficacia responde:

> ¿Existe evidencia verificable de que el control opera en la arquitectura evaluada?

La efectividad resulta de combinar ambas dimensiones:

~~~text
Buen diseño + evidencia suficiente = control efectivo
Buen diseño + evidencia débil = control no demostrado
Diseño insuficiente + evidencia operativa = control operativo pero incompleto
Diseño débil + evidencia débil = control no confiable
~~~

Ejemplo:

- Riesgo: confusión de audiencia.
- Control declarado: validación de firma JWT.
- Evaluación: el control es insuficiente si no valida `audience`.
- Conclusión: puede existir un control implementado, pero no ser efectivo frente al riesgo.

#### 5.2.6. Dimensiones de evaluación del control

Cada control se clasifica mediante dimensiones que permiten medir su madurez y capacidad real de mitigación.

##### Madurez

Describe el estado del control frente a su formalización, diseño, implementación y verificación.

Valores:

- Declarado.
- Diseñado.
- Implementado.
- Auditado.

##### Automatización

Describe cuánto depende el control de intervención humana.

Valores:

- Manual.
- Semiautomático.
- Automático.

##### Momento de actuación

Describe cuándo actúa el control frente al riesgo.

Valores:

- Preventivo.
- Detectivo.
- Correctivo.

Esta clasificación es compatible con los atributos de ISO/IEC 27002:2022, donde los controles pueden clasificarse como preventivos, detectivos o correctivos.

##### Periodicidad

Describe con qué frecuencia se ejecuta o verifica el control.

Valores:

- Ocasional.
- Periódico.
- Permanente.

##### Alcance funcional

Describe la cobertura del control dentro de la arquitectura evaluada.

Valores:

- Específico.
- General.

#### 5.2.7. Nivel de exposición observado

La matriz opera en un único momento de evaluación y produce una conclusión sobre la exposición observada en la arquitectura revisada. Para ello articula tres elementos:

1. **Riesgo identificado:** riesgo relevante en el escenario evaluado.
2. **Evaluación del control:** valoración del diseño, la operación y la evidencia disponible sobre los controles existentes.
3. **Nivel de exposición observado:** conclusión sobre la exposición actual del escenario, derivada de contrastar el riesgo identificado con el estado observado del control.

La relación conceptual es:

~~~text
Riesgo identificado
  +
estado observado del control
  +
evidencia disponible
  ↓
nivel de exposición observado
~~~

Si posteriormente se aplican correcciones, la tesis no asume una segunda fase interna del mismo modelo, sino una nueva evaluación sobre un nuevo estado de la arquitectura. La tesis puede usar homologación cualitativa o semicuantitativa, siempre que mantenga trazabilidad entre riesgo, control, evidencia y conclusión.

---

### 5.3. Criterios de evaluación

La matriz utiliza criterios orientados a determinar si el control es pertinente, suficiente, verificable y útil para reducir el riesgo identificado.

Los criterios principales son:

1. **Pertinencia:** el control está directamente relacionado con el riesgo.
2. **Suficiencia:** el control cubre los elementos mínimos para mitigar el riesgo.
3. **Evidencia:** el control puede verificarse con documentación, configuración, logs, pruebas o revisión técnica.
4. **Madurez:** el control está declarado, diseñado, implementado o auditado.
5. **Automatización:** el control es manual, semiautomático o automático.
6. **Momento:** el control es preventivo, detectivo o correctivo.
7. **Periodicidad:** el control es ocasional, periódico o permanente.
8. **Alcance:** el control es específico o general.
9. **Eficiencia:** el diseño del control es adecuado frente al riesgo.
10. **Eficacia:** existe evidencia de operación real.
11. **Nivel de exposición observado:** se caracteriza la exposición actual del escenario evaluado.
12. **Trazabilidad:** el control se relaciona con una referencia técnica, normativa o conceptual.

---

### 5.4. Estructura de la matriz

La matriz se organiza en tres bloques lógicos:

#### 5.4.1. Bloque 1: Riesgo

Este bloque identifica qué puede fallar.

Campos:

1. escenario OAuth 2.0/OIDC;
2. tipo de riesgo: transversal o específico;
3. activo afectado;
4. riesgo identificado;
5. amenaza o causa;
6. vulnerabilidad o condición habilitante;
7. probabilidad;
8. impacto;
9. nivel del riesgo identificado.

#### 5.4.2. Bloque 2: Control

Este bloque identifica qué debería mitigar el riesgo y qué tan fuerte es el control.

Campos:

1. control esperado;
2. tipo de control: transversal o específico;
3. madurez;
4. automatización;
5. momento;
6. periodicidad;
7. alcance funcional;
8. eficiencia del control;
9. eficacia del control;
10. efectividad del control.

#### 5.4.3. Bloque 3: Auditoría y conclusión evaluativa

Este bloque identifica cómo se verifica el control y qué riesgo permanece.

Campos:

1. evidencia auditable esperada;
2. evidencia encontrada;
3. fuente de evidencia;
4. responsable o custodio de la evidencia;
5. nivel de exposición observado;
6. hallazgo o brecha;
7. observación evaluativa;
8. referencia normativa o técnica.

La estructura general se representa así:

~~~mermaid
graph TD
A[Escenario OAuth 2.0/OIDC] --> B[Riesgo identificado]
B --> C[Control esperado]
C --> D[Dimensiones del control]
D --> E[Evidencia auditable]
E --> F[Eficiencia + eficacia]
F --> G[Efectividad del control]
G --> H[Nivel de exposición observado]
H --> I[Hallazgo / brecha / observación]
~~~

Esta estructura corrige la inconsistencia entre el esquema del modelo y la matriz: primero se identifica el riesgo, luego el control, luego la evidencia y finalmente el nivel de exposición observado. La matriz no parte de los casos base; parte de los escenarios OAuth 2.0/OIDC.

---

### 5.5. Campos de la matriz

#### 5.5.1. Escenario

Identifica el escenario OAuth 2.0/OIDC evaluado.

Valores esperados:

1. Escenario 1: SPA estática + BFF + IdP corporativo.
2. Escenario 2: M2M con Authorization Server como Resource Server.
3. Escenario 3: API Gateway federado con Authorization Server corporativo.
4. Transversal OAuth 2.0/OIDC, cuando el riesgo o control aplique a todos los escenarios.

Los casos base 0A y 0B no son valores válidos de este campo porque no hacen parte de la matriz del modelo de evaluación. Se usan únicamente en el marco conceptual.

#### 5.5.2. Tipo de riesgo

Clasifica si el riesgo es transversal o específico.

- **Transversal:** aplica a toda arquitectura OAuth 2.0/OIDC.
- **Específico:** aplica a uno de los tres escenarios evaluados.

#### 5.5.3. Activo afectado

Identifica el activo de información, componente o elemento técnico afectado.

Ejemplos:

- `authorization_code`;
- `access_token`;
- `id_token`;
- `refresh_token`;
- `client_id`;
- `client_secret`;
- certificado o llave privada;
- scopes;
- claims;
- `issuer`;
- `audience`;
- JWKS;
- Authorization Server;
- Resource Server;
- API Gateway;
- logs de autenticación/autorización.

#### 5.5.4. Riesgo identificado

Describe el evento de riesgo que se observa como relevante en el escenario evaluado.

Ejemplos:

- interceptación del `authorization_code`;
- exposición de tokens en navegador;
- aceptación de tokens inválidos;
- confusión de audiencia;
- uso excesivo de privilegios;
- abuso de cliente técnico;
- pérdida de trazabilidad;
- propagación indebida de tokens.

#### 5.5.5. Amenaza o causa

Describe la condición que puede materializar el riesgo.

Ejemplos:

- falta de PKCE;
- redirect URI mal registrada;
- ausencia de validación de `state` o `nonce`;
- falta de validación de `audience`;
- scopes demasiado amplios;
- secretos hardcodeados;
- JWKS desactualizado;
- ausencia de monitoreo;
- Gateway con validación parcial;
- backend que confía ciegamente en el Gateway.

#### 5.5.6. Probabilidad

Estima posibilidad de materialización.

Valores sugeridos:

- Baja.
- Media.
- Alta.

#### 5.5.7. Impacto

Estima consecuencia sobre confidencialidad, integridad, disponibilidad, trazabilidad o cumplimiento.

Valores sugeridos:

- Bajo.
- Medio.
- Alto.
- Crítico.

#### 5.5.8. Nivel del riesgo identificado

Resultado de combinar probabilidad e impacto del riesgo caracterizado en el escenario evaluado.

Valores sugeridos:

- Bajo.
- Medio.
- Alto.
- Crítico.

#### 5.5.9. Control esperado

Describe el control que debería existir para mitigar el riesgo.

Ejemplos:

- Authorization Code + PKCE con `S256`;
- validación de `state`;
- validación de `nonce`;
- redirect URI exacta;
- validación de firma;
- validación de `issuer`;
- validación de `audience`;
- validación de expiración;
- validación de scopes;
- token introspection;
- token exchange;
- gestión de secretos en vault;
- rotación de credenciales;
- monitoreo por `client_id`.

#### 5.5.10. Tipo de control

Clasifica el alcance del control.

- Transversal.
- Específico.

#### 5.5.11. Dimensiones del control

Registra la valoración del control:

- **Madurez:** declarado, diseñado, implementado, auditado.
- **Automatización:** manual, semiautomático, automático.
- **Momento:** preventivo, detectivo, correctivo.
- **Periodicidad:** ocasional, periódico, permanente.
- **Alcance funcional:** específico, general.

Para conservar comparabilidad entre registros, cada dimensión debe diligenciarse con un único valor por control.

#### 5.5.12. Eficiencia del control

Evalúa si el control está bien diseñado frente al riesgo.

Valores sugeridos:

- Baja.
- Media.
- Alta.

#### 5.5.13. Eficacia del control

Evalúa si hay evidencia verificable de operación real.

Valores sugeridos:

- Baja.
- Media.
- Alta.

#### 5.5.14. Efectividad del control

Resume la combinación entre eficiencia y eficacia.

Valores sugeridos:

- Baja.
- Media.
- Alta.

Lectura sugerida para asignarla:

- **Alta:** eficiencia alta y eficacia alta.
- **Media:** eficiencia alta con eficacia media, eficiencia media con eficacia alta, o eficiencia media con eficacia media.
- **Baja:** cualquier combinación donde al menos una de las dos dimensiones sea baja.

Para conservar comparabilidad, no se deben usar valores compuestos como "Media/Alta".

#### 5.5.15. Evidencia auditable esperada

Describe qué evidencia debería existir.

Ejemplos:

- configuración del Authorization Server;
- configuración del cliente OAuth 2.0/OIDC;
- configuración del API Gateway;
- configuración del Resource Server;
- política de scopes;
- evidencia de rotación;
- logs de autenticación;
- logs de emisión de tokens;
- logs de validación o introspection;
- pruebas técnicas;
- revisión puntual de código;
- documentación de arquitectura;
- registros de monitoreo o alertamiento.

#### 5.5.16. Evidencia encontrada

Describe la evidencia efectivamente disponible durante la evaluación.

La matriz debe diferenciar entre:

- evidencia suficiente;
- evidencia parcial;
- evidencia declarada pero no demostrada;
- ausencia de evidencia.

#### 5.5.17. Fuente de evidencia

Identifica de dónde proviene la evidencia.

Ejemplos:

- consola del IdP;
- archivo de configuración;
- repositorio;
- pipeline;
- API Gateway;
- logs SIEM;
- trazas APM;
- prueba técnica;
- documento de arquitectura;
- entrevista técnica.

#### 5.5.18. Nivel de exposición observado

Describe la exposición que se observa en la arquitectura evaluada al momento del levantamiento, a partir del riesgo identificado, el estado del control y la evidencia disponible.

Valores sugeridos:

- Bajo.
- Medio.
- Alto.
- Crítico.

#### 5.5.19. Hallazgo, brecha u observación

Registra la conclusión evaluativa.

Ejemplos:

- brecha de diseño;
- brecha de implementación;
- falta de evidencia;
- control manual débil;
- control no periódico;
- exceso de privilegios;
- ausencia de trazabilidad;
- observación de mejora.

#### 5.5.20. Referencia normativa o técnica

Relaciona el control con una fuente.

Ejemplos:

- RFC 6749;
- RFC 6750;
- RFC 7636;
- RFC 7662;
- RFC 8693;
- RFC 9068;
- RFC 9700;
- OpenID Connect Core 1.0;
- OWASP OAuth 2.0 Cheat Sheet;
- OWASP ASVS;
- NIST SP 800-30;
- NIST SP 800-53;
- ISO/IEC 27002;
- Valencia Duque.

---

### 5.6. Plantilla inicial de la matriz

La plantilla inicial se limita a los tres escenarios OAuth 2.0/OIDC. Los casos base no se incluyen.

En el entregable web, esta plantilla se materializa como un catálogo precargado. El formulario carga automáticamente los riesgos y controles asociados al escenario seleccionado, mientras que el evaluador diligencia los datos de análisis, costo, evidencia, estado del control y observaciones de cada registro.

#### Registro 1: Transversal OAuth 2.0/OIDC

- **Escenario:** Transversal OAuth 2.0/OIDC.
- **Tipo de riesgo:** Transversal.
- **Activo afectado:** Authorization Server, clientes OAuth, tokens y logs de autorización.
- **Riesgo identificado:** Emisión, aceptación o uso indebido de tokens.
- **Amenaza / causa:** Configuración débil, falta de gobierno de clientes o ausencia de monitoreo.
- **Probabilidad:** Media.
- **Impacto:** Alto.
- **Nivel del riesgo identificado:** Alto.
- **Control esperado:** Política central de emisión, validación, vigencia, scopes, monitoreo y gobierno de clientes OAuth.
- **Tipo de control:** Transversal.
- **Madurez:** Diseñado.
- **Automatización:** Semiautomático.
- **Momento:** Preventivo.
- **Periodicidad:** Permanente.
- **Alcance funcional:** General.
- **Eficiencia:** Media.
- **Eficacia:** Media.
- **Efectividad:** Media.
- **Evidencia auditable esperada:** Política de clientes, configuración del AS, logs de emisión, inventario de clientes y revisión de scopes.
- **Evidencia encontrada:** Por diligenciar.
- **Fuente de evidencia:** Consola AS, documentación, SIEM, repositorio de arquitectura.
- **Nivel de exposición observado:** Medio.
- **Hallazgo / observación:** La evidencia y el monitoreo transversal aún son insuficientes para respaldar completamente el control.
- **Referencia:** RFC 6749, RFC 9700, ISO/IEC 27002, NIST SP 800-53.

#### Registro 2: Escenario 1 - SPA + BFF + IdP corporativo

- **Escenario:** SPA estática + BFF + IdP corporativo.
- **Tipo de riesgo:** Específico.
- **Activo afectado:** `authorization_code`, `id_token`, `access_token`, `refresh_token`, cookie de sesión.
- **Riesgo identificado:** Interceptación de código, exposición de tokens o sesión mal vinculada.
- **Amenaza / causa:** Falta de PKCE, validación débil de `state`/`nonce`, redirect URI débil o tokens en navegador.
- **Probabilidad:** Media.
- **Impacto:** Alto.
- **Nivel del riesgo identificado:** Alto.
- **Control esperado:** Authorization Code + PKCE con `S256`, validación de `state` y `nonce`, redirect URI exacta, tokens server-side y cookie segura.
- **Tipo de control:** Específico.
- **Madurez:** Implementado.
- **Automatización:** Automático.
- **Momento:** Preventivo.
- **Periodicidad:** Permanente.
- **Alcance funcional:** Específico.
- **Eficiencia:** Alta.
- **Eficacia:** Media.
- **Efectividad:** Media.
- **Evidencia auditable esperada:** Configuración del cliente OIDC, callback, código BFF, configuración de cookies, logs IdP/BFF y prueba de ausencia de tokens en la SPA.
- **Evidencia encontrada:** Por diligenciar.
- **Fuente de evidencia:** IdP, repositorio BFF, navegador DevTools, logs.
- **Nivel de exposición observado:** Medio.
- **Hallazgo / observación:** La evidencia disponible aún no demuestra de forma suficiente que los tokens no llegan al navegador ni que `state`/`nonce` estén implementados correctamente.
- **Referencia:** RFC 6749, RFC 7636, OIDC Core, RFC 9700.

#### Registro 3: Escenario 2 - M2M con AS como RS

- **Escenario:** M2M con Authorization Server como Resource Server.
- **Tipo de riesgo:** Específico.
- **Activo afectado:** `client_secret`, certificado, `access_token` M2M, API administrativa.
- **Riesgo identificado:** Abuso de cliente técnico privilegiado.
- **Amenaza / causa:** Secretos expuestos, scopes excesivos, cliente sin responsable o ausencia de rotación.
- **Probabilidad:** Alta.
- **Impacto:** Alto.
- **Nivel del riesgo identificado:** Crítico.
- **Control esperado:** `client_credentials` con credencial protegida en vault, scopes mínimos, rotación y trazabilidad por `client_id`.
- **Tipo de control:** Específico.
- **Madurez:** Diseñado.
- **Automatización:** Semiautomático.
- **Momento:** Preventivo.
- **Periodicidad:** Periódico.
- **Alcance funcional:** Específico.
- **Eficiencia:** Alta.
- **Eficacia:** Media.
- **Efectividad:** Media.
- **Evidencia auditable esperada:** Inventario de clientes, configuración de scopes, vault, logs de emisión y consumo, evidencia de rotación.
- **Evidencia encontrada:** Por diligenciar.
- **Fuente de evidencia:** Consola AS, vault, SIEM, pipeline, documentación IAM.
- **Nivel de exposición observado:** Alto.
- **Hallazgo / observación:** La rotación y la revisión de privilegios administrativos todavía presentan una exposición alta y requieren mejor evidencia de control.
- **Referencia:** RFC 6749, RFC 8705, RFC 9700, NIST SP 800-53.

#### Registro 4: Escenario 3 - API Gateway federado

- **Escenario:** API Gateway federado con Authorization Server corporativo.
- **Tipo de riesgo:** Específico.
- **Activo afectado:** `access_token`, audiencia, scopes, claims, trazabilidad Gateway-backend.
- **Riesgo identificado:** Confusión de audiencia o propagación indebida de tokens.
- **Amenaza / causa:** Gateway valida parcialmente el token, propaga el mismo token a múltiples APIs internas o backend confía ciegamente en el Gateway.
- **Probabilidad:** Media.
- **Impacto:** Alto.
- **Nivel del riesgo identificado:** Alto.
- **Control esperado:** Validación de firma/introspection, `issuer`, `audience`, expiración, scopes, autorización por operación y token exchange cuando cambie la audiencia.
- **Tipo de control:** Específico.
- **Madurez:** Implementado.
- **Automatización:** Automático.
- **Momento:** Preventivo.
- **Periodicidad:** Permanente.
- **Alcance funcional:** General.
- **Eficiencia:** Alta.
- **Eficacia:** Media.
- **Efectividad:** Media.
- **Evidencia auditable esperada:** Configuración Gateway, JWKS/introspection, reglas de audiencia, trazas, logs y pruebas de token exchange o propagación.
- **Evidencia encontrada:** Por diligenciar.
- **Fuente de evidencia:** Gateway, AS, Resource Servers, SIEM, APM.
- **Nivel de exposición observado:** Medio.
- **Hallazgo / observación:** Persiste exposición por confianza excesiva en el Gateway cuando los backends críticos no muestran validación mínima suficientemente evidenciada.
- **Referencia:** RFC 6750, RFC 7662, RFC 8693, RFC 9068, RFC 9700.


## 6. Experimento / Aplicación de la matriz a los escenarios OAuth 2.0/OIDC

6.1. Aplicación al escenario 1: SPA estática + BFF + IdP corporativo  
6.2. Aplicación al escenario 2: M2M con Authorization Server como Resource Server  
6.3. Aplicación al escenario 3: API Gateway federado con Authorization Server corporativo  
6.4. Comparación de riesgos entre escenarios OAuth 2.0/OIDC  
6.5. Controles transversales y controles específicos  
6.6. Evidencias mínimas para auditoría  
6.7. Niveles de exposición observados

---

## 7. Análisis de resultados

7.1. Riesgos más relevantes identificados  
7.2. Controles críticos por escenario  
7.3. Evidencias auditables más importantes  
7.4. Diferencias entre autenticación, autorización y federación desde el riesgo  
7.5. Hallazgos sobre el uso seguro de OAuth 2.0/OIDC  
7.6. Valor de la matriz como artefacto de evaluación

---

## 8. Conclusiones y trabajo futuro

8.1. Conclusiones frente al objetivo general  
8.2. Conclusiones frente a los objetivos específicos  
8.3. Aporte de la tesis  
8.4. Limitaciones del trabajo  
8.5. Trabajo futuro

---

## 9. Referencias

9.1. Valencia Duque — *Aseguramiento y auditoría de tecnologías de información orientados a riesgos: un enfoque basado en estándares internacionales*.  
9.2. RFC 6749 — OAuth 2.0 Authorization Framework.  
9.3. RFC 6750 — OAuth 2.0 Bearer Token Usage.  
9.4. OpenID Connect Core 1.0.  
9.5. RFC 7515 — JSON Web Signature.  
9.6. RFC 7516 — JSON Web Encryption.  
9.7. RFC 7517 — JSON Web Key.  
9.8. RFC 7519 — JSON Web Token.  
9.9. RFC 7636 — Proof Key for Code Exchange.  
9.10. RFC 7662 — OAuth 2.0 Token Introspection.  
9.11. RFC 8693 — OAuth 2.0 Token Exchange.  
9.12. RFC 8705 — OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens.  
9.13. RFC 9068 — JWT Profile for OAuth 2.0 Access Tokens.  
9.14. RFC 9449 — OAuth 2.0 Demonstrating Proof of Possession.  
9.15. RFC 9700 — OAuth 2.0 Security Best Current Practice.  
9.16. OWASP OAuth 2.0 Cheat Sheet.  
9.17. OWASP ASVS — OAuth and OIDC.  
9.18. OWASP Session Management Cheat Sheet.  
9.19. OWASP Cross-Site Request Forgery Prevention Cheat Sheet.  
9.20. NIST SP 800-30 Rev. 1.  
9.21. NIST SP 800-53 Rev. 5.  
9.22. NIST Cybersecurity Framework 2.0.  
9.23. ISO/IEC 27001 / 27002.  
9.24. Otras fuentes académicas y técnicas

---

## 10. Anexos

10.1. Matriz completa de evaluación  
10.2. Glosario de términos  
10.3. Diagramas de escenarios  
10.4. Checklist resumido  
10.5. Tabla de trazabilidad riesgo–control–evidencia
10.6. Referencia del repositorio GitHub, del sitio en GitHub Pages y formato del reporte Excel

