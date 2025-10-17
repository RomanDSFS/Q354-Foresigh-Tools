// src/lib/translations.ts

export const translations = {
  ru: {
    siteTitle: 'Инструменты форсайта',
    description: 'Интерактивные методы для прогнозирования и подготовки к будущему.',
    allTools: 'Все инструменты',
    tryTool: 'Попробуйте инструмент',
    tip: 'Совет',
    tipText: 'используйте этот инструмент в команде для более глубокого анализа.',
    backToTools: 'Все инструменты',
    interactiveLabel: 'Интерактивный или демо',
    comingSoon: 'Интерактивный инструмент скоро будет доступен!',

    tools: {
      'horizontal-scanning': {
        name: 'Горизонтальное сканирование и выявление слабых сигналов',
        shortDesc: 'Систематический мониторинг внешней среды для выявления трендов и сигналов изменений.',
        longDesc: 'Горизонтальное сканирование — это процесс постоянного наблюдения за политическими, экономическими, социальными, технологическими, экологическими и правовыми факторами (PESTEL). Он помогает организациям предвидеть изменения и адаптироваться к ним. Слабые сигналы — это ранние признаки будущих изменений.',
        tip: 'Совет',
        tipText: 'используйте этот инструмент в команде для более глубокого анализа.',
      },
      'weak-signals': {
        name: 'Выявление "диких карт"',
        shortDesc: 'Выявление редких, но потенциально значимых событий, которые могут нарушить прогнозы.',
        longDesc: 'Wild cards — маловероятные, но высоковлиятельные события (например, пандемия). Этот инструмент помогает готовиться к неожиданностям.',
      },
      'trend-analysis': {
        name: 'Форсайт-анализ тенденций',
        shortDesc: 'Изучение текущих и возникающих тенденций для прогнозирования будущего.',
        longDesc: 'Анализ тенденций включает сбор данных, выявление паттернов и оценку их потенциального влияния на будущее. Часто используется в сочетании с другими методами для построения сценариев.',
      },
      'scenario-analysis': {
        name: 'Сценарный анализ',
        shortDesc: 'Разработка альтернативных сценариев будущего на основе ключевых неопределённостей.',
        longDesc: 'Сценарный анализ помогает организациям подготовиться к разным возможным будущим, а не полагаться на один прогноз. Обычно строятся 2–4 сценария (оптимистичный, пессимистичный, неожиданный и др.).',
      },
      'future-wheel': {
        name: 'Колесо будущего',
        shortDesc: 'Визуализация каскадных последствий одного события или тренда.',
        longDesc: 'Колесо будущего — это инструмент для анализа прямых и косвенных последствий изменения. Центр — исходное событие, первый круг (R1) — прямые последствия, второй (R2) — вторичные и т.д.',
      },
      'delphi-method': {
        name: 'Метод Делфи',
        shortDesc: 'Структурированный способ получения консенсуса от группы экспертов.',
        longDesc: 'Метод Делфи использует анонимные раунды опросов, чтобы избежать группового мышления и прийти к обоснованному прогнозу. Эксперты получают обратную связь после каждого раунда.',
      },
      'backcasting': {
        name: 'Бэккастинг',
        shortDesc: 'Планирование от желаемого будущего к настоящему.',
        longDesc: 'Метод беккастинга предполагает задание желаемого состояния на конечную дату ( например 2035 г.) и определение ключевых промежуточных этапов, которые логически ведут к этой цели, начиная с текущего момента (2025 г.).',
      },
      'expert-games': {
        name: 'Экспертные игры и моделирование',
        shortDesc: 'Имитация принятия решений в условиях неопределённости через ролевые игры.',
        longDesc: 'Экспертные игры позволяют моделировать сложные системы и взаимодействия между участниками. Часто используются в стратегическом планировании и политике.',
      },
      'wild-cards': {
        name: 'Стресс-тестирование',
        shortDesc: 'Подготовка к маловероятным, но катастрофическим событиям.',
        longDesc: 'Стресс-тестирование помогает проверить устойчивость стратегий к шокам.',
      },
    },
  },

  en: {
    siteTitle: 'Foresight Tools',
    description: 'Interactive methods for forecasting and preparing for the future.',
    allTools: 'All Tools',
    tryTool: 'Try the tool',
    tip: 'Tip',
    tipText: 'use this tool with a team for deeper analysis.',
    backToTools: 'All Tools',
    interactiveLabel: 'Interactive or demo',
    comingSoon: 'Interactive tool coming soon!',

    tools: {
      'horizontal-scanning': {
        name: 'Horizontal scanning and weak signal detection',
        shortDesc: 'Systematic monitoring of the external environment to identify trends and signals of change.',
        longDesc: 'Horizontal scanning is a process of continuously monitoring political, economic, social, technological, environmental, and legal factors (PESTEL). It helps organizations anticipate and adapt to change. Weak signals are early indicators of future change.',
        tip: 'Tip',
        tipText: 'use this tool with a team for deeper analysis.',
      },
      'weak-signals': {
        name: ' Wild Cards detection',
        shortDesc: 'Identifying rare but potentially significant events that could disrupt forecasts.',
        longDesc: 'Wild cards are low-probability, high-impact events (e.g., a pandemic). This tool helps prepare for surprises.',
      },
      'trend-analysis': {
        name: 'Foresight Trend Analysis',
        shortDesc: 'Examining current and emerging trends to forecast the future.',
        longDesc: 'Trend analysis involves collecting data, identifying patterns, and assessing their potential future impact. It is often combined with other methods to build scenarios.',
      },
      'scenario-analysis': {
        name: 'Scenario Analysis',
        shortDesc: 'Developing alternative future scenarios based on key uncertainties.',
        longDesc: 'Scenario analysis helps organizations prepare for multiple possible futures rather than relying on a single forecast. Typically, 2–4 scenarios are built (optimistic, pessimistic, disruptive, etc.).',
      },
      'future-wheel': {
        name: 'Future Wheel',
        shortDesc: 'Visualizing the cascading consequences of a single event or trend.',
        longDesc: 'The Future Wheel is a tool for analyzing direct and indirect consequences of a change. The center is the initial event, the first ring shows direct consequences (R1), the second (R2) — secondary effects, and so on.',
      },
      'delphi-method': {
        name: 'Delphi Method',
        shortDesc: 'A structured approach to achieving expert consensus through iterative rounds.',
        longDesc: 'The Delphi method uses anonymous survey rounds to avoid groupthink and reach a reasoned forecast. Experts receive aggregated feedback after each round.',
      },
      'backcasting': {
        name: 'Backcasting',
        shortDesc: 'Planning from a desired future back to the present.',
        longDesc: 'Backcasting defines a desired future state (e.g., 2035) and works backward to identify key milestones that logically lead to this goal, starting from the present (2025).',
      },
      'expert-games': {
        name: 'Expert Games and Simulation',
        shortDesc: 'Simulating decision-making under uncertainty through role-playing exercises.',
        longDesc: 'Expert games model complex systems and stakeholder interactions. They are commonly used in strategic planning and policy development.',
      },
      'wild-cards': {
        name: ' Stress Testing',
        shortDesc: 'Preparing for low-probability, high-impact disruptive events.',
        longDesc: ' Stress testing helps assess the resilience of strategies to shocks.',
      },
    },
  },
};
export type ToolSlug = keyof typeof translations.ru.tools;