const canvas = document.querySelector("#space");
const ctx = canvas.getContext("2d");
const SPACE_SCALE = 1.72;
const ZOOM_FACTORS = [0.24, 0.31, 0.39, 0.5, 0.64];

let nodes = [
  {
    id: "axis",
    title: "軸の仮説",
    body: "汎用的に測れる3軸に、あなた固有の名前を与える。個別性と再利用性の中間点。",
    x: 0.58,
    y: 0.12,
    z: 0.74,
    color: "#f0b35a",
  },
  {
    id: "ai-slap",
    title: "AIスラップ",
    body: "AIとの摩擦で思考が叩き起こされる瞬間。違和感、反発、発火点。",
    x: 0.18,
    y: 0.82,
    z: 0.9,
    color: "#ff7d6e",
  },
  {
    id: "uuid",
    title: "UUID的自己",
    body: "名前や肩書きよりも、文脈間を移動しても残る識別子としての自分。",
    x: 0.78,
    y: -0.12,
    z: 0.38,
    color: "#67d7d1",
  },
  {
    id: "fluidity",
    title: "流動性",
    body: "固定された結論より、変化し続ける配置やプロセスを重視する傾向。",
    x: 0.28,
    y: 0.34,
    z: 0.96,
    color: "#8bd17c",
  },
  {
    id: "archive",
    title: "定着した核",
    body: "繰り返し戻ってくる価値観、長期テーマ、保存しておきたい判断基準。",
    x: -0.36,
    y: -0.2,
    z: -0.72,
    color: "#e8d9b7",
  },
  {
    id: "design",
    title: "設計としての思考",
    body: "考えを単なる文章ではなく、触れる構造や道具として組み直したい欲求。",
    x: 0.94,
    y: 0.5,
    z: 0.2,
    color: "#a8a2ff",
  },
  {
    id: "introspection",
    title: "内省の井戸",
    body: "誰かに見せる前の、感覚、違和感、微細な自己理解の層。",
    x: -0.54,
    y: -0.82,
    z: -0.05,
    color: "#74a9ff",
  },
  {
    id: "network",
    title: "関係の星図",
    body: "人、AI、場所、仕事、作品が相互に照らし合う接続面。",
    x: 0.08,
    y: 0.94,
    z: 0.06,
    color: "#f7d36b",
  },
  {
    id: "prototype",
    title: "試作衝動",
    body: "考えを抽象のままにせず、まず動くものにして確かめる姿勢。",
    x: 0.68,
    y: 0.64,
    z: 0.82,
    color: "#ff9ec2",
  },
];

let links = [
  ["axis", "fluidity"],
  ["axis", "design"],
  ["axis", "uuid"],
  ["ai-slap", "fluidity"],
  ["ai-slap", "prototype"],
  ["uuid", "archive"],
  ["uuid", "network"],
  ["fluidity", "prototype"],
  ["archive", "introspection"],
  ["design", "prototype"],
  ["introspection", "network"],
  ["network", "prototype"],
];

