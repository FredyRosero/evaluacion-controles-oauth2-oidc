const CATALOG_URL = 'catalogo/data/catalogo-maestro.json';
const SCORE_WEIGHTS = {
  madurez: 0.35,
  automatizacion: 0.15,
  momento: 0.15,
  periodicidad: 0.15,
  alcance: 0.2
};

const PROBABILITY_OPTIONS = [
  { value: 'baja', label: 'Baja' },
  { value: 'media', label: 'Media' },
  { value: 'alta', label: 'Alta' }
];
const IMPACT_OPTIONS = [
  { value: 'bajo', label: 'Bajo' },
  { value: 'medio', label: 'Medio' },
  { value: 'alto', label: 'Alto' },
  { value: 'critico', label: 'Crítico' }
];
const ENVIRONMENT_OPTIONS = [
  { value: 'Producción', label: 'Producción' },
  { value: 'Preproducción', label: 'Preproducción' },
  { value: 'Desarrollo', label: 'Desarrollo' },
  { value: 'Otro', label: 'Otro' }
];

const DEMO_SOURCE_MESSAGE = 'Datos de demostración basados en el Capítulo 6 de la tesis (Versión 15), secciones 6.1-6.3 y catálogo maestro v1.1.0.';

const DEMO_PAYLOADS_URL = 'catalogo/data/demo-prediligenciamiento.json';
const DEMO_PAYLOADS = {};

const RISK_LEVEL_MATRIX = {
  baja: { bajo: 'Bajo', medio: 'Bajo', alto: 'Medio', critico: 'Alto' },
  media: { bajo: 'Bajo', medio: 'Medio', alto: 'Alto', critico: 'Crítico' },
  alta: { bajo: 'Medio', medio: 'Alto', alto: 'Crítico', critico: 'Crítico' }
};
const EXPOSURE_THRESHOLDS = [
  { min: 0.75, label: 'Bajo' },
  { min: 0.5, label: 'Medio' },
  { min: 0.25, label: 'Alto' },
  { min: 0, label: 'Crítico' }
];
const QUALITATIVE_THRESHOLDS = [
  { min: 0.75, label: 'Alta' },
  { min: 0.5, label: 'Media' },
  { min: 0, label: 'Baja' }
];
const EFFICIENCY_RATIO_THRESHOLDS = [
  { min: 1, label: 'Alta' },
  { min: 0.5, label: 'Media' },
  { min: 0, label: 'Baja' }
];
const CONTROL_DIMENSIONS = [
  {
    key: 'madurez',
    field: 'maturity',
    label: 'Madurez',
    options: [
      { value: 'declarado', label: 'Declarado' },
      { value: 'diseniado', label: 'Diseñado' },
      { value: 'implementado', label: 'Implementado' },
      { value: 'auditado', label: 'Auditado' }
    ]
  },
  {
    key: 'automatizacion',
    field: 'automation',
    label: 'Automatización',
    options: [
      { value: 'manual', label: 'Manual' },
      { value: 'semiautomatico', label: 'Semiautomático' },
      { value: 'automatico', label: 'Automático' }
    ]
  },
  {
    key: 'momento',
    field: 'timing',
    label: 'Momento',
    options: [
      { value: 'preventivo', label: 'Preventivo' },
      { value: 'detectivo', label: 'Detectivo' },
      { value: 'correctivo', label: 'Correctivo' }
    ]
  },
  {
    key: 'periodicidad',
    field: 'periodicity',
    label: 'Periodicidad',
    options: [
      { value: 'ocasional', label: 'Ocasional' },
      { value: 'periodico', label: 'Periódico' },
      { value: 'permanente', label: 'Permanente' }
    ]
  },
  {
    key: 'alcance',
    field: 'scope',
    label: 'Alcance funcional',
    options: [
      { value: 'especifico', label: 'Específico' },
      { value: 'general', label: 'General' }
    ]
  }
];
const EVIDENCE_OPTIONS = [
  { value: 'sinEvidencia', label: 'Sin evidencia' },
  { value: 'parcial', label: 'Parcial' },
  { value: 'suficiente', label: 'Suficiente' },
  { value: 'independienteOAditada', label: 'Independiente o auditada' }
];

const DEFAULT_FACTOR_EVIDENCIA = {
  sinEvidencia: 0,
  parcial: 0.5,
  suficiente: 0.85,
  independienteOAditada: 1
};

const state = {
  catalog: null,
  lookups: null,
  lastEvaluation: null
};

