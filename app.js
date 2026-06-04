const ARCHITECTURES = [
  {
    id: 'arquitectura1',
    name: 'Arquitectura 1: SPA estática con BFF e IdP corporativo usando OAuth 2.0/OIDC',
    specificRisks: [
      {
        code: 'A1-R1',
        name: 'Exposición de tokens en navegador y canal SPA-BFF',
        controls: ['Uso obligatorio de BFF para tokens', 'Cookies HttpOnly/Secure/SameSite', 'PKCE en Authorization Code Flow']
      },
      {
        code: 'A1-R2',
        name: 'CSRF y secuestro de sesión en frontend',
        controls: ['Protección CSRF en BFF', 'Rotación y expiración corta de sesión', 'Cabeceras de seguridad y validación de origen']
      }
    ]
  },
  {
    id: 'arquitectura2',
    name: 'Arquitectura 2: Comunicación M2M donde el AS también actúa como RS',
    specificRisks: [
      {
        code: 'A2-R1',
        name: 'Sobrecarga de privilegios en clientes confidenciales',
        controls: ['Scopes mínimos por cliente', 'Autenticación de cliente fuerte (mTLS o private_key_jwt)', 'Rotación periódica de credenciales']
      },
      {
        code: 'A2-R2',
        name: 'Fallas de segregación al compartir rol AS/RS',
        controls: ['Separación lógica de responsabilidades', 'Auditoría de emisión y consumo de tokens', 'Validación estricta de aud/iss/exp']
      }
    ]
  },
  {
    id: 'arquitectura3',
    name: 'Arquitectura 3: API Gateway federado con AS corporativo y posible intercambio de tokens',
    specificRisks: [
      {
        code: 'A3-R1',
        name: 'Propagación insegura/intercambio incorrecto de tokens',
        controls: ['Token exchange controlado por política', 'Downscoping obligatorio de privilegios', 'Trazabilidad end-to-end de identidad']
      },
      {
        code: 'A3-R2',
        name: 'Validación inconsistente de tokens en gateway y servicios',
        controls: ['Validación centralizada en gateway', 'Sincronización de JWKS y políticas de cache', 'Revalidación contextual en microservicios críticos']
      }
    ]
  }
];

const GLOBAL_RISKS = [
  {
    code: 'G-R1',
    name: 'Robo o fuga de tokens OAuth/OIDC',
    controls: ['TLS de extremo a extremo', 'Expiración corta de access token', 'Rotación/revocación de tokens']
  },
  {
    code: 'G-R2',
    name: 'Escalamiento de privilegios por scopes excesivos',
    controls: ['Modelo de mínimo privilegio', 'Revisión periódica de scopes', 'Autorización contextual por recurso']
  },
  {
    code: 'G-R3',
    name: 'Configuración insegura del Authorization Server/IdP',
    controls: ['Hardening y baseline seguro', 'MFA para administradores', 'Monitoreo continuo y alertamiento']
  }
];

const MAPS = {
  maturity: { Diseñada: 0, Declarada: 25, Implementada: 75, Auditada: 100 },
  automation: { Manual: 0, 'Semi-automático': 50, Automático: 100 },
  timing: { Preventivo: 100, Detectivo: 50, Correctivo: 0 },
  periodicity: { Ocasional: 25, Periódico: 75, Permanente: 100 },
  scope: { Específico: 25, General: 100 }
};

const WEIGHTS = {
  maturity: 0.5,
  automation: 0.2,
  timing: 0.1,
  periodicity: 0.1,
  scope: 0.1
};
const THRESHOLD_NOT_EFFECTIVE = 40;
const THRESHOLD_PARTIAL_EFFECTIVE = 70;

const architectureSelect = document.getElementById('architecture');
const riskContainer = document.getElementById('riskContainer');

function createOption(select, value, label) {
  const opt = document.createElement('option');
  opt.value = value;
  opt.textContent = label;
  select.appendChild(opt);
}

ARCHITECTURES.forEach((a) => createOption(architectureSelect, a.id, a.name));