const datasets = {
  winbest: {
    title: "Winbest Vision Map",
    axisTitle: "ビジョンと課題を眺める3軸",
    description:
      "現状の安定基盤、第一弾ビジョン、最終ビジョン、阻害要因を同じ空間に置き、突破すべき構造を見える化します。",
    axes: [
      ["X", "現場実態から事業構造へ。属人的な実務から、再現可能な価値提供モデルへ。"],
      ["Y", "内部基盤から顧客・社会価値へ。社内の強化を、外部へ届く価値へ変換する。"],
      ["Z", "現状課題から未来ビジョンへ。足元の壁を越えて、最終的なありたき姿へ向かう。"],
    ],
    chips: [
      "X軸 現場実態 ↔ 事業構造: 属人的な実務から、再現可能な価値提供モデルへ",
      "Y軸 内部基盤 ↔ 社会価値: 社内の強化を、外部へ届く価値へ変換する",
      "Z軸 現状課題 ↔ 未来ビジョン: 足元の壁を越えて、ありたき姿へ向かう",
    ],
    legend: [
      ["final", "#f0c36a", "最終ビジョン"],
      ["initiative", "#5de7ff", "第一弾ビジョン / 取り組み"],
      ["belief", "#7dffbd", "信念 / 価値創出"],
      ["base", "#6ba8ff", "現状の強み"],
      ["challenge", "#ff5f7a", "重要課題"],
      ["talent", "#a8a2ff", "採用・育成施策"],
    ],
    axisEnds: {
      xNeg: "現場実態",
      xPos: "事業構造",
      yNeg: "内部基盤",
      yPos: "社会価値",
      zNeg: "現状課題",
      zPos: "未来ビジョン",
    },
    nodes: [
      {
        id: "final-vision",
        category: "final",
        kind: "FINAL VISION",
        title: "生涯価値最大化エコシステム",
        body: "技術者の生涯価値を最大化し、社会に価値を届け続けるエコシステムをつくる。",
        points: ["最終的なありたき姿", "技術者、会社、顧客、社会が循環的に成長する", "明日の場では最上位のブレない北極星"],
        x: 0.88,
        y: 0.9,
        z: 1.02,
        color: "#f0c36a",
        weight: 2.25,
      },
      {
        id: "first-vision",
        category: "initiative",
        kind: "FIRST GATE",
        title: "人月から価値提供へ",
        body: "人を売る会社から、技術力・経験・知識・仕組み・アイデアを価値として提供する会社へ転換する。",
        points: ["いま越えるべき第一関門", "最終ビジョンへ向かうための突破ゲート", "明日の議論の中心に置くべきテーマ"],
        x: 0.62,
        y: 0.56,
        z: 0.52,
        color: "#5de7ff",
        weight: 2,
      },
      {
        id: "family",
        category: "belief",
        kind: "BELIEF",
        title: "社員と家族の幸せ",
        body: "社員は家族である。働きがい、所得、時間、健康を大切にし、社員とその家族まで支えられる会社を目指す。",
        points: ["ビジョンの情緒的な核", "外部向けには“社員とその家族の幸せ”と表現すると伝わりやすい", "採用・育成・働き方の判断軸になる"],
        x: -0.2,
        y: 0.82,
        z: 0.64,
        color: "#7dffbd",
        weight: 1.45,
      },
      {
        id: "stable-base",
        category: "base",
        kind: "CURRENT BASE",
        title: "安定フェーズの経営基盤",
        body: "エンジニア20名体制、4社以上への分散、最大顧客依存率25%以下など、次に進むための土台はできている。",
        points: ["ゼロからの変革ではない", "安定基盤の上に次の成長モデルをつくる", "現状の強みとして明確に伝えられる"],
        x: -0.82,
        y: -0.42,
        z: -0.18,
        color: "#6ba8ff",
        weight: 1.35,
      },
      {
        id: "dependency",
        category: "challenge",
        kind: "KEY CHALLENGE",
        title: "特定技術者への依存",
        body: "アーキテクト、テックリード、顧客対応などの属人化が大きく、ビジョン実現に向けた最大級の壁になっている。",
        points: ["キー課題として強調", "技術継承、人月依存、採用育成にも連鎖する", "ここをほどくと第一弾ビジョンへの距離が一気に縮む"],
        x: -0.68,
        y: -0.18,
        z: -0.86,
        color: "#ff5f7a",
        weight: 1.75,
      },
      {
        id: "succession",
        category: "challenge",
        kind: "CHALLENGE",
        title: "技術継承の難しさ",
        body: "知識だけでなく、思考・判断・マインドの継承が不足している。",
        points: ["暗黙知の言語化が必要", "OJTやメンター制度と接続", "属人化を解消する中核テーマ"],
        x: -0.24,
        y: -0.44,
        z: -0.72,
        color: "#ff6f8a",
        weight: 1.35,
      },
      {
        id: "manmonth",
        category: "challenge",
        kind: "KEY CHALLENGE",
        title: "人月ビジネスからの脱却",
        body: "時間の切り売りモデルから抜け出せず、収益のスケーラビリティが低い。",
        points: ["第一弾ビジョンと直結", "価値を売るモデルへの転換が必要", "明日の議論で最も伝わりやすい経営課題"],
        x: 0.16,
        y: -0.16,
        z: -0.92,
        color: "#ff5f7a",
        weight: 1.8,
      },
      {
        id: "recruiting",
        category: "challenge",
        kind: "CHALLENGE",
        title: "採用戦略と契約難",
        body: "若手人材の採用競争や定着率の低さを避けるため、シニアフェローと外国籍新人に力を入れている。一方で、高齢者や外国籍人材のIT業務委託・派遣契約は難しい。",
        points: ["社会全体の採用競争から正面衝突しない戦略", "55歳以上の雇用機会創出と若手への技術継承", "勤勉な外国籍新人の採用・育成", "契約面の難しさが拡大の壁になる"],
        x: -0.82,
        y: 0.34,
        z: -0.78,
        color: "#ff7f96",
        weight: 1.55,
      },
      {
        id: "client-expansion",
        category: "challenge",
        kind: "GROWTH CHALLENGE",
        title: "取引先拡充",
        body: "安定基盤の次に、取引先を広げてリスク分散と成長余地を増やす必要がある。",
        points: ["最大顧客依存を抑えた土台をさらに強化する", "価値提供モデルを広げるための入口", "属人化した営業・顧客対応からの脱却ともつながる"],
        x: 0.1,
        y: 0.82,
        z: -0.62,
        color: "#ff6f8a",
        weight: 1.45,
      },
      {
        id: "customer-growth",
        category: "challenge",
        kind: "GROWTH CHALLENGE",
        title: "既存顧客増強",
        body: "既存顧客との関係を深め、人月だけではない価値提供へ広げる必要がある。",
        points: ["既存顧客の中で提供価値を広げる", "技術・知識・仕組みを売るモデルへの橋渡し", "新規取引先拡充より短期で成果化しやすい可能性"],
        x: 0.44,
        y: 0.78,
        z: -0.36,
        color: "#ff7f96",
        weight: 1.5,
      },
      {
        id: "senior-fellow",
        category: "talent",
        kind: "TALENT INITIATIVE",
        title: "シニアフェロー",
        body: "55歳以上の雇用機会を創出し、若手への技術継承を担う。社会貢献としても作用する採用・育成施策。",
        points: ["高齢者の活躍機会をつくる", "若手への技術継承を進める", "採用競争を避ける独自の人材戦略", "社会貢献性がある"],
        x: -0.58,
        y: 0.52,
        z: -0.12,
        color: "#a8a2ff",
        weight: 1.38,
      },
      {
        id: "foreign-talent",
        category: "talent",
        kind: "TALENT INITIATIVE",
        title: "外国籍新人採用",
        body: "若手の在社率低下や採用競争を背景に、勤勉な外国籍新人を対象として採用・育成する。",
        points: ["一般的な若手採用競争を避ける", "勤勉な外国籍人材に着目", "新人として育成し、将来の中核人材化を狙う"],
        x: -1.02,
        y: 0.58,
        z: -0.28,
        color: "#a8a2ff",
        weight: 1.3,
      },
      {
        id: "contract-barrier",
        category: "challenge",
        kind: "BARRIER",
        title: "高齢者・外国籍人材の契約難",
        body: "高齢者や外国籍人材によるITシステム業務委託・派遣契約は、顧客側の受け入れや契約条件の面で難しさがある。",
        points: ["採用戦略そのものは良いが、契約化に壁がある", "シニアフェローと外国籍新人の両方に関わる", "取引先拡充・既存顧客増強とも接続する阻害要因"],
        x: -1.14,
        y: 0.12,
        z: -0.92,
        color: "#ff5f7a",
        weight: 1.48,
      },
      {
        id: "ai-adaptation",
        category: "challenge",
        kind: "CHALLENGE",
        title: "AI時代への適応",
        body: "AIを使いこなせる人材と仕組みがまだ十分ではない。",
        points: ["AI活用型エンジニア育成と接続", "生産性向上だけでなく価値提供モデルの再設計に関わる", "未来創造側へ引き上げる課題"],
        x: 0.42,
        y: 0.02,
        z: -0.52,
        color: "#ff8fa2",
        weight: 1.25,
      },
      {
        id: "knowledge-system",
        category: "initiative",
        kind: "INITIATIVE",
        title: "技術継承の仕組み化",
        body: "OJT、メンター制度、思考の言語化により、個人の技術をチームの資産へ変える。",
        points: ["属人化の解消", "ナレッジ体系化", "チーム体制の強化"],
        x: 0.08,
        y: 0.24,
        z: 0.08,
        color: "#5de7ff",
        weight: 1.25,
      },
      {
        id: "ai-productivity",
        category: "initiative",
        kind: "INITIATIVE",
        title: "AI活用による生産性向上",
        body: "調査・設計・レビューなど付加価値業務に集中できるよう、AIを使いこなす仕組みをつくる。",
        points: ["AI活用型エンジニア育成", "判断力の強化", "価値提供モデルへの橋渡し"],
        x: 0.48,
        y: 0.32,
        z: 0.2,
        color: "#5de7ff",
        weight: 1.2,
      },
      {
        id: "new-service",
        category: "initiative",
        kind: "INITIATIVE",
        title: "新規事業・サービス創出",
        body: "社員のやりたいことを事業に育て、時間ではなく価値が収益の源泉になる状態をつくる。",
        points: ["価値を売るモデル", "技術力・経験・知識・仕組み・アイデアを収益化", "最終ビジョンへの推進力"],
        x: 0.86,
        y: 0.48,
        z: 0.28,
        color: "#7dffbd",
        weight: 1.35,
      },
      {
        id: "belonging",
        category: "initiative",
        kind: "INITIATIVE",
        title: "帰属化の解消",
        body: "ナレッジの体系化とチーム体制の強化により、個人に閉じた価値を組織の価値へ変える。",
        points: ["特定技術者依存を弱める", "チームとして価値提供する", "技術者が孤立しない構造をつくる"],
        x: -0.08,
        y: 0.06,
        z: 0.04,
        color: "#66d7ff",
        weight: 1.18,
      },
    ],
    links: [
      ["stable-base", "first-vision"],
      ["first-vision", "final-vision"],
      ["family", "final-vision"],
      ["dependency", "succession"],
      ["dependency", "manmonth"],
      ["dependency", "recruiting"],
      ["recruiting", "senior-fellow"],
      ["recruiting", "foreign-talent"],
      ["senior-fellow", "succession"],
      ["senior-fellow", "family"],
      ["foreign-talent", "knowledge-system"],
      ["contract-barrier", "senior-fellow"],
      ["contract-barrier", "foreign-talent"],
      ["contract-barrier", "client-expansion"],
      ["contract-barrier", "customer-growth"],
      ["succession", "knowledge-system"],
      ["dependency", "belonging"],
      ["manmonth", "new-service"],
      ["manmonth", "customer-growth"],
      ["manmonth", "client-expansion"],
      ["stable-base", "client-expansion"],
      ["stable-base", "customer-growth"],
      ["client-expansion", "first-vision"],
      ["customer-growth", "first-vision"],
      ["ai-adaptation", "ai-productivity"],
      ["knowledge-system", "first-vision"],
      ["ai-productivity", "first-vision"],
      ["new-service", "first-vision"],
      ["belonging", "first-vision"],
      ["recruiting", "family"],
    ],
  },
  thought: {
    title: "3D思考空間",
    axisTitle: "3軸の初期案",
    description:
      "汎用軸をそのまま使うより、汎用的に測れる内側の軸に、あなた固有の呼び名を与えるのが良さそうです。",
    axes: [
      ["X", "具象から構造へ。体験・事例から、モデル・設計へ。"],
      ["Y", "内省から接続へ。自分の感覚から、人・社会・AIとの関係へ。"],
      ["Z", "定着から流動へ。保存したい核から、変化し続ける実験へ。"],
    ],
    chips: ["X: 具象 ↔ 構造", "Y: 内省 ↔ 接続", "Z: 定着 ↔ 流動"],
    nodes,
    links,
  },
  projects: {
    title: "企画宇宙",
    axisTitle: "企画を眺める3軸",
    description: "アイデア、実装、公開、収益化を同じ空間に置いて、次に進める対象を見つけるモードです。",
    axes: [
      ["X", "直感から実装へ。思いつきから、手を動かせる形へ。"],
      ["Y", "個人実験から社会接続へ。自分用から、誰かに届くものへ。"],
      ["Z", "低温保存から今すぐ着火へ。寝かせる案と動かす案を分ける。"],
    ],
    chips: ["X: 直感 ↔ 実装", "Y: 個人 ↔ 社会", "Z: 保存 ↔ 着火"],
    nodes: [
      { id: "map", title: "3D思考空間", body: "いま育てている中心プロジェクト。会話履歴が来たら一気に実データ化する。", x: 0.78, y: 0.42, z: 0.86, color: "#f0b35a" },
      { id: "dailybrief", title: "DailyBrief", body: "毎日の情報整理と自動化。継続運用に向いた実装寄りの企画。", x: 0.86, y: 0.68, z: 0.44, color: "#67d7d1" },
      { id: "writing", title: "文章化", body: "感じたことを残し、後で再利用できる形にするための表現面。", x: -0.24, y: -0.36, z: 0.32, color: "#e8d9b7" },
      { id: "visual", title: "ビジュアル実験", body: "UI、3D、図解、空間表現など、考えを見えるものにする領域。", x: 0.5, y: 0.18, z: 0.9, color: "#a8a2ff" },
      { id: "automation", title: "自動化", body: "面倒な反復を道具化して、考える時間を増やす流れ。", x: 0.92, y: 0.2, z: 0.5, color: "#8bd17c" },
      { id: "portfolio", title: "公開ポートフォリオ", body: "内側の試作を外に見せられる形へ編集する出口。", x: 0.38, y: 0.9, z: 0.18, color: "#ff9ec2" },
      { id: "archive", title: "アイデア保管庫", body: "まだ動かさないが、失いたくない種を置いておく場所。", x: -0.72, y: -0.08, z: -0.74, color: "#74a9ff" },
      { id: "learning", title: "技術学習", body: "作りたいものに必要な技術を、目的から逆算して学ぶ領域。", x: 0.62, y: -0.42, z: 0.26, color: "#f7d36b" },
    ],
    links: [["map", "visual"], ["map", "automation"], ["map", "portfolio"], ["dailybrief", "automation"], ["writing", "archive"], ["writing", "portfolio"], ["visual", "learning"], ["automation", "learning"], ["portfolio", "dailybrief"]],
  },
  energy: {
    title: "状態の天気図",
    axisTitle: "コンディションを眺める3軸",
    description: "日々の状態をノード化して、何を増やすと動きやすいかを探るモードです。",
    axes: [
      ["X", "身体から認知へ。体調、集中、判断のどこに重心があるか。"],
      ["Y", "ひとりから対話へ。内側で整えるか、人と動くか。"],
      ["Z", "回復から推進へ。休むべきか、前に出るべきか。"],
    ],
    chips: ["X: 身体 ↔ 認知", "Y: ひとり ↔ 対話", "Z: 回復 ↔ 推進"],
    nodes: [
      { id: "sleep", title: "睡眠", body: "全体の土台。ここが沈むと他のノードも暗くなる。", x: -0.86, y: -0.48, z: -0.72, color: "#74a9ff" },
      { id: "focus", title: "集中", body: "まとまった時間と静けさで上がる、深く潜る力。", x: 0.62, y: -0.66, z: 0.42, color: "#67d7d1" },
      { id: "curiosity", title: "好奇心", body: "新しいものに触れると光る、探索のエネルギー。", x: 0.34, y: 0.38, z: 0.86, color: "#f0b35a" },
      { id: "friction", title: "違和感", body: "少しざらつくが、発見の入口にもなる状態。", x: 0.18, y: -0.12, z: 0.72, color: "#ff7d6e" },
      { id: "talk", title: "対話", body: "他者やAIとのやり取りで考えが動く接続点。", x: 0.26, y: 0.92, z: 0.44, color: "#f7d36b" },
      { id: "walk", title: "散歩", body: "身体側から思考をほどく、小さなリセット。", x: -0.74, y: -0.12, z: -0.12, color: "#8bd17c" },
      { id: "shipping", title: "出す力", body: "完成度よりも外に置くことで次を呼ぶ推進力。", x: 0.86, y: 0.7, z: 0.74, color: "#ff9ec2" },
    ],
    links: [["sleep", "focus"], ["sleep", "walk"], ["focus", "shipping"], ["curiosity", "friction"], ["curiosity", "talk"], ["talk", "shipping"], ["walk", "curiosity"], ["friction", "shipping"]],
  },
  story: {
    title: "物語構造",
    axisTitle: "物語を眺める3軸",
    description: "人物、舞台、衝突、変化を3Dに置いて、作品や企画の構造を見るモードです。",
    axes: [
      ["X", "人物から世界へ。内面の動機と、外側の設定を行き来する。"],
      ["Y", "孤独から共同体へ。ひとりの変化と、関係性の変化を見る。"],
      ["Z", "過去から未来へ。記憶、現在の衝突、これからの可能性。"],
    ],
    chips: ["X: 人物 ↔ 世界", "Y: 孤独 ↔ 共同体", "Z: 過去 ↔ 未来"],
    nodes: [
      { id: "protagonist", title: "主人公", body: "変化の中心。何を恐れ、何を選ぶのか。", x: -0.62, y: -0.42, z: 0.08, color: "#f0b35a" },
      { id: "wound", title: "過去の傷", body: "現在の選択を縛る、まだ言葉になっていない理由。", x: -0.82, y: -0.72, z: -0.82, color: "#74a9ff" },
      { id: "guide", title: "導き手", body: "答えを渡す人ではなく、別の見方を開く存在。", x: -0.18, y: 0.46, z: 0.2, color: "#67d7d1" },
      { id: "antagonist", title: "対立軸", body: "主人公の弱さや欲望を照らし返す力。", x: 0.42, y: -0.1, z: 0.38, color: "#ff7d6e" },
      { id: "world", title: "世界のルール", body: "物語全体を縛る約束、制度、環境、魔法のようなもの。", x: 0.92, y: 0.28, z: -0.16, color: "#a8a2ff" },
      { id: "choice", title: "決断", body: "戻れなくなる一点。ここで主人公の形が変わる。", x: 0.16, y: 0.12, z: 0.9, color: "#ff9ec2" },
      { id: "home", title: "帰る場所", body: "最後に変化が測られる地点。元と同じ場所でも意味が違う。", x: -0.28, y: 0.84, z: 0.66, color: "#8bd17c" },
    ],
    links: [["protagonist", "wound"], ["protagonist", "guide"], ["protagonist", "antagonist"], ["antagonist", "world"], ["guide", "choice"], ["choice", "home"], ["wound", "choice"], ["world", "home"]],
  },
};

