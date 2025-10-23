// src/lib/translations.ts

export const translations = {
  ru: {
    siteTitle: 'Инструменты форсайта',
    description: 'Интерактивные методы для прогнозирования и подготовки к будущему.',
    allTools: 'Все инструменты',
    tip: 'Совет',
    tipText: 'используйте этот инструмент в команде для более глубокого анализа.',
    backToTools: 'Все инструменты',
    interactiveLabel: 'Интерактивный или демо',
    comingSoon: 'Интерактивный инструмент скоро будет доступен!',

    tools: {
      'horizon-scanning': {
        name: 'Cканирование горизонтов и выявление слабых сигналов',
        shortDesc: 'Систематический мониторинг внешней среды для выявления трендов и сигналов изменений.',
        longDesc: 'Cканирование горизонтов — это процесс постоянного наблюдения за политическими, экономическими, социальными, технологическими, экологическими и правовыми факторами (PESTEL). Он помогает предвидеть изменения и адаптироваться к ним. Слабые сигналы — это ранние признаки будущих изменений.',
        //tip: 'Совет',
        //tipText: 'используйте этот инструмент в команде для более глубокого анализа.',
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
          githubRepo: 'https://github.com/RomanDSFS/foresight-scenario-analysis',
          scenarios: {
              baseline: {
                  title: 'Базовый сценарий',
                  description: 'Введение цифрового евро в Еврозоне в 2027. Цифровой евро успешно запускается как безопасная и конфиденциальная валюта, дополняя наличность без значительных потрясений для традиционной банковской системы.',
                  drivers: ['Сильные гарантии конфиденциальности по стандарту GDPR', 'Эффективные лимиты хранения для предотвращения оттока средств из банков'],
                  events: ['Беспроблемная интеграция с существующими банковскими приложениями', 'Успешный запуск функции оффлайн-платежей'],
                  implications: ['Повышение эффективности платежей и финансовой включенности', 'Укрепление денежного суверенитета Еврозоны'],
              },
              optimistic: {
                  title: 'Оптимистичный сценарий',
                  description: 'Цифровой евро становится программируемой платформой, вызывая волну финтех-инноваций и революционизируя цифровые платежи и смарт-контракты.',
                  drivers: ['Открытая API-инфраструктура для разработчиков', 'Сильное государственно-частное партнерство в финтехе'],
                  events: ['Интеграция с DeFi-протоколами для расчетов', 'Массовое внедрение для автоматизированных микроплатежей'],
                  implications: ['Еврозона становится мировым лидером в цифровых финансах', 'Создание совершенно новых рынков цифровых активов'],
              },
              pessimistic: {
                  title: 'Пессимистичный сценарий',
                  description: 'Широкомасштабная паника приводит к массовому перетоку депозитов из коммерческих банков в цифровой евро, вызывая кредитный кризис.',
                  drivers: ['Потеря доверия к коммерческим банкам во время кризиса', 'Отсутствие эффективных лимитов хранения или непривлекательные ставки'],
                  events: ['Быстрый масштабный отток банковских депозитов', 'Резкое удорожание финансирования для банков'],
                  implications: ['Сильный кредитный кризис для бизнеса и домохозяйств', 'Вынужденное вмешательство ЕЦБ для поддержки банковской системы'],
              },
          },
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
    tip: 'Tip',
    tipText: 'use this tool with a team for deeper analysis.',
    backToTools: 'All Tools',
    interactiveLabel: 'Interactive or demo',
    comingSoon: 'Interactive tool coming soon!',

    tools: {
      'horizon-scanning': {
        name: 'Horizon scanning and weak signal detection',
        shortDesc: 'Systematic monitoring of the external environment to identify trends and signals of change.',
        longDesc: 'Horizon scanning is a process of continuously monitoring political, economic, social, technological, environmental, and legal factors (PESTEL). It helps anticipate and adapt to change. Weak signals are early indicators of future change.',
        
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
          longDesc: 'Scenario analysis helps organizations prepare for multiple possible futures rather than relying on a single forecast. Typically, 2–4 scenarios are built (optimistic, pessimistic, disruptive, etc.).',          githubRepo: 'https://github.com/RomanDSFS/foresight-scenario-analysis',
          scenarios: {
              baseline: {
                  title: 'Baseline Scenario',
                  description: ' Digital euro introduced in the EU in 2027. The digital euro successfully launches as a secure and private digital currency, complementing cash without causing significant disruption to the traditional banking system.',
                  drivers: ['Strong GDPR-level privacy guarantees', 'Effective holding limits to prevent bank disintermediation'],
                  events: ['Seamless integration with existing banking apps', 'Successful offline functionality rollout'],
                  implications: ['Increased payment efficiency and financial inclusion', 'Strengthened monetary sovereignty for the Eurozone'],
              },
              optimistic: {
                  title: 'Optimistic Scenario',
                  description: 'The digital euro becomes a programmable platform, sparking a wave of fintech innovation and revolutionizing digital payments and smart contracts.',
                  drivers: ['Open API infrastructure for developers', 'Strong public-private partnership in fintech'],
                  events: ['Integration with DeFi protocols for settlements', 'Mass adoption for automated micropayments'],
                  implications: ['Eurozone becomes a global leader in digital finance', 'Creation of entirely new digital asset markets'],
              },
              pessimistic: {
                  title: 'Pessimistic Scenario',
                  description: 'Widespread panic leads to massive shifts of commercial bank deposits into digital euros, triggering a credit crunch and financial instability.',
                  drivers: ['Loss of confidence in commercial banks during a crisis', 'Absence of effective holding limits or unattractive rates'],
                  events: ['Rapid large-scale withdrawal of bank deposits', 'Sharp increase in bank funding costs'],
                  implications: ['Severe credit crunch for businesses and households', 'Forced ECB intervention to support the banking system'],
              },
          },
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