function dimensionSelect(name, options) {
  const select = document.createElement('select');
  select.name = name;
  options.forEach((option) => createOption(select, option, option));
  return select;
}

function buildControlCard(riskCode, controlName, index) {
  const control = document.createElement('div');
  control.className = 'control-card';
  control.dataset.riskCode = riskCode;
  control.dataset.controlName = controlName;
  control.dataset.controlIndex = String(index);

  const title = document.createElement('h4');
  title.textContent = `Control: ${controlName}`;
  control.appendChild(title);

  const wrap = document.createElement('div');
  wrap.className = 'inline';

  const costInput = document.createElement('input');
  costInput.type = 'number';
  costInput.min = '0';
  costInput.step = '0.01';
  costInput.name = 'controlCost';
  costInput.placeholder = 'Costo del control';

  const evidenceInput = document.createElement('textarea');
  evidenceInput.name = 'controlEvidence';
  evidenceInput.placeholder = 'Estado y evidencia del control';

  const maturity = dimensionSelect('maturity', Object.keys(MAPS.maturity));
  const automation = dimensionSelect('automation', Object.keys(MAPS.automation));
  const timing = dimensionSelect('timing', Object.keys(MAPS.timing));
  const periodicity = dimensionSelect('periodicity', Object.keys(MAPS.periodicity));
  const scope = dimensionSelect('scope', Object.keys(MAPS.scope));

  [
    ['Costo del control', costInput],
    ['Madurez', maturity],
    ['Automatización', automation],
    ['Momento', timing],
    ['Periodicidad', periodicity],
    ['Alcance funcional', scope],
    ['Evidencia', evidenceInput]
  ].forEach(([labelText, element]) => {
    const wrapper = document.createElement('label');
    wrapper.textContent = labelText;
    wrapper.appendChild(element);
    wrap.appendChild(wrapper);
  });

  const scoreOut = document.createElement('p');
  scoreOut.className = 'muted';
  scoreOut.dataset.kind = 'controlScore';
  scoreOut.textContent = 'Score del control: -';

  control.appendChild(wrap);
  control.appendChild(scoreOut);
  return control;
}

function buildRiskCard(risk, type) {
  const card = document.createElement('div');
  card.className = 'risk-card';
  card.dataset.riskCode = risk.code;

  const h3 = document.createElement('h3');
  h3.textContent = `${risk.code} - ${risk.name}`;
  card.appendChild(h3);

  const kind = document.createElement('p');
  kind.className = 'muted';
  kind.textContent = `Tipo de riesgo: ${type === 'global' ? 'Global' : 'Específico de arquitectura'}`;
  card.appendChild(kind);

  const section = document.createElement('div');
  section.className = 'inline';

  const asset = document.createElement('input');
  asset.name = 'asset';
  asset.placeholder = 'Activo en riesgo';

  const threat = document.createElement('input');
  threat.name = 'threat';
  threat.placeholder = 'Amenaza';

  const likelihood = document.createElement('input');
  likelihood.type = 'number';
  likelihood.name = 'likelihood';
  likelihood.min = '1';
  likelihood.max = '5';
  likelihood.step = '1';
  likelihood.placeholder = 'Probabilidad (1-5)';

  const impact = document.createElement('input');
  impact.type = 'number';
  impact.name = 'impact';
  impact.min = '1';
  impact.max = '5';
  impact.step = '1';
  impact.placeholder = 'Impacto (1-5)';

  const businessLoss = document.createElement('input');
  businessLoss.type = 'number';
  businessLoss.name = 'businessLoss';
  businessLoss.min = '0';
  businessLoss.step = '0.01';
  businessLoss.placeholder = 'Lucro cesante estimado del activo';

  [
    ['Activo en riesgo', asset],
    ['Amenaza', threat],
    ['Probabilidad', likelihood],
    ['Impacto', impact],
    ['Lucro cesante del activo', businessLoss]
  ].forEach(([labelText, element]) => {
    const wrapper = document.createElement('label');
    wrapper.textContent = labelText;
    wrapper.appendChild(element);
    section.appendChild(wrapper);
  });

  card.appendChild(section);

  risk.controls.forEach((controlName, idx) => {
    card.appendChild(buildControlCard(risk.code, controlName, idx));
  });

  return card;
}