const card = {
  mapTitle: document.querySelector("#map-title"),
  axisTitle: document.querySelector("#axis-title"),
  axisDescription: document.querySelector("#axis-description"),
  axisList: document.querySelector("#axis-list"),
  title: document.querySelector("#node-title"),
  body: document.querySelector("#node-body"),
  kind: document.querySelector("#node-kind"),
  points: document.querySelector("#node-points"),
  x: document.querySelector("#node-x"),
  y: document.querySelector("#node-y"),
  z: document.querySelector("#node-z"),
};

const axisChips = [
  document.querySelector(".axis-x"),
  document.querySelector(".axis-y"),
  document.querySelector(".axis-z"),
];
const legendItems = document.querySelector("#legend-items");
const legendPanel = document.querySelector(".legend");
const legendToggle = document.querySelector(".legend-toggle");
const modeButtons = [...document.querySelectorAll("[data-mode]")];
let currentDataset = null;
let currentLegend = [];

const state = {
  width: 0,
  height: 0,
  yaw: -0.58,
  pitch: 0.52,
  targetYaw: -0.58,
  targetPitch: 0.52,
  zoom: 300,
  targetZoom: 300,
  selected: 0,
  hover: -1,
  drag: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  moved: false,
  pulse: 0,
  zoomLevel: 2,
  pointers: new Map(),
  pinchDistance: 0,
  pinchCooldown: false,
  dimmedCategories: new Set(),
};

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = rect.width;
  state.height = rect.height;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  applyZoomLevel();
}