const architectureSelect = document.getElementById('architecture');
const environmentSelect = document.getElementById('environment');
const riskContainer = document.getElementById('riskContainer');
const scenarioSummary = document.getElementById('scenarioSummary');
const loadStatus = document.getElementById('loadStatus');
const calculateBtn = document.getElementById('calculateBtn');
const exportBtn = document.getElementById('exportBtn');
const demoSpaGoodBtn = document.getElementById('demoSpaGoodBtn');
const demoSpaBadBtn = document.getElementById('demoSpaBadBtn');
const demoM2mGoodBtn = document.getElementById('demoM2mGoodBtn');
const demoM2mBadBtn = document.getElementById('demoM2mBadBtn');
const demoGatewayGoodBtn = document.getElementById('demoGatewayGoodBtn');
const demoGatewayBadBtn = document.getElementById('demoGatewayBadBtn');
const demoClearBtn = document.getElementById('demoClearBtn');
const demoNotice = document.getElementById('demoNotice');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function optionsHtml(options, selectedValue) {
  return options.map((option) => `<option value="${escapeHtml(option.value)}"${option.value === selectedValue ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('');
}

function createOption(select, value, label) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;
  select.appendChild(option);
}

function parseNum(value) {
  const normalized = String(value ?? '').trim();
  if (!normalized) return 0;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function formatRatio(value) {
  return Number.isFinite(value) ? value.toFixed(2) : '∞';
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: state.catalog?.catalogoEvaluacion?.monedaCosto || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number.isFinite(value) ? value : 0);
}

function levelClass(label) {
  return String(label ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');
}

function qualitativeLabel(value, thresholds = QUALITATIVE_THRESHOLDS) {
  if (!Number.isFinite(value)) return thresholds[0].label;
  return thresholds.find((threshold) => value >= threshold.min)?.label || thresholds[thresholds.length - 1].label;
}

function getRiskLevel(probability, impact) {
  return RISK_LEVEL_MATRIX[probability]?.[impact] || 'Bajo';
}

function getExposureLevel(efficacy) {
  return EXPOSURE_THRESHOLDS.find((threshold) => efficacy >= threshold.min)?.label || 'Crítico';
}

function getReferenceText(referenceIds) {
  return (referenceIds || []).map((id) => {
    const reference = state.lookups.references.get(id);
    return reference ? `${reference.nombre} (${reference.id})` : id;
  }).join(' | ');
}

function buildLookups(catalog) {
  const escenarios = new Map(catalog.escenarios.map((item) => [item.id, item]));
  const riesgos = new Map(catalog.riesgosCatalogo.map((item) => [item.id, item]));
  const controles = new Map(catalog.controlesEsperados.map((item) => [item.id, item]));
  const relaciones = new Map(catalog.riesgoControles.map((item) => [item.id, item]));
  const references = new Map(catalog.referenciasTecnicas.map((item) => [item.id, item]));
  return { escenarios, riesgos, controles, relaciones, references };
}

function getActiveFilter() {
  return state.catalog?.filtros?.[architectureSelect.value] || null;
}

function getActiveRisks(filter) {
  return (filter?.riesgosCatalogoIds || []).map((riskId) => state.lookups.riesgos.get(riskId)).filter(Boolean);
}

function getRiskRelations(filter, riskId) {
  return (filter?.riesgoControlIds || []).map((relationId) => state.lookups.relaciones.get(relationId)).filter((relation) => relation?.riesgoId === riskId);
}

function buildControlCard(relation) {
  const control = state.lookups.controles.get(relation.controlId);
  const scoreMap = state.catalog.mapeoScoreInicial;
  const referenceText = getReferenceText(control.referencias);

  return `
    <div class="control-card" data-relation-id="${escapeHtml(relation.id)}" data-control-id="${escapeHtml(control.id)}">
      <div class="card-header">
        <h4>${escapeHtml(control.id)} - ${escapeHtml(control.nombre)}</h4>
        <span class="badge ${control.tipo === 'GLOBAL' ? 'badge-global' : 'badge-specific'}">${control.tipo === 'GLOBAL' ? 'Global' : 'Específico'}</span>
      </div>
      <p class="muted">Peso de mitigación: ${formatPercent(relation.pesoMitigacion)} · ${relation.obligatorio ? 'Control obligatorio' : 'Control complementario'}</p>
      <div class="readonly-block">
        <strong>Descripción del control:</strong><br />${escapeHtml(control.descripcion)}
      </div>
      <div class="readonly-block compact">
        <strong>Referencia normativa:</strong><br />${escapeHtml(referenceText)}
      </div>
      <div class="inline">
        <label>
          Costo del control (sugerido)
          <input type="number" min="0" step="0.01" name="controlCost" data-sync-control-field="controlCost" value="${escapeHtml(String(control.costoTotal.medio))}" />
        </label>
        ${CONTROL_DIMENSIONS.map((dimension) => `
          <label>
            ${escapeHtml(dimension.label)}
            <select name="${escapeHtml(dimension.field)}" data-sync-control-field="${escapeHtml(dimension.field)}">
              ${optionsHtml(dimension.options, dimension.options[0].value)}
            </select>
          </label>
        `).join('')}
        <label>
          Factor de evidencia
          <select name="evidenceFactor" data-sync-control-field="evidenceFactor">
            ${optionsHtml(EVIDENCE_OPTIONS, 'sinEvidencia')}
          </select>
        </label>
        <label>
          Evidencia encontrada
          <textarea name="evidenceFound" data-sync-control-field="evidenceFound" placeholder="Detalle de la evidencia observada"></textarea>
        </label>
        <label>
          Fuente de evidencia
          <input type="text" name="evidenceSource" data-sync-control-field="evidenceSource" placeholder="Ej. SIEM, repositorio, consola del IdP" />
        </label>
      </div>
      <p class="muted" data-kind="controlScore">Score del control: ${formatPercent(0)}</p>
      <p class="muted" data-kind="controlQualitative">Eficiencia: Baja · Eficacia: Baja · Efectividad: Baja</p>
    </div>
  `;
}

function buildRiskCard(risk) {
  const filter = getActiveFilter();
  const relations = getRiskRelations(filter, risk.id);

  return `
    <article class="risk-card" data-risk-id="${escapeHtml(risk.id)}">
      <div class="card-header">
        <h3>${escapeHtml(risk.id)} - ${escapeHtml(risk.nombre)}</h3>
        <span class="badge ${risk.tipo === 'GLOBAL' ? 'badge-global' : 'badge-specific'}">${risk.tipo === 'GLOBAL' ? 'Global' : 'Específico'}</span>
      </div>
      <div class="readonly-block">
        <strong>Descripción del riesgo:</strong><br />${escapeHtml(risk.descripcion)}
      </div>
      <div class="inline">
        <label>
          Activo en riesgo
          <input type="text" name="asset" placeholder="Ej. access_token, API Gateway" />
        </label>
        <label>
          Amenaza / causa
          <input type="text" name="threat" placeholder="Condición que puede materializar el riesgo" />
        </label>
        <label>
          Vulnerabilidad / condición habilitante
          <input type="text" name="vulnerability" placeholder="Debilidad observada" />
        </label>
        <label>
          Probabilidad
          <select name="probability">
            ${optionsHtml(PROBABILITY_OPTIONS, 'baja')}
          </select>
        </label>
        <label>
          Impacto
          <select name="impact">
            ${optionsHtml(IMPACT_OPTIONS, 'bajo')}
          </select>
        </label>
        <label>
          Nivel del riesgo identificado
          <span class="status-tag level-bajo" data-kind="riskLevel">Bajo</span>
        </label>
        <label>
          Lucro cesante estimado del activo
          <input type="number" min="0" step="0.01" name="businessLoss" placeholder="Ej. 15000" />
        </label>
      </div>
      <label>
        Hallazgo / brecha / observación
        <textarea name="finding" placeholder="Conclusión evaluativa del riesgo"></textarea>
      </label>
      <div class="controls-group">
        ${relations.map((relation) => buildControlCard(relation)).join('')}
      </div>
    </article>
  `;
}

function updateScenarioSummary() {
  const filter = getActiveFilter();
  if (!filter) {
    scenarioSummary.textContent = 'Seleccione una arquitectura para cargar el catálogo.';
    return;
  }

  const scenario = filter.escenario;
  scenarioSummary.innerHTML = `
    <strong>Escenario activo:</strong> ${escapeHtml(scenario.nombre)}<br />
    ${escapeHtml(scenario.descripcion)}<br />
    <span class="muted">Riesgos activos: ${filter.riesgosCatalogoIds.length} · Controles activos: ${filter.controlesEsperadosIds.length} · Relaciones: ${filter.riesgoControlIds.length}</span>
  `;
}

function updateRiskLevelTag(riskCard) {
  const probability = riskCard.querySelector('select[name="probability"]').value;
  const impact = riskCard.querySelector('select[name="impact"]').value;
  const level = getRiskLevel(probability, impact);
  const tag = riskCard.querySelector('[data-kind="riskLevel"]');
  tag.textContent = level;
  tag.className = `status-tag level-${levelClass(level)}`;
}

function getControlEvaluationFromCard(controlCard) {
  const scoreMap = state.catalog.mapeoScoreInicial;
  const dimensionValues = {};
  const dimensionLabels = {};
  const normalize01 = (value) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 0;
    const normalized = numeric > 1 ? numeric / 100 : numeric;
    return Math.max(0, Math.min(1, normalized));
  };

  const resolveDimensionScore = (dimensionKey, selectedValue) => {
    const map = scoreMap?.[dimensionKey] || {};
    if (Number.isFinite(map[selectedValue])) return map[selectedValue];

    // Handle catalogs that use feminine labels (declarada/diseniada/implementada).
    const normalized = String(selectedValue || '');
    if (normalized.endsWith('o')) {
      const alt = `${normalized.slice(0, -1)}a`;
      if (Number.isFinite(map[alt])) return map[alt];
    }
    if (normalized.endsWith('a')) {
      const alt = `${normalized.slice(0, -1)}o`;
      if (Number.isFinite(map[alt])) return map[alt];
    }

    return 0;
  };

  CONTROL_DIMENSIONS.forEach((dimension) => {
    const select = controlCard.querySelector(`select[name="${dimension.field}"]`);
    dimensionValues[dimension.key] = resolveDimensionScore(dimension.key, select.value);
    dimensionLabels[dimension.key] = select.options[select.selectedIndex].text;
  });

  const evidenceSelect = controlCard.querySelector('select[name="evidenceFactor"]');
  const evidenceMap = scoreMap?.factorEvidencia || DEFAULT_FACTOR_EVIDENCIA;
  const evidenceFactorRaw = Number.isFinite(evidenceMap[evidenceSelect.value])
    ? evidenceMap[evidenceSelect.value]
    : DEFAULT_FACTOR_EVIDENCIA[evidenceSelect.value] ?? 0;
  const baseScoreRaw = (
    SCORE_WEIGHTS.madurez * dimensionValues.madurez +
    SCORE_WEIGHTS.automatizacion * dimensionValues.automatizacion +
    SCORE_WEIGHTS.momento * dimensionValues.momento +
    SCORE_WEIGHTS.periodicidad * dimensionValues.periodicidad +
    SCORE_WEIGHTS.alcance * dimensionValues.alcance
  );
  const baseScore = normalize01(baseScoreRaw);
  const evidenceFactor = normalize01(evidenceFactorRaw);
  const scoreControl = baseScore * evidenceFactor;

  return {
    scoreControl,
    baseScore,
    evidenceFactor,
    dimensions: dimensionValues,
    dimensionLabels,
    evidenceFactorKey: evidenceSelect.value,
    evidenceFactorLabel: evidenceSelect.options[evidenceSelect.selectedIndex].text,
    efficiencyQl: qualitativeLabel(baseScore),
    efficacyQl: qualitativeLabel(evidenceFactor),
    effectivenessQl: qualitativeLabel(scoreControl)
  };
}

function updateControlScore(controlCard) {
  const evaluation = getControlEvaluationFromCard(controlCard);
  controlCard.querySelector('[data-kind="controlScore"]').textContent = `Score del control: ${formatPercent(evaluation.scoreControl)}`;
  controlCard.querySelector('[data-kind="controlQualitative"]').textContent = `Eficiencia: ${evaluation.efficiencyQl} · Eficacia: ${evaluation.efficacyQl} · Efectividad: ${evaluation.effectivenessQl}`;
}

function refreshDerivedState() {
  document.querySelectorAll('.risk-card').forEach((riskCard) => {
    updateRiskLevelTag(riskCard);
    riskCard.querySelectorAll('.control-card').forEach(updateControlScore);
  });
}

function renderRisks() {
  const filter = getActiveFilter();
  updateScenarioSummary();
  if (!filter) {
    riskContainer.innerHTML = '';
    return;
  }

  const risksHtml = getActiveRisks(filter).map((risk) => buildRiskCard(risk)).join('');
  riskContainer.innerHTML = risksHtml;
  refreshDerivedState();
}

function markDemoUpdatedField(field) {
  field.classList.add('demo-updated');
}

function clearDemoUpdatedMarks() {
  document.querySelectorAll('.demo-updated').forEach((field) => field.classList.remove('demo-updated'));
}

function setFieldValue(scopeNode, selector, value) {
  if (value === undefined || value === null) return;
  const field = scopeNode.querySelector(selector);
  if (!field) return;
  const nextValue = String(value);
  const previousValue = field.value;
  field.value = nextValue;
  if (previousValue !== nextValue) {
    markDemoUpdatedField(field);
    return;
  }
  markDemoUpdatedField(field);
}

function buildDefaultRiskDemoValues(riskId) {
  const riskMeta = state.lookups.riesgos.get(riskId);
  const isSpecific = riskMeta?.tipo === 'ESPECIFICO';
  return {
    asset: `Activo asociado a ${riskId}`,
    threat: `Amenaza principal identificada para ${riskMeta?.nombre || riskId}`,
    vulnerability: `Vulnerabilidad habilitante observada en ${riskId}`,
    probability: isSpecific ? 'media' : 'baja',
    impact: isSpecific ? 'alto' : 'medio',
    businessLoss: isSpecific ? 90000 : 60000,
    finding: `Hallazgo demostrativo para ${riskId}: se requiere fortalecer controles y evidencia operativa.`
  };
}

function buildDefaultControlDemoValues(controlId) {
  const controlMeta = state.lookups.controles.get(controlId);
  const suggestedCost = Number(controlMeta?.costoTotal?.medio || 0);
  return {
    controlCost: suggestedCost > 0 ? Math.round(suggestedCost * 1.1) : 1000,
    maturity: 'implementado',
    automation: 'semiautomatico',
    timing: 'detectivo',
    periodicity: 'periodico',
    scope: 'general',
    evidenceFactor: 'parcial',
    evidenceFound: `Evidencia demostrativa para ${controlId}: implementación parcial verificada por revisión técnica.`,
    evidenceSource: `Fuentes demo: bitácoras técnicas y revisión de configuración de ${controlId}`
  };
}

function applyRiskDemoValues(riskCard, values) {
  if (!values) return;
  const riskId = riskCard.dataset.riskId || 'RIESGO';
  const safeAsset = String(values.asset ?? '').trim() || `Activo asociado a ${riskId}`;
  setFieldValue(riskCard, 'input[name="asset"]', safeAsset);
  setFieldValue(riskCard, 'input[name="threat"]', values.threat);
  setFieldValue(riskCard, 'input[name="vulnerability"]', values.vulnerability);
  setFieldValue(riskCard, 'select[name="probability"]', values.probability);
  setFieldValue(riskCard, 'select[name="impact"]', values.impact);
  setFieldValue(riskCard, 'input[name="businessLoss"]', values.businessLoss);
  setFieldValue(riskCard, 'textarea[name="finding"]', values.finding);
  updateRiskLevelTag(riskCard);
}

function applyControlDemoValues(controlCard, values) {
  if (!values) return;
  setFieldValue(controlCard, 'input[name="controlCost"]', values.controlCost);
  setFieldValue(controlCard, 'select[name="maturity"]', values.maturity);
  setFieldValue(controlCard, 'select[name="automation"]', values.automation);
  setFieldValue(controlCard, 'select[name="timing"]', values.timing);
  setFieldValue(controlCard, 'select[name="periodicity"]', values.periodicity);
  setFieldValue(controlCard, 'select[name="scope"]', values.scope);
  setFieldValue(controlCard, 'select[name="evidenceFactor"]', values.evidenceFactor);
  setFieldValue(controlCard, 'textarea[name="evidenceFound"]', values.evidenceFound);
  setFieldValue(controlCard, 'input[name="evidenceSource"]', values.evidenceSource);
  updateControlScore(controlCard);
}

function showDemoMessage(message) {
  demoNotice.textContent = message;
  demoNotice.style.display = 'block';
}

function buildDemoPayloadMap(demoPayloadData) {
  if (!demoPayloadData || typeof demoPayloadData !== 'object') return null;

  if (demoPayloadData.demosPlanos && typeof demoPayloadData.demosPlanos === 'object') {
    return demoPayloadData.demosPlanos;
  }

  if (demoPayloadData.demos && typeof demoPayloadData.demos === 'object') {
    return demoPayloadData.demos;
  }

  if (demoPayloadData.demosAgrupados && typeof demoPayloadData.demosAgrupados === 'object') {
    const flattened = {};
    Object.entries(demoPayloadData.demosAgrupados).forEach(([scenarioId, qualityMap]) => {
      if (!qualityMap || typeof qualityMap !== 'object') return;
      Object.entries(qualityMap).forEach(([quality, payload]) => {
        const key = `${scenarioId}_${String(quality || '').toUpperCase()}`;
        flattened[key] = {
          ...(payload || {}),
          scenarioId: payload?.scenarioId || scenarioId,
          quality: payload?.quality || quality
        };
      });
    });
    return flattened;
  }

  return (demoPayloadData.metadata || demoPayloadData.fieldLabels)
    ? null
    : demoPayloadData;
}

function applyDemoToRenderedForm(architectureId, payload) {
  const activeFilter = getActiveFilter();
  if (!activeFilter) return { applied: false, filledFields: 0 };

  const riskCards = Array.from(document.querySelectorAll('.risk-card'));
  if (!riskCards.length) return { applied: false, filledFields: 0 };

  const allowedRiskIds = new Set(activeFilter.riesgosCatalogoIds || []);
  const riskValues = payload.risks || {};
  const controlValues = payload.controls || {};

  const updatedBefore = document.querySelectorAll('.demo-updated').length;

  riskCards.forEach((riskCard) => {
    const riskId = riskCard.dataset.riskId;
    if (allowedRiskIds.has(riskId)) {
      const mergedRiskValues = {
        ...buildDefaultRiskDemoValues(riskId),
        ...(riskValues[riskId] || {})
      };
      applyRiskDemoValues(riskCard, mergedRiskValues);
    }

    riskCard.querySelectorAll('.control-card').forEach((controlCard) => {
      const controlId = controlCard.dataset.controlId;
      const mergedControlValues = {
        ...buildDefaultControlDemoValues(controlId),
        ...(controlValues[controlId] || {})
      };
      applyControlDemoValues(controlCard, mergedControlValues);
    });
  });

  const updatedAfter = document.querySelectorAll('.demo-updated').length;
  return {
    applied: true,
    filledFields: Math.max(0, updatedAfter - updatedBefore)
  };
}

function loadDemoData(demoKey) {
  if (!state.catalog || !state.lookups) return;
  const payload = DEMO_PAYLOADS[demoKey];
  if (!payload) return;

  const architectureId = payload.scenarioId || payload.architectureId;
  if (!architectureId) {
    showDemoMessage(`No se encontró escenario asociado para el demo ${demoKey}.`);
    return;
  }

  clearDemoUpdatedMarks();
  const context = payload.context || {};
  setFieldValue(document, '#organization', context.organization);
  setFieldValue(document, '#evaluator', context.evaluator);
  setFieldValue(document, '#environment', context.environment);
  setFieldValue(document, '#systemName', context.systemName);
  setFieldValue(document, '#scopeNotes', context.scopeNotes);

  architectureSelect.value = architectureId;
  architectureSelect.dispatchEvent(new Event('change'));

  let attempts = 0;
  const maxAttempts = 6;

  const applyWithRetry = () => {
    attempts += 1;
    const result = applyDemoToRenderedForm(architectureId, payload);
    if (!result.applied && attempts < maxAttempts) {
      requestAnimationFrame(applyWithRetry);
      return;
    }

    refreshDerivedState();
    const evaluation = collectEvaluation();
    state.lastEvaluation = evaluation;
    drawMetrics(evaluation.metrics);
    drawRiskResults(evaluation.risks);

    const scenarioName = state.lookups.escenarios.get(architectureId)?.nombre || architectureId;
    const demoLabel = payload.label || demoKey;
    const suffix = result.applied
      ? `Campos diligenciados y resaltados: ${result.filledFields}.`
      : 'No fue posible aplicar el demo en esta carga; intente nuevamente.';
    showDemoMessage(`${DEMO_SOURCE_MESSAGE} Escenario cargado: ${scenarioName}. Demo aplicado: ${demoLabel}. ${suffix}`);
  };

  requestAnimationFrame(applyWithRetry);
}

function clearEvaluationForm() {
  clearDemoUpdatedMarks();

  setFieldValue(document, '#organization', '');
  setFieldValue(document, '#evaluator', '');
  setFieldValue(document, '#systemName', '');
  setFieldValue(document, '#scopeNotes', '');
  if (environmentSelect.options.length > 0) {
    environmentSelect.selectedIndex = 0;
  }

  renderRisks();
  state.lastEvaluation = null;
  drawRiskResults([]);
  drawMetrics({
    eficienciaCuantitativa: 0,
    eficaciaCuantitativa: 0,
    eficienciaCualitativa: '-',
    eficaciaCualitativa: '-'
  });

  showDemoMessage('Formulario limpiado. Puede cargar un demo o diligenciar manualmente.');
}

function syncControlField(sourceElement) {
  const controlCard = sourceElement.closest('.control-card');
  if (!controlCard) return;
  const field = sourceElement.dataset.syncControlField;
  if (!field) return;
  const controlId = controlCard.dataset.controlId;
  document.querySelectorAll(`.control-card[data-control-id="${controlId}"] [data-sync-control-field="${field}"]`).forEach((element) => {
    if (element === sourceElement) return;
    if (element.value !== sourceElement.value) {
      element.value = sourceElement.value;
    }
  });
}

function collectEvaluation() {
  const filter = getActiveFilter();
  const risks = Array.from(document.querySelectorAll('.risk-card')).map((riskCard) => {
    const riskId = riskCard.dataset.riskId;
    const riskMeta = state.lookups.riesgos.get(riskId);
    const probabilitySelect = riskCard.querySelector('select[name="probability"]');
    const impactSelect = riskCard.querySelector('select[name="impact"]');
    const probability = probabilitySelect.value;
    const impact = impactSelect.value;
    const riskLevel = getRiskLevel(probability, impact);

    const controls = Array.from(riskCard.querySelectorAll('.control-card')).map((controlCard) => {
      const relation = state.lookups.relaciones.get(controlCard.dataset.relationId);
      const controlMeta = state.lookups.controles.get(controlCard.dataset.controlId);
      const controlEval = getControlEvaluationFromCard(controlCard);
      const cost = parseNum(controlCard.querySelector('input[name="controlCost"]').value) || controlMeta.costoTotal.medio;
      return {
        relationId: relation.id,
        riskId,
        controlId: controlMeta.id,
        controlName: controlMeta.nombre,
        controlDescription: controlMeta.descripcion,
        references: controlMeta.referencias,
        referenceText: getReferenceText(controlMeta.referencias),
        cost,
        suggestedCost: controlMeta.costoTotal.medio,
        maturity: controlEval.dimensionLabels.madurez,
        automation: controlEval.dimensionLabels.automatizacion,
        timing: controlEval.dimensionLabels.momento,
        periodicity: controlEval.dimensionLabels.periodicidad,
        scope: controlEval.dimensionLabels.alcance,
        evidenceFactor: controlEval.evidenceFactorLabel,
        evidenceFactorKey: controlEval.evidenceFactorKey,
        evidenceFound: controlCard.querySelector('textarea[name="evidenceFound"]').value.trim(),
        evidenceSource: controlCard.querySelector('input[name="evidenceSource"]').value.trim(),
        scoreControl: controlEval.scoreControl,
        baseScore: controlEval.baseScore,
        aporteEficacia: controlEval.scoreControl * relation.pesoMitigacion,
        pesoMitigacion: relation.pesoMitigacion,
        obligatorio: relation.obligatorio,
        efficiencyQl: controlEval.efficiencyQl,
        efficacyQl: controlEval.efficacyQl,
        effectivenessQl: controlEval.effectivenessQl,
        assignedCost: 0
      };
    });

    return {
      riskId,
      riskName: riskMeta.nombre,
      riskDescription: riskMeta.descripcion,
      riskType: riskMeta.tipo,
      asset: riskCard.querySelector('input[name="asset"]').value.trim(),
      threat: riskCard.querySelector('input[name="threat"]').value.trim(),
      vulnerability: riskCard.querySelector('input[name="vulnerability"]').value.trim(),
      probability: probabilitySelect.options[probabilitySelect.selectedIndex].text,
      impact: impactSelect.options[impactSelect.selectedIndex].text,
      probabilityKey: probability,
      impactKey: impact,
      riskLevel,
      businessLoss: parseNum(riskCard.querySelector('input[name="businessLoss"]').value),
      finding: riskCard.querySelector('textarea[name="finding"]').value.trim(),
      controls
    };
  });

  const totalWeightByControlId = new Map();
  (filter?.riesgoControlIds || []).forEach((relationId) => {
    const relation = state.lookups.relaciones.get(relationId);
    totalWeightByControlId.set(relation.controlId, (totalWeightByControlId.get(relation.controlId) || 0) + relation.pesoMitigacion);
  });

  risks.forEach((risk) => {
    risk.controls.forEach((control) => {
      const totalWeight = totalWeightByControlId.get(control.controlId) || control.pesoMitigacion || 1;
      control.assignedCost = totalWeight > 0 ? (control.cost * control.pesoMitigacion) / totalWeight : 0;
    });

    const totalWeight = risk.controls.reduce((sum, control) => sum + control.pesoMitigacion, 0);
    const eficaciaFrenteAlRiesgo = totalWeight > 0
      ? risk.controls.reduce((sum, control) => sum + (control.pesoMitigacion * control.scoreControl), 0) / totalWeight
      : 0;
    const costoAsignadoTotal = risk.controls.reduce((sum, control) => sum + control.assignedCost, 0);
    const beneficioMitigacionEstimado = risk.businessLoss * eficaciaFrenteAlRiesgo;
    const eficienciaFrenteAlRiesgo = costoAsignadoTotal > 0
      ? beneficioMitigacionEstimado / costoAsignadoTotal
      : (beneficioMitigacionEstimado > 0 ? Number.POSITIVE_INFINITY : 0);

    Object.assign(risk, {
      eficaciaFrenteAlRiesgo,
      costoAsignadoTotal,
      beneficioMitigacionEstimado,
      eficienciaFrenteAlRiesgo,
      nivelExposicionObservado: getExposureLevel(eficaciaFrenteAlRiesgo)
    });
  });

  const riskCount = risks.length || 1;
  const efficiencyValues = risks.map((risk) => risk.eficienciaFrenteAlRiesgo);
  const eficienciaCuantitativa = efficiencyValues.some((value) => !Number.isFinite(value))
    ? Number.POSITIVE_INFINITY
    : efficiencyValues.reduce((sum, value) => sum + value, 0) / riskCount;
  const eficaciaCuantitativa = risks.reduce((sum, risk) => sum + risk.eficaciaFrenteAlRiesgo, 0) / riskCount;

  return {
    context: {
      organization: document.getElementById('organization').value.trim(),
      evaluator: document.getElementById('evaluator').value.trim(),
      environment: environmentSelect.value,
      systemName: document.getElementById('systemName').value.trim(),
      architecture: state.lookups.escenarios.get(architectureSelect.value)?.nombre || '',
      architectureId: architectureSelect.value,
      scopeNotes: document.getElementById('scopeNotes').value.trim(),
      date: new Date().toISOString(),
      catalogVersion: state.catalog.catalogoEvaluacion.version,
      catalogId: state.catalog.catalogoEvaluacion.id
    },
    metrics: {
      eficienciaCuantitativa,
      eficaciaCuantitativa,
      eficienciaCualitativa: qualitativeLabel(eficienciaCuantitativa, EFFICIENCY_RATIO_THRESHOLDS),
      eficaciaCualitativa: qualitativeLabel(eficaciaCuantitativa)
    },
    risks
  };
}

function drawMetrics(metrics) {
  document.getElementById('metricEfficiencyQ').textContent = formatRatio(metrics.eficienciaCuantitativa);
  document.getElementById('metricEfficacyQ').textContent = formatPercent(metrics.eficaciaCuantitativa);
  document.getElementById('metricEfficiencyQl').textContent = metrics.eficienciaCualitativa;
  document.getElementById('metricEfficacyQl').textContent = metrics.eficaciaCualitativa;
}

function drawRiskResults(risks) {
  const tbody = document.getElementById('riskResultsBody');
  if (!risks.length) {
    tbody.innerHTML = '<tr><td colspan="7">No hay riesgos cargados.</td></tr>';
    return;
  }

  tbody.innerHTML = risks.map((risk) => `
    <tr>
      <td>${escapeHtml(risk.riskId)} / ${escapeHtml(risk.riskName)}</td>
      <td><span class="status-tag level-${levelClass(risk.riskLevel)}">${escapeHtml(risk.riskLevel)}</span></td>
      <td>${formatPercent(risk.eficaciaFrenteAlRiesgo)}</td>
      <td>${formatRatio(risk.eficienciaFrenteAlRiesgo)}</td>
      <td>${formatCurrency(risk.costoAsignadoTotal)}</td>
      <td>${formatCurrency(risk.beneficioMitigacionEstimado)}</td>
      <td><span class="status-tag level-${levelClass(risk.nivelExposicionObservado)}">${escapeHtml(risk.nivelExposicionObservado)}</span></td>
    </tr>
  `).join('');
}

function xmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function rowsToWorksheetXml(rows) {
  const rowXml = rows.map((row) => `<Row>${row.map((cell) => `<Cell><Data ss:Type="String">${xmlEscape(cell)}</Data></Cell>`).join('')}</Row>`).join('');
  return `<Table>${rowXml}</Table>`;
}

function exportToExcel(data) {
  const summaryRows = [
    ['Organización', data.context.organization],
    ['Evaluador', data.context.evaluator],
    ['Ambiente', data.context.environment],
    ['Sistema evaluado', data.context.systemName],
    ['Arquitectura', data.context.architecture],
    ['Notas de alcance', data.context.scopeNotes],
    ['Fecha', data.context.date],
    ['Catálogo', data.context.catalogId],
    ['Versión del catálogo', data.context.catalogVersion],
    ['Eficiencia cuantitativa global (ratio)', formatRatio(data.metrics.eficienciaCuantitativa)],
    ['Eficacia cuantitativa global', formatPercent(data.metrics.eficaciaCuantitativa)],
    ['Eficiencia cualitativa global', data.metrics.eficienciaCualitativa],
    ['Eficacia cualitativa global', data.metrics.eficaciaCualitativa]
  ];

  const riskRows = [[
    'Riesgo ID',
    'Nombre',
    'Activo en riesgo',
    'Amenaza / causa',
    'Vulnerabilidad',
    'Probabilidad',
    'Impacto',
    'Nivel de riesgo identificado',
    'Lucro cesante',
    'Hallazgo / brecha / observación'
  ]];

  data.risks.forEach((risk) => {
    riskRows.push([
      risk.riskId,
      risk.riskName,
      risk.asset,
      risk.threat,
      risk.vulnerability,
      risk.probability,
      risk.impact,
      risk.riskLevel,
      risk.businessLoss,
      risk.finding
    ]);
  });

  const controlRows = [[
    'Riesgo ID',
    'Control ID',
    'Control',
    'Costo ingresado',
    'Costo asignado',
    'Madurez',
    'Automatización',
    'Momento',
    'Periodicidad',
    'Alcance funcional',
    'Factor de evidencia',
    'Score del control',
    'Evidencia encontrada',
    'Fuente de evidencia',
    'Referencia normativa',
    'Eficiencia cualitativa',
    'Eficacia cualitativa',
    'Efectividad cualitativa'
  ]];

  data.risks.forEach((risk) => {
    risk.controls.forEach((control) => {
      controlRows.push([
        risk.riskId,
        control.controlId,
        control.controlName,
        control.cost,
        control.assignedCost,
        control.maturity,
        control.automation,
        control.timing,
        control.periodicity,
        control.scope,
        control.evidenceFactor,
        control.scoreControl,
        control.evidenceFound,
        control.evidenceSource,
        control.referenceText,
        control.efficiencyQl,
        control.efficacyQl,
        control.effectivenessQl
      ]);
    });
  });

  const riskResultRows = [[
    'Riesgo ID',
    'Nombre',
    'Nivel de riesgo identificado',
    'Eficacia frente al riesgo',
    'Eficiencia frente al riesgo',
    'Costo asignado total',
    'Beneficio de mitigación estimado',
    'Nivel de exposición observado'
  ]];

  data.risks.forEach((risk) => {
    riskResultRows.push([
      risk.riskId,
      risk.riskName,
      risk.riskLevel,
      formatPercent(risk.eficaciaFrenteAlRiesgo),
      formatRatio(risk.eficienciaFrenteAlRiesgo),
      risk.costoAsignadoTotal,
      risk.beneficioMitigacionEstimado,
      risk.nivelExposicionObservado
    ]);
  });

  const workbookXml = `<?xml version="1.0" encoding="UTF-8"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
  <Worksheet ss:Name="Resumen">${rowsToWorksheetXml(summaryRows)}</Worksheet>
  <Worksheet ss:Name="Riesgos">${rowsToWorksheetXml(riskRows)}</Worksheet>
  <Worksheet ss:Name="Controles">${rowsToWorksheetXml(controlRows)}</Worksheet>
  <Worksheet ss:Name="Resultados riesgo">${rowsToWorksheetXml(riskResultRows)}</Worksheet>
</Workbook>`;

  const blob = new Blob([workbookXml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const safeOrganization = (data.context.organization || 'organizacion').replace(/[^a-zA-Z0-9_-]/g, '_');
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[-:]/g, '').replace('T', '-');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `informe-evaluacion-oauth2-oidc-${safeOrganization}-${timestamp}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function setButtonsEnabled(enabled) {
  calculateBtn.disabled = !enabled;
  exportBtn.disabled = !enabled;
  demoSpaGoodBtn.disabled = !enabled;
  demoSpaBadBtn.disabled = !enabled;
  demoM2mGoodBtn.disabled = !enabled;
  demoM2mBadBtn.disabled = !enabled;
  demoGatewayGoodBtn.disabled = !enabled;
  demoGatewayBadBtn.disabled = !enabled;
  demoClearBtn.disabled = !enabled;
}

async function initializeApp() {
  setButtonsEnabled(false);
  loadStatus.textContent = 'Cargando catálogo maestro y datos demo...';
  environmentSelect.innerHTML = '';
  ENVIRONMENT_OPTIONS.forEach((option) => createOption(environmentSelect, option.value, option.label));

  try {
    const [catalogResponse, demoPayloadsResponse] = await Promise.all([
      fetch(CATALOG_URL),
      fetch(DEMO_PAYLOADS_URL)
    ]);

    if (!catalogResponse.ok) {
      throw new Error(`No fue posible cargar ${CATALOG_URL} (${catalogResponse.status} ${catalogResponse.statusText})`);
    }

    if (!demoPayloadsResponse.ok) {
      throw new Error(`No fue posible cargar ${DEMO_PAYLOADS_URL} (${demoPayloadsResponse.status} ${demoPayloadsResponse.statusText})`);
    }

    state.catalog = await catalogResponse.json();
    const demoPayloadData = await demoPayloadsResponse.json();
    const demoPayloadMap = buildDemoPayloadMap(demoPayloadData);
    if (!demoPayloadMap || typeof demoPayloadMap !== 'object') {
      throw new Error(`Estructura inválida en ${DEMO_PAYLOADS_URL}: se esperaba demosPlanos, demosAgrupados o un mapa plano de demos.`);
    }
    Object.keys(DEMO_PAYLOADS).forEach((key) => delete DEMO_PAYLOADS[key]);
    Object.assign(DEMO_PAYLOADS, demoPayloadMap);

    state.lookups = buildLookups(state.catalog);
    architectureSelect.innerHTML = '';
    state.catalog.escenarios.forEach((scenario) => createOption(architectureSelect, scenario.id, scenario.nombre));
    renderRisks();
    demoNotice.style.display = 'none';
    loadStatus.textContent = `Catálogo ${state.catalog.catalogoEvaluacion.id} v${state.catalog.catalogoEvaluacion.version} cargado.`;
    setButtonsEnabled(true);
  } catch (error) {
    console.error(error);
    loadStatus.textContent = `Error cargando catálogo: ${error.message}`;
    scenarioSummary.textContent = 'No se pudo inicializar la evaluación.';
  }
}

architectureSelect.addEventListener('change', () => {
  renderRisks();
  state.lastEvaluation = null;
  demoNotice.style.display = 'none';
  drawRiskResults([]);
  drawMetrics({
    eficienciaCuantitativa: 0,
    eficaciaCuantitativa: 0,
    eficienciaCualitativa: '-',
    eficaciaCualitativa: '-'
  });
});

riskContainer.addEventListener('change', (event) => {
  if (event.target.matches('[data-sync-control-field]')) {
    syncControlField(event.target);
  }

  const riskCard = event.target.closest('.risk-card');
  if (riskCard && (event.target.name === 'probability' || event.target.name === 'impact')) {
    updateRiskLevelTag(riskCard);
  }

  const controlCard = event.target.closest('.control-card');
  if (controlCard) {
    updateControlScore(controlCard);
    const controlId = controlCard.dataset.controlId;
    document.querySelectorAll(`.control-card[data-control-id="${controlId}"]`).forEach(updateControlScore);
  }
});

riskContainer.addEventListener('input', (event) => {
  if (event.target.matches('[data-sync-control-field]')) {
    syncControlField(event.target);
    const controlId = event.target.closest('.control-card')?.dataset.controlId;
    if (controlId) {
      document.querySelectorAll(`.control-card[data-control-id="${controlId}"]`).forEach(updateControlScore);
    }
  }
});

document.getElementById('calculateBtn').addEventListener('click', () => {
  const evaluation = collectEvaluation();
  state.lastEvaluation = evaluation;
  drawMetrics(evaluation.metrics);
  drawRiskResults(evaluation.risks);
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const evaluation = collectEvaluation();
  state.lastEvaluation = evaluation;
  drawMetrics(evaluation.metrics);
  drawRiskResults(evaluation.risks);
  exportToExcel(evaluation);
});

demoSpaGoodBtn.addEventListener('click', () => loadDemoData('SPA_BFF_IDP_BUENO'));
demoSpaBadBtn.addEventListener('click', () => loadDemoData('SPA_BFF_IDP_MALO'));
demoM2mGoodBtn.addEventListener('click', () => loadDemoData('M2M_AS_RS_BUENO'));
demoM2mBadBtn.addEventListener('click', () => loadDemoData('M2M_AS_RS_MALO'));
demoGatewayGoodBtn.addEventListener('click', () => loadDemoData('API_GATEWAY_FEDERADO_BUENO'));
demoGatewayBadBtn.addEventListener('click', () => loadDemoData('API_GATEWAY_FEDERADO_MALO'));
demoClearBtn.addEventListener('click', clearEvaluationForm);

initializeApp();


