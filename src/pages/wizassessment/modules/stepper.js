const STEP_FALLBACK_PREFIX = 'step';

const selectors = {
  root: '[data-stepper-root]',
  hero: '[data-wizard-section="hero"]',
  summary: '[data-wizard-section="summary"]',
};

const state = {
  data: null,
  steps: [],
  activeIndex: 0,
  mode: null,
};

function getElement(root, selector) {
  const el = root?.querySelector(selector);
  if (!el) {
    console.warn(`wizassessment: missing element for selector ${selector}`);
  }
  return el;
}

function setStatus(root, message, variant = 'info') {
  const status = getElement(root, '[data-stepper-status]');
  if (!status) {
    return;
  }
  status.innerHTML = `<div class="alert alert-${variant} mb-0" role="alert">${message}</div>`;
}

function deriveSteps(data) {
  if (!data?.process) {
    return [];
  }

  const { steps, stepCount } = data.process;

  if (Array.isArray(steps) && steps.length > 0) {
    return steps.map((step, index) => ({
      id: step.id ?? `${STEP_FALLBACK_PREFIX}-${index + 1}`,
      label: step.label ?? `Step ${index + 1}`,
      description: step.description ?? '',
    }));
  }

  if (typeof stepCount === 'number' && stepCount > 0) {
    console.warn(
      'wizassessment: process.steps missing; generating placeholder labels from stepCount.'
    );
    return Array.from({ length: stepCount }, (_, index) => ({
      id: `${STEP_FALLBACK_PREFIX}-${index + 1}`,
      label: `Step ${index + 1}`,
      description: '',
    }));
  }

  console.warn('wizassessment: unable to derive steps – no stepCount provided.');
  return [];
}

function populateModes(root, data) {
  const selector = getElement(root, '[data-mode-selector]');
  if (!selector) {
    return;
  }

  const modes = Array.isArray(data?.process?.modes) ? data.process.modes : [];
  selector.innerHTML = '';

  if (!modes.length) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Modes unavailable';
    selector.append(option);
    selector.disabled = true;
    return;
  }

  modes.forEach((mode) => {
    const option = document.createElement('option');
    option.value = mode.id;
    option.textContent = mode.label;
    option.dataset.description = mode.description;
    selector.append(option);
  });

  state.mode = state.mode ?? modes[0].id;
  selector.value = state.mode;

  selector.addEventListener('change', (event) => {
    state.mode = event.target.value;
    updateSummary();
    setStatus(root, `Switched to ${event.target.selectedOptions[0]?.textContent ?? 'selected'} mode.`);
  });
}

function renderSteps(root) {
  const list = getElement(root, '[data-stepper-list]');
  if (!list) {
    return;
  }

  list.innerHTML = '';

  if (!state.steps.length) {
    const fallback = document.createElement('li');
    fallback.textContent = 'No steps available – check wizard schema.';
    fallback.className = 'text-danger';
    list.append(fallback);
    return;
  }

  state.steps.forEach((step, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline-primary btn-sm';
    button.dataset.stepId = step.id;
    button.textContent = step.label;

    button.addEventListener('click', () => {
      setActiveStep(root, index);
    });

    if (index === state.activeIndex) {
      button.classList.remove('btn-outline-primary');
      button.classList.add('btn-primary');
    }

    item.append(button);
    list.append(item);
  });
}

function setActiveStep(root, index) {
  if (index < 0 || index >= state.steps.length) {
    return;
  }

  state.activeIndex = index;
  renderSteps(root);

  const content = getElement(root, '[data-stepper-content]');
  if (!content) {
    return;
  }

  const activeStep = state.steps[index];
  content.innerHTML = `
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge text-bg-primary">Step ${index + 1}</span>
          <span class="text-muted small">Mode: ${state.mode ?? 'n/a'}</span>
        </div>
        <h3 class="h5 mb-3">${activeStep.label}</h3>
        <p class="text-muted mb-0">
          ${activeStep.description || 'Agent 1.6B will inject contextual copy and interactive controls here.'}
        </p>
      </div>
    </div>
  `;

  updateSummary();
}

function updateHero() {
  const hero = document.querySelector(selectors.hero);
  if (!hero || !state.data?.process) {
    return;
  }

  const { defaultName, stepCount, modes } = state.data.process;

  const nameTarget = hero.querySelector('[data-process-name]');
  if (nameTarget && defaultName) {
    nameTarget.textContent = defaultName;
  }

  const stepTarget = hero.querySelector('[data-step-count]');
  if (stepTarget) {
    stepTarget.textContent = stepCount ?? state.steps.length ?? '--';
  }

  const modeTarget = hero.querySelector('[data-mode-count]');
  if (modeTarget) {
    modeTarget.textContent = Array.isArray(modes) ? modes.length : 0;
  }
}

function updateSummary() {
  const summary = document.querySelector(selectors.summary);
  if (!summary) {
    return;
  }

  const dump = summary.querySelector('[data-state-dump]');
  if (!dump) {
    return;
  }

  const serialized = {
    mode: state.mode,
    activeStep: state.steps[state.activeIndex]?.id ?? null,
    stepCount: state.steps.length,
    schemaVersion: state.data?.version ?? null,
  };

  dump.textContent = JSON.stringify(serialized, null, 2);
}

async function bootstrap() {
  const root = document.querySelector(selectors.root);
  if (!root) {
    console.warn('wizassessment: stepper root not found.');
    return;
  }

  const mockUrl = root.dataset.mockUrl;
  if (!mockUrl) {
    setStatus(root, 'Wizard mock URL missing. Check page configuration.', 'warning');
    return;
  }

  setStatus(root, 'Loading wizard data…');

  try {
    const response = await fetch(mockUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    state.data = await response.json();
  } catch (error) {
    console.error('wizassessment: failed to load wizard mock', error);
    setStatus(root, 'Unable to load wizard mock data. See console for details.', 'danger');
    return;
  }

  state.steps = deriveSteps(state.data);
  state.activeIndex = 0;

  populateModes(root, state.data);
  setActiveStep(root, 0);
  updateHero();

  setStatus(
    root,
    `Wizard mock loaded (version ${state.data?.version ?? 'unknown'}).`,
    'success'
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