function zoomForLevel(level = state.zoomLevel) {
  const index = Math.max(0, Math.min(ZOOM_FACTORS.length - 1, level));
  return Math.min(state.width, state.height) * ZOOM_FACTORS[index];
}

function applyZoomLevel(level = state.zoomLevel) {
  state.zoomLevel = Math.max(0, Math.min(ZOOM_FACTORS.length - 1, level));
  state.targetZoom = zoomForLevel();
}

function stepZoom(direction) {
  applyZoomLevel(state.zoomLevel + direction);
  state.pulse = 1;
}

function rotate(point) {
  const cy = Math.cos(state.yaw);
  const sy = Math.sin(state.yaw);
  const cp = Math.cos(state.pitch);
  const sp = Math.sin(state.pitch);
  const x1 = point.x * cy - point.z * sy;
  const z1 = point.x * sy + point.z * cy;
  const y1 = point.y * cp - z1 * sp;
  const z2 = point.y * sp + z1 * cp;
  return { x: x1, y: y1, z: z2 };
}

function project(node) {
  const expanded = {
    x: node.x * SPACE_SCALE,
    y: node.y * SPACE_SCALE,
    z: node.z * SPACE_SCALE,
  };
  const r = rotate(expanded);
  const depth = 3.3 + r.z;
  const scale = state.zoom / depth;
  return {
    x: state.width / 2 + r.x * scale,
    y: state.height / 2 - r.y * scale,
    z: r.z,
    scale,
  };
}