function renderRisks() {
  riskContainer.innerHTML = '';
  const selectedArchitecture = ARCHITECTURES.find((a) => a.id === architectureSelect.value);
  const allRisks = [
    ...GLOBAL_RISKS.map((risk) => ({ ...risk, type: 'global' })),
    ...selectedArchitecture.specificRisks.map((risk) => ({ ...risk, type: 'specific' }))
  ];
  allRisks.forEach((risk) => riskContainer.appendChild(buildRiskCard(risk, risk.type)));
}

architectureSelect.addEventListener('change', renderRisks);
renderRisks();

function parseNum(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function controlScore(dimensions) {
  return (
    dimensions.maturity * WEIGHTS.maturity +
    dimensions.automation * WEIGHTS.automation +
    dimensions.timing * WEIGHTS.timing +
    dimensions.periodicity * WEIGHTS.periodicity +
    dimensions.scope * WEIGHTS.scope
  );
}

function classifyByThreshold(value) {
  if (value < THRESHOLD_NOT_EFFECTIVE) return 'none';
  if (value < THRESHOLD_PARTIAL_EFFECTIVE) return 'partial';
  return 'effective';
}

function classifyEfficiency(value) {
  const level = classifyByThreshold(value);
  if (level === 'none') return 'No es eficiente';
  if (level === 'partial') return 'Es parcialmente eficiente';
  return 'Es eficiente';
}

function classifyEfficacy(value) {
  const level = classifyByThreshold(value);
  if (level === 'none') return 'No es eficaz';
  if (level === 'partial') return 'Es parcialmente eficaz';
  return 'Es eficaz';
}

function collectEvaluation() {
  const riskCards = Array.from(document.querySelectorAll('.risk-card'));
  const risks = riskCards.map((card) => {
    const riskCode = card.dataset.riskCode;
    const asset = card.querySelector('input[name="asset"]').value.trim();
    const threat = card.querySelector('input[name="threat"]').value.trim();
    const likelihood = parseNum(card.querySelector('input[name="likelihood"]').value);
    const impact = parseNum(card.querySelector('input[name="impact"]').value);
    const businessLoss = parseNum(card.querySelector('input[name="businessLoss"]').value);

    const controls = Array.from(card.querySelectorAll('.control-card')).map((controlCard) => {
      const maturity = controlCard.querySelector('select[name="maturity"]').value;
      const automation = controlCard.querySelector('select[name="automation"]').value;
      const timing = controlCard.querySelector('select[name="timing"]').value;
      const periodicity = controlCard.querySelector('select[name="periodicity"]').value;
      const scope = controlCard.querySelector('select[name="scope"]').value;
      const dimensions = {
        maturity: MAPS.maturity[maturity],
        automation: MAPS.automation[automation],
        timing: MAPS.timing[timing],
        periodicity: MAPS.periodicity[periodicity],
        scope: MAPS.scope[scope]
      };
      const score = controlScore(dimensions);
      const cost = parseNum(controlCard.querySelector('input[name="controlCost"]').value);
      const evidence = controlCard.querySelector('textarea[name="controlEvidence"]').value.trim();
      const out = controlCard.querySelector('[data-kind="controlScore"]');
      out.textContent = `Score del control: ${score.toFixed(2)}`;
      return {
        riskCode,
        controlName: controlCard.dataset.controlName,
        cost,
        evidence,
        maturity,
        automation,
        timing,
        periodicity,
        scope,
        score,
        dimensions
      };
    });

    return {
      riskCode,
      asset,
      threat,
      likelihood,
      impact,
      businessLoss,
      riskLevel: likelihood * impact,
      controls
    };
  });

  const allControls = risks.flatMap((r) => r.controls);
  const weightedRatios = allControls.map((c) => {
    const risk = risks.find((r) => r.riskCode === c.riskCode);
    if (!risk || risk.businessLoss <= 0 || c.cost <= 0) return null;
    const ratio = Math.min(100, (risk.businessLoss / c.cost) * 100);
    return ratio * (c.score / 100);
  }).filter((ratio) => ratio !== null);

  const efficiencyQ = weightedRatios.length
    ? weightedRatios.reduce((a, b) => a + b, 0) / weightedRatios.length
    : 0;

  const efficacyByRisk = risks.map((risk) => {
    if (risk.controls.length === 0) return 0;
    return Math.max(0, ...risk.controls.map((c) => c.score));
  });

  const efficacyQ = efficacyByRisk.length
    ? efficacyByRisk.reduce((a, b) => a + b, 0) / efficacyByRisk.length
    : 0;

  const efficiencyQl = classifyEfficiency(efficiencyQ);
  const efficacyQl = classifyEfficacy(efficacyQ);

  return {
    context: {
      organization: document.getElementById('organization').value.trim(),
      systemName: document.getElementById('systemName').value.trim(),
      architecture: ARCHITECTURES.find((a) => a.id === architectureSelect.value)?.name || '',
      scopeNotes: document.getElementById('scopeNotes').value.trim(),
      date: new Date().toISOString()
    },
    metrics: { efficiencyQ, efficacyQ, efficiencyQl, efficacyQl },
    risks
  };
}

function drawMetrics(metrics) {
  document.getElementById('metricEfficiencyQ').textContent = `${metrics.efficiencyQ.toFixed(2)}%`;
  document.getElementById('metricEfficacyQ').textContent = `${metrics.efficacyQ.toFixed(2)}%`;
  document.getElementById('metricEfficiencyQl').textContent = metrics.efficiencyQl;
  document.getElementById('metricEfficacyQl').textContent = metrics.efficacyQl;
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
  const rowXml = rows
    .map((row) => {
      const cells = row
        .map((cell) => `<Cell><Data ss:Type="String">${xmlEscape(cell)}</Data></Cell>`)
        .join('');
      return `<Row>${cells}</Row>`;
    })
    .join('');
  return `<Table>${rowXml}</Table>`;
}

function exportToExcel(data) {
  const summaryRows = [
    ['Organización', data.context.organization],
    ['Sistema evaluado', data.context.systemName],
    ['Arquitectura', data.context.architecture],
    ['Notas de alcance', data.context.scopeNotes],
    ['Fecha', data.context.date],
    ['Eficiencia cuantitativa global (%)', data.metrics.efficiencyQ],
    ['Eficacia cuantitativa global (%)', data.metrics.efficacyQ],
    ['Eficiencia cualitativa global', data.metrics.efficiencyQl],
    ['Eficacia cualitativa global', data.metrics.efficacyQl]
  ];

  const riskRows = [
    ['Riesgo', 'Activo en riesgo', 'Amenaza', 'Probabilidad', 'Impacto', 'Nivel de riesgo', 'Lucro cesante']
  ];

  data.risks.forEach((risk) => {
    riskRows.push([
      risk.riskCode,
      risk.asset,
      risk.threat,
      risk.likelihood,
      risk.impact,
      risk.riskLevel,
      risk.businessLoss
    ]);
  });

  const controlRows = [
    [
      'Riesgo',
      'Control',
      'Costo',
      'Madurez',
      'Automatización',
      'Momento',
      'Periodicidad',
      'Alcance funcional',
      'Score',
      'Evidencia'
    ]
  ];

  data.risks.forEach((risk) => {
    risk.controls.forEach((control) => {
      controlRows.push([
        risk.riskCode,
        control.controlName,
        control.cost,
        control.maturity,
        control.automation,
        control.timing,
        control.periodicity,
        control.scope,
        control.score,
        control.evidence
      ]);
    });
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

document.getElementById('calculateBtn').addEventListener('click', () => {
  const evaluation = collectEvaluation();
  drawMetrics(evaluation.metrics);
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const evaluation = collectEvaluation();
  drawMetrics(evaluation.metrics);
  exportToExcel(evaluation);
});