function getNodeCategory(node) {
  return node.category || node.color;
}

function isNodeDimmed(node) {
  return state.dimmedCategories.has(getNodeCategory(node));
}

function withAlpha(color, alpha) {
  if (!color || !color.startsWith("#") || color.length !== 7) return color;
  const value = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return color + value;
}

function getAxisEnds() {
  if (currentDataset?.axisEnds) return currentDataset.axisEnds;
  return {
    xNeg: "X-",
    xPos: "X+",
    yNeg: "Y-",
    yPos: "Y+",
    zNeg: "Z-",
    zPos: "Z+",
  };
}

function drawAxis() {
  const axes = [
    [{ x: -1.35, y: 0, z: 0, label: getAxisEnds().xNeg }, { x: 1.35, y: 0, z: 0, label: getAxisEnds().xPos }, "#67d7d1"],
    [{ x: 0, y: -1.35, z: 0, label: getAxisEnds().yNeg }, { x: 0, y: 1.35, z: 0, label: getAxisEnds().yPos }, "#8bd17c"],
    [{ x: 0, y: 0, z: -1.35, label: getAxisEnds().zNeg }, { x: 0, y: 0, z: 1.35, label: getAxisEnds().zPos }, "#f0b35a"],
  ];
  ctx.lineWidth = 1;
  for (const [a, b, color] of axes) {
    const pa = project(a);
    const pb = project(b);
    ctx.strokeStyle = color + "66";
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.stroke();
    drawAxisLabel(pa, a.label, color);
    drawAxisLabel(pb, b.label, color);
  }
}

function drawAxisLabel(point, label, color) {
  ctx.save();
  ctx.fillStyle = "rgba(6, 12, 22, 0.72)";
  ctx.strokeStyle = color + "88";
  ctx.lineWidth = 1;
  ctx.font = "700 12px system-ui, sans-serif";
  const width = Math.min(168, Math.max(58, ctx.measureText(label).width + 20));
  const x = Math.max(12, Math.min(state.width - width - 12, point.x - width / 2));
  const y = Math.max(12, Math.min(state.height - 32, point.y - 15));
  roundedRectPath(ctx, x, y, width, 26, 7);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#e8f8ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + width / 2, y + 13);
  ctx.restore();
}

function roundedRectPath(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function drawLinks(positions) {
  for (const [from, to] of links) {
    const fromIndex = nodes.findIndex((node) => node.id === from);
    const toIndex = nodes.findIndex((node) => node.id === to);
    const a = positions[fromIndex];
    const b = positions[toIndex];
    const active = fromIndex === state.selected || toIndex === state.selected;
    const dimmed = isNodeDimmed(nodes[fromIndex]) || isNodeDimmed(nodes[toIndex]);
    ctx.lineWidth = active ? 2.1 : 1.1;
    ctx.strokeStyle = dimmed
      ? "rgba(151, 203, 255, 0.035)"
      : active
        ? "rgba(93, 231, 255, 0.58)"
        : "rgba(151, 203, 255, 0.16)";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
}

function drawNodes(positions, time) {
  const order = positions.map((p, i) => ({ ...p, i })).sort((a, b) => a.z - b.z);
  for (const point of order) {
    const node = nodes[point.i];
    const selected = point.i === state.selected;
    const hovered = point.i === state.hover;
    const dimmed = isNodeDimmed(node);
    const alpha = dimmed ? 0.14 : 1;
    const baseRadius = 8 + (node.weight || 1) * 3.2;
    const radius = selected ? baseRadius + 5 + Math.sin(time / 180) * 2 : hovered ? baseRadius + 2 : baseRadius;

    if (selected) {
      const glow = 40 + (node.weight || 1) * 13 + state.pulse * 42;
      const gradient = ctx.createRadialGradient(point.x, point.y, 2, point.x, point.y, glow);
      gradient.addColorStop(0, withAlpha(node.color, 0.47 * alpha));
      gradient.addColorStop(1, node.color + "00");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, glow, 0, Math.PI * 2);
      ctx.fill();
    }

    if ((node.weight || 1) > 1.6) {
      ctx.strokeStyle = withAlpha(node.color, 0.4 * alpha);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius + 9 + Math.sin(time / 320) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = withAlpha(node.color, alpha);
    ctx.strokeStyle = selected ? withAlpha("#ffffff", alpha) : `rgba(218, 244, 255, ${0.52 * alpha})`;
    ctx.lineWidth = selected ? 2.5 : 1;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.globalAlpha = dimmed ? 0.18 : 1;
    ctx.fillStyle = selected || hovered ? "rgba(244, 251, 255, 0.98)" : "rgba(205, 230, 244, 0.82)";
    ctx.font = selected || hovered ? "700 13px system-ui, sans-serif" : "12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(3, 8, 14, 0.92)";
    ctx.shadowBlur = 10;
    ctx.fillText(node.title, point.x, point.y - radius - 12);
    ctx.restore();
  }
}

function render(time = 0) {
  state.yaw += (state.targetYaw - state.yaw) * 0.08;
  state.pitch += (state.targetPitch - state.pitch) * 0.08;
  state.zoom += (state.targetZoom - state.zoom) * 0.08;
  state.pulse *= 0.9;

  ctx.clearRect(0, 0, state.width, state.height);
  const bg = ctx.createLinearGradient(0, 0, state.width, state.height);
  bg.addColorStop(0, "#07101f");
  bg.addColorStop(0.52, "#071019");
  bg.addColorStop(1, "#0b0d14");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, state.width, state.height);

  ctx.save();
  ctx.globalAlpha = 0.34;
  ctx.strokeStyle = "rgba(93, 231, 255, 0.11)";
  ctx.lineWidth = 1;
  const grid = 46;
  const drift = (time * 0.012) % grid;
  for (let x = -grid + drift; x < state.width + grid; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + state.height * 0.22, state.height);
    ctx.stroke();
  }
  for (let y = -grid; y < state.height + grid; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y + drift);
    ctx.lineTo(state.width, y - state.width * 0.08 + drift);
    ctx.stroke();
  }
  ctx.restore();

  drawAxis();
  const positions = nodes.map(project);
  drawLinks(positions);
  drawNodes(positions, time);
  requestAnimationFrame(render);
}

function updateCard() {
  const node = nodes[state.selected];
  card.title.textContent = node.title;
  card.body.textContent = node.body;
  card.kind.textContent = node.kind || "NODE";
  card.points.innerHTML = (node.points || []).map((point) => `<li>${point}</li>`).join("");
  card.x.textContent = node.x.toFixed(2);
  card.y.textContent = node.y.toFixed(2);
  card.z.textContent = node.z.toFixed(2);
}

function applyDataset(mode) {
  const dataset = datasets[mode];
  currentDataset = dataset;
  nodes = dataset.nodes;
  links = dataset.links;
  state.selected = 0;
  state.hover = -1;
  state.pulse = 1;
  state.dimmedCategories = new Set();

  card.mapTitle.textContent = dataset.title;
  card.axisTitle.textContent = dataset.axisTitle;
  card.axisDescription.textContent = dataset.description;
  card.axisList.innerHTML = dataset.axes
    .map(([axis, text]) => `<li><strong>${axis}</strong> ${text}</li>`)
    .join("");
  axisChips.forEach((chip, index) => {
    chip.textContent = dataset.chips[index];
  });
  currentLegend = (dataset.legend || [
    ["core", "#f0c36a", "中心ノード"],
    ["connection", "#5de7ff", "接続ノード"],
    ["friction", "#ff5f7a", "課題 / 摩擦"],
  ]).map((item) => (item.length === 2 ? [item[0], item[0], item[1]] : item));
  legendItems.innerHTML = currentLegend
    .map(
      ([key, color, label]) =>
        `<button class="legend-item" type="button" data-category="${key}"><span class="legend-dot" style="background:${color}; color:${color}"></span><span>${label}</span></button>`,
    )
    .join("");
  legendItems.querySelectorAll("[data-category]").forEach((item) => {
    item.addEventListener("click", () => toggleCategory(item.dataset.category));
  });
  modeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === mode);
  });

  selectNode(0);
}

function toggleCategory(category) {
  if (state.dimmedCategories.has(category)) {
    state.dimmedCategories.delete(category);
  } else {
    state.dimmedCategories.add(category);
  }
  legendItems.querySelectorAll("[data-category]").forEach((item) => {
    item.classList.toggle("is-muted", state.dimmedCategories.has(item.dataset.category));
  });
}

function toggleLegend() {
  const isMobile = window.matchMedia("(max-width: 820px)").matches;
  if (isMobile) {
    legendPanel.classList.toggle("is-open");
    legendToggle.setAttribute("aria-expanded", String(legendPanel.classList.contains("is-open")));
    return;
  }

  legendPanel.classList.toggle("is-collapsed");
  legendToggle.setAttribute("aria-expanded", String(!legendPanel.classList.contains("is-collapsed")));
}

function selectNode(index) {
  state.selected = index;
  state.pulse = 1;
  const node = nodes[index];
  state.targetYaw = Math.atan2(node.x * SPACE_SCALE, node.z * SPACE_SCALE + 1.8) - 0.2;
  state.targetPitch = -Math.atan2(node.y * SPACE_SCALE, 2.2) * 0.72;
  updateCard();
}

function nearestNodeFromPointer(event, maxDistance = 28) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let best = -1;
  let bestDistance = maxDistance;
  nodes.map(project).forEach((point, index) => {
    const distance = Math.hypot(point.x - x, point.y - y);
    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  });
  return best;
}

function moveByDirection(dx, dy) {
  const positions = nodes.map(project);
  const current = positions[state.selected];
  let best = state.selected;
  let bestScore = -Infinity;
  positions.forEach((point, index) => {
    if (index === state.selected) return;
    const vx = point.x - current.x;
    const vy = point.y - current.y;
    const length = Math.hypot(vx, vy) || 1;
    const alignment = (vx / length) * dx + (vy / length) * dy;
    const score = alignment * 900 - length;
    if (alignment > 0.2 && score > bestScore) {
      best = index;
      bestScore = score;
    }
  });
  selectNode(best);
}

function updatePointer(event) {
  state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
}

function removePointer(event) {
  state.pointers.delete(event.pointerId);
  if (state.pointers.size < 2) {
    state.pinchDistance = 0;
    state.pinchCooldown = false;
  }
}

function getPinchDistance() {
  const points = [...state.pointers.values()];
  if (points.length < 2) return 0;
  return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
}

function handlePinch() {
  const distance = getPinchDistance();
  if (!distance) return false;
  if (!state.pinchDistance) {
    state.pinchDistance = distance;
    return true;
  }

  const ratio = distance / state.pinchDistance;
  if (!state.pinchCooldown && ratio > 1.16) {
    stepZoom(1);
    state.pinchCooldown = true;
    state.pinchDistance = distance;
  } else if (!state.pinchCooldown && ratio < 0.86) {
    stepZoom(-1);
    state.pinchCooldown = true;
    state.pinchDistance = distance;
  }

  if (Math.abs(ratio - 1) < 0.05) state.pinchCooldown = false;
  state.moved = true;
  return true;
}

canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  updatePointer(event);
  if (state.pointers.size === 1) {
    state.drag = true;
    state.pointerId = event.pointerId;
    state.startX = event.clientX;
    state.startY = event.clientY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.moved = false;
  } else {
    state.drag = false;
    state.pinchDistance = getPinchDistance();
    state.moved = true;
  }
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
  updatePointer(event);
  if (state.pointers.size >= 2) {
    event.preventDefault();
    handlePinch();
    return;
  }

  if (state.drag && event.pointerId === state.pointerId) {
    event.preventDefault();
    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    const totalDistance = Math.hypot(event.clientX - state.startX, event.clientY - state.startY);
    if (totalDistance > 8) state.moved = true;
    state.targetYaw += dx * 0.006;
    state.targetPitch = Math.max(-1.1, Math.min(1.1, state.targetPitch + dy * 0.006));
    state.lastX = event.clientX;
    state.lastY = event.clientY;
  } else {
    state.hover = nearestNodeFromPointer(event);
  }
});

canvas.addEventListener("pointerup", (event) => {
  const wasActivePointer = event.pointerId === state.pointerId;
  event.preventDefault();
  removePointer(event);
  if (!wasActivePointer) return;
  state.drag = false;
  state.pointerId = null;
  if (!state.moved) {
    const tapRadius = event.pointerType === "touch" ? 44 : 28;
    const index = nearestNodeFromPointer(event, tapRadius);
    if (index >= 0) selectNode(index);
  }
});

canvas.addEventListener("pointercancel", (event) => {
  const wasActivePointer = event.pointerId === state.pointerId;
  removePointer(event);
  if (!wasActivePointer) return;
  state.drag = false;
  state.pointerId = null;
  state.moved = false;
});

canvas.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    if (event.ctrlKey) {
      stepZoom(event.deltaY < 0 ? 1 : -1);
      return;
    }

    const minZoom = zoomForLevel(0);
    const maxZoom = zoomForLevel(ZOOM_FACTORS.length - 1);
    state.targetZoom = Math.max(minZoom, Math.min(maxZoom, state.targetZoom - event.deltaY * 0.28));
  },
  { passive: false },
);

window.addEventListener("keydown", (event) => {
  const keys = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
  };
  if (!keys[event.key]) return;
  event.preventDefault();
  moveByDirection(...keys[event.key]);
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => applyDataset(button.dataset.mode));
});

legendToggle.addEventListener("click", toggleLegend);

window.addEventListener("resize", resize);
resize();
applyDataset("winbest");
requestAnimationFrame(render);
