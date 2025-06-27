import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Shield, Phone, BookOpen, Download, ArrowLeft, CheckCircle, Brain, Users, Heart, AlertCircle, Share2, FileText, Camera, Home, ArrowRight, Star, Zap, Github, Globe, MessageCircle } from 'lucide-react';

// 获取当前日期函数
const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

// 简单版20题测试数据
const simpleTestData = {
  "version": "1.0",
  "title": "人格特质快速筛查",
  "description": "基于核心特征的20题快速评估",
  "total_questions": 20,
  "dimensions": {
    "cluster_a": {
      "name": "A型人格特质群",
      "code": "Cluster A",
      "threshold": 3.0,
      "core_features": "奇异、偏执或退缩行为",
      "questions": [0, 1, 2, 3, 4, 5]
    },
    "cluster_b": {
      "name": "B型人格特质群",
      "code": "Cluster B", 
      "threshold": 3.2,
      "core_features": "戏剧化、情绪化或冲动行为",
      "questions": [6, 7, 8, 9, 10, 11, 12, 13]
    },
    "cluster_c": {
      "name": "C型人格特质群",
      "code": "Cluster C",
      "threshold": 3.1,
      "core_features": "焦虑或恐惧行为",
      "questions": [14, 15, 16, 17, 18, 19]
    }
  },
  "high_risk_questions": [8, 9],
  "questions": [
    // A型人格特质群 (6题)
    "我经常怀疑他人对我有恶意",
    "我很难相信他人的动机是善意的",
    "我更喜欢独自一人，很少寻求他人陪伴",
    "我对建立亲密关系没有强烈欲望",
    "我有时会有一些不寻常的感知体验",
    "我相信一些他人认为奇怪的想法",
    
    // B型人格特质群 (8题)
    "我经常不遵守社会规范或法律要求",
    "我做决定时很少考虑后果，比较冲动",
    "我有过自伤行为或自杀想法",
    "我的情绪变化很快且强烈",
    "我在不是注意焦点时会感到不舒服",
    "我的情绪表达经常显得戏剧化和夸张",
    "我认为自己比大多数人更重要或特殊",
    "我需要他人持续的赞美和关注",
    
    // C型人格特质群 (6题)
    "我会避免需要大量人际接触的工作活动",
    "我不愿意与人交往，除非确定会被喜欢",
    "我很难在没有他人大量建议的情况下做日常决定",
    "我需要他人为我生活的大部分重要领域承担责任",
    "我过分关注细节、规则和清单",
    "我的完美主义干扰了任务的完成"
  ]
};

// 完整版80题测试数据
const fullTestData = {
  "version": "2.0",
  "title": "人格障碍倾向筛查量表",
  "description": "基于DSM-5诊断标准的80题评估工具",
  "total_questions": 80,
  "dimensions": {
    "paranoid": {
      "name": "偏执型人格特质",
      "code": "PPD",
      "threshold": 3.5,
      "core_features": "人际信任与猜疑",
      "questions": [0, 1, 2, 3, 4, 5, 6, 7]
    },
    "schizoid": {
      "name": "分裂样人格特质", 
      "code": "SzPD",
      "threshold": 3.3,
      "core_features": "社交兴趣与情感表达",
      "questions": [8, 9, 10, 11, 12, 13, 14, 15]
    },
    "schizotypal": {
      "name": "分裂型人格特质",
      "code": "STPD", 
      "threshold": 3.6,
      "core_features": "认知感知与社交焦虑",
      "questions": [16, 17, 18, 19, 20, 21, 22, 23]
    },
    "antisocial": {
      "name": "反社会人格特质",
      "code": "ASPD",
      "threshold": 3.8,
      "core_features": "社会规范与冲动控制",
      "questions": [24, 25, 26, 27, 28, 29, 30, 31]
    },
    "borderline": {
      "name": "边缘型人格特质",
      "code": "BPD", 
      "threshold": 4.0,
      "core_features": "情绪稳定性与人际关系",
      "questions": [32, 33, 34, 35, 36, 37, 38, 39]
    },
    "histrionic": {
      "name": "表演型人格特质",
      "code": "HPD",
      "threshold": 3.7,
      "core_features": "注意寻求与情感表达",
      "questions": [40, 41, 42, 43, 44, 45, 46, 47]
    },
    "narcissistic": {
      "name": "自恋型人格特质", 
      "code": "NPD",
      "threshold": 3.9,
      "core_features": "自我重要感与共情能力",
      "questions": [48, 49, 50, 51, 52, 53, 54, 55]
    },
    "avoidant": {
      "name": "回避型人格特质",
      "code": "AvPD", 
      "threshold": 3.4,
      "core_features": "社交回避与拒绝敏感",
      "questions": [56, 57, 58, 59, 60, 61, 62, 63]
    },
    "dependent": {
      "name": "依赖型人格特质",
      "code": "DPD",
      "threshold": 3.6,
      "core_features": "决策依赖与分离焦虑",
      "questions": [64, 65, 66, 67, 68, 69, 70, 71]
    },
    "obsessive": {
      "name": "强迫型人格特质",
      "code": "OCPD",
      "threshold": 3.5,
      "core_features": "完美主义与控制需求",
      "questions": [72, 73, 74, 75, 76, 77, 78, 79]
    }
  },
  "high_risk_questions": [36, 37],
  "questions": [
    // 偏执型人格特质 (PPD) - 8题
    "我经常怀疑他人对我有恶意或想要伤害我",
    "我很难相信他人的动机是善意的，即使没有明确证据",
    "我倾向于将他人的中性评论解读为批评或攻击",
    "我经常担心朋友或同事会背叛我",
    "我对他人的忠诚度有持续的怀疑",
    "我很难原谅他人的过错，会长期记恨",
    "我经常感觉被他人误解或不公正对待",
    "我倾向于对批评或感知到的侮辱反应强烈",

    // 分裂样人格特质 (SzPD) - 8题  
    "我更喜欢独自一人，很少寻求他人陪伴",
    "我对建立亲密关系没有强烈欲望",
    "我很少体验到强烈的快乐或其他情感",
    "我对他人的赞美或批评都反应平淡",
    "我很少有亲密的朋友或知己",
    "我对性经历的兴趣很低",
    "我更喜欢独立完成工作，避免团队合作",
    "我经常被他人认为是冷漠或疏离的",

    // 分裂型人格特质 (STPD) - 8题
    "我有时会有一些不寻常的感知体验",
    "我相信一些他人认为奇怪的想法或迷信",
    "我的思维方式经常被他人认为是古怪的",
    "我在社交场合经常感到焦虑，即使是熟悉的人",
    "我有时觉得能感知到他人察觉不到的事物",
    "我的言语表达方式有时让他人难以理解",
    "我经常怀疑他人对我有特殊的关注或意图",
    "我在人际关系中经常感到不适，更喜欢保持距离",

    // 反社会人格特质 (ASPD) - 8题
    "我经常不遵守社会规范或法律要求",
    "我有时会为了个人利益而欺骗他人",
    "我做决定时很少考虑后果，比较冲动",
    "我很容易与他人发生冲突或争执",
    "我对他人的安全或感受不太关心",
    "我很难从错误或惩罚中学到教训",
    "我很少为自己的行为感到内疚或后悔",
    "我在工作或经济责任方面经常不够负责",

    // 边缘型人格特质 (BPD) - 8题
    "我会竭尽全力避免被他人抛弃，即使是想象中的",
    "我的人际关系往往不稳定，在理想化和贬低之间摇摆",
    "我对自己的身份认同经常感到困惑或不稳定",
    "我在冲动行为方面有困难（如消费、性行为、物质使用等）",
    "我有过自伤行为或自杀想法",
    "我的情绪变化很快且强烈，通常持续几小时",
    "我经常感到内心空虚",
    "我很难控制愤怒，经常有不当的愤怒表达",

    // 表演型人格特质 (HPD) - 8题
    "我在不是注意焦点时会感到不舒服",
    "我与他人的互动经常带有不当的性暗示或挑逗行为",
    "我的情绪表达变化快速且肤浅",
    "我经常用外表来吸引他人注意",
    "我的言语表达缺乏细节，比较印象化",
    "我的情绪表达经常显得戏剧化和夸张",
    "我容易受他人或环境影响",
    "我倾向于认为关系比实际情况更亲密",

    // 自恋型人格特质 (NPD) - 8题
    "我认为自己比大多数人更重要或特殊",
    "我经常幻想自己获得巨大成功、权力或完美爱情",
    "我相信自己是独特的，只有特殊的人才能理解我",
    "我需要他人持续的赞美和关注",
    "我认为自己应该得到特殊待遇",
    "我经常利用他人来达到自己的目标",
    "我很难理解或关心他人的感受和需要",
    "我经常嫉妒他人或认为他人嫉妒我",

    // 回避型人格特质 (AvPD) - 8题
    "我会避免需要大量人际接触的工作活动",
    "我不愿意与人交往，除非确定会被喜欢",
    "我在亲密关系中表现克制，害怕被羞辱",
    "我在社交场合总是担心被批评或拒绝",
    "我因为感觉自己不够好而在新的人际场合中退缩",
    "我认为自己在社交方面笨拙、不讨人喜欢",
    "我极不愿意承担个人风险或参与新活动",
    "我对批评或不赞同极其敏感",

    // 依赖型人格特质 (DPD) - 8题
    "我很难在没有他人大量建议的情况下做日常决定",
    "我需要他人为我生活的大部分重要领域承担责任",
    "我很难表达不同意见，担心失去支持",
    "我很难独立开始项目，缺乏自信",
    "我会过度努力获得他人的照顾和支持",
    "我独自一人时感到不舒服或无助",
    "当亲密关系结束时，我会急切寻找新的关系来获得照顾",
    "我过度担心被留下来照顾自己",

    // 强迫型人格特质 (OCPD) - 8题
    "我过分关注细节、规则和清单，以至于忽略了活动的主要目的",
    "我的完美主义干扰了任务的完成",
    "我过度投入工作，以至于排除了休闲活动和友谊",
    "我在道德和价值观方面过分严格和死板",
    "我很难丢弃破旧或无价值的物品",
    "我不愿意委托他人工作，除非他们完全按我的方式做",
    "我对自己和他人都采取吝啬的消费方式",
    "我表现出固执和顽固的特点"
  ]
};

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'intro', 'test', 'results'
  const [testType, setTestType] = useState<'simple' | 'full'>('simple');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [showPatternAlert, setShowPatternAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const testData = testType === 'simple' ? simpleTestData : fullTestData;

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 重置测试状态
  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(testData.total_questions).fill(0));
    setTimeSpent(0);
    setQuestionTimes([]);
    setShowCrisisAlert(false);
    setShowPatternAlert(false);
    setSelectedDimension(null);
  };

  // 开始测试
  const startTest = (type: 'simple' | 'full') => {
    setTestType(type);
    resetTest();
    setCurrentPage('intro');
  };

  // 计时器
  useEffect(() => {
    if (currentPage === 'test') {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentPage]);

  // 题目超时提醒和时间记录
  useEffect(() => {
    if (currentPage === 'test') {
      setQuestionStartTime(Date.now());
      const timeout = setTimeout(() => {
        if (answers[currentQuestion] === 0) {
          alert('💡 建议：请根据第一直觉选择，过度思考可能影响结果准确性');
        }
      }, 120000); // 2分钟提醒
      return () => clearTimeout(timeout);
    }
  }, [currentQuestion, currentPage]);

  // 反模式检测
  const checkResponsePattern = (newAnswers: number[]) => {
    const lastTenAnswers = newAnswers.slice(-10);
    if (lastTenAnswers.length === 10 && lastTenAnswers.every(answer => answer === lastTenAnswers[0] && answer !== 0)) {
      setShowPatternAlert(true);
    }
  };

  // 危机检测
  const checkCrisisResponse = (questionIndex: number, value: number) => {
    if (testData.high_risk_questions.includes(questionIndex) && value >= 4) {
      setShowCrisisAlert(true);
    }
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    // 记录答题时间
    const timeForQuestion = Date.now() - questionStartTime;
    const newQuestionTimes = [...questionTimes];
    newQuestionTimes[currentQuestion] = timeForQuestion;
    setQuestionTimes(newQuestionTimes);

    // 检测危机回答
    checkCrisisResponse(currentQuestion, value);

    // 检测反模式
    checkResponsePattern(newAnswers);

    // 自动跳转到下一题
    setTimeout(() => {
      if (currentQuestion < testData.total_questions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentPage('results');
      }
    }, 500);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getCurrentDimension = () => {
    let currentDimension = null;
    Object.entries(testData.dimensions).forEach(([key, dimension]) => {
      if (dimension.questions.includes(currentQuestion)) {
        currentDimension = dimension;
      }
    });
    return currentDimension;
  };

  const calculateResults = () => {
    const results: any = {};
    const highRiskDimensions: string[] = [];
    
    Object.entries(testData.dimensions).forEach(([key, dimension]) => {
      const relevantAnswers = dimension.questions.map(qIndex => answers[qIndex]);
      const average = relevantAnswers.reduce((sum, answer) => sum + answer, 0) / relevantAnswers.length;
      
      let level = '';
      let riskLevel = '';
      
      if (average >= dimension.threshold) {
        level = '显著倾向';
        riskLevel = 'high';
        highRiskDimensions.push(key);
      } else if (average >= dimension.threshold - 0.5) {
        level = '中等倾向';
        riskLevel = 'medium';
      } else if (average >= 2.0) {
        level = '轻微倾向';
        riskLevel = 'low';
      } else {
        level = '正常范围';
        riskLevel = 'normal';
      }
      
      results[key] = {
        name: dimension.name,
        code: dimension.code,
        score: average,
        level: level,
        riskLevel: riskLevel,
        threshold: dimension.threshold
      };
    });
    
    const comorbidityRisk = highRiskDimensions.length >= 3 ? 'high' : 
                           highRiskDimensions.length >= 2 ? 'medium' : 'low';
    
    return { results, highRiskDimensions, comorbidityRisk };
  };

  const getDetailedInterpretation = (dimensionKey: string, score: number, threshold: number) => {
    const traitData: any = {
      paranoid: {
        name: "偏执型特质",
        description: "以普遍性不信任和怀疑为特征，倾向于将他人的动机解释为恶意。临床表现为过度警惕、敌意归因和长期戒备状态。",
        coreFeatures: "警觉性 · 风险预判 · 防御机制",
        lowScore: "您的审慎在安全敏感岗位（如金融审计）具有优势，类似FBI反欺诈专家怀特·赫兹菲尔德的工作方式。",
        highScore: "当产生持续性被害妄想时，推荐认知重构技术："证据检验表"（记录支持/反对怀疑的客观事实）。",
        balanceTip: "信任如眼睛，既需保护也需睁开。"
      },
      borderline: {
        name: "边缘型特质",
        description: "表现为人际关系、自我形象和情感的不稳定，伴有显著冲动行为。核心挑战是强烈的被遗弃恐惧和情绪失调。",
        coreFeatures: "情感强烈 · 关系敏感 · 身份波动",
        lowScore: "您的共情深度在创伤咨询领域价值非凡，如心理学家玛莎·林娜翰创立辩证行为疗法的经历。",
        highScore: "当出现自伤冲动时，立即使用"TIPP技术"：冰水敷脸→高强度运动→ paced breathing→渐进肌肉放松。",
        balanceTip: "情绪如河流，疏浚比堵截更重要。"
      },
      antisocial: {
        name: "反社会型特质",
        description: "持续漠视并侵犯他人权利，缺乏悔恨感。表现为欺骗性、冲动性和攻击性行为模式，常始于15岁前。",
        coreFeatures: "规则挑战 · 目标优先 · 低共情",
        lowScore: "您的危机决策力在急诊外科等高压领域至关重要，仿若战地医生大卫·纳瓦的战场救援。",
        highScore: "当出现伤害倾向时，"后果推演"训练：预判行为对自身/他人/社会的三重影响链。",
        balanceTip: "自由如飞鸟，认清领空方得翱翔。"
      },
      narcissistic: {
        name: "自恋型特质",
        description: "需要他人钦佩的普遍模式，具有夸大、特权感和共情缺乏特征。存在显性（外显傲慢）与隐性（脆弱敏感）亚型。",
        coreFeatures: "自我专注 · 成就驱动 · 认可需求",
        lowScore: "您的领导魄力在创业初期具有决定性作用，如史蒂夫·乔布斯重塑科技行业的自信。",
        highScore: "当遭遇"自恋损伤"时，尝试"匿名贡献法"：完成三次不公开的利他行为。",
        balanceTip: "自信如古树，根系深扎才经风雨。"
      },
      avoidant: {
        name: "回避型特质",
        description: "因害怕批评、否定或排斥而回避人际接触，伴有能力不足感和过度敏感。社会隔离常导致抑郁共病。",
        coreFeatures: "评价恐惧 · 社交抑制 · 安全优先",
        lowScore: "您的深度思考在理论研究领域优势显著，如数学家佩雷尔曼破解庞加莱猜想的孤独征程。",
        highScore: "当回避行为影响职业发展时，实施"梯度暴露"：从文字交流→语音留言→视频通话→短暂会面的渐进练习。",
        balanceTip: "安全区如温室，适度通风方能茁壮。"
      },
      dependent: {
        name: "依赖型特质",
        description: "过度需要被照顾导致顺从和依附行为，伴有分离恐惧。决策困难、自我贬低和耐受虐待是典型表现。",
        coreFeatures: "依附行为 · 决策焦虑 · 取悦倾向",
        lowScore: "您的支持能力在护理教育领域极为珍贵，如弗洛伦斯·南丁格尔创建现代护理体系时的协作精神。",
        highScore: "当产生病理性依赖时，进行"自主训练"：每日完成3件独立决定的小事（如选择午餐）。",
        balanceTip: "依赖如藤蔓，自有主干方成林。"
      },
      obsessive: {
        name: "强迫型特质",
        description: "执着于秩序、完美控制和规则，牺牲灵活性、开放性和效率。常伴有过度谨慎和道德僵化。",
        coreFeatures: "秩序需求 · 完美主义 · 控制执着",
        lowScore: "您的精密思维在航天工程等关键领域不可或缺，如同NASA工程师应对阿波罗13号危机的严谨。",
        highScore: "当完美主义导致瘫痪时，采用"80/20法则"：用20%精力达成80%效果，剩余时间迭代优化。",
        balanceTip: "精准如瑞士表，定期校时更可靠。"
      },
      schizoid: {
        name: "分裂样特质",
        description: "社交关系脱离和情感表达范围受限的普遍模式。表现为独处偏好、情感淡漠和快感缺乏，非精神病性障碍。",
        coreFeatures: "情感局限 · 独处偏好 · 低社交需求",
        lowScore: "您的专注力在基础科研领域价值非凡，如居里夫人四年如一日提炼镭的坚持。",
        highScore: "当疏离影响必要联结时，尝试"定向社交"：每月参加1次兴趣小组（如天文观测俱乐部）。",
        balanceTip: "孤独如深海，声呐联络可探新境。"
      },
      histrionic: {
        name: "表演型特质",
        description: "过度情绪化和寻求注意的普遍模式。表现为戏剧化表达、易受暗示和用外表吸引关注等特征。",
        coreFeatures: "情感夸张 · 焦点需求 · 易受暗示",
        lowScore: "您的表现力在舞台艺术领域独具优势，如莎拉·伯恩哈特革新戏剧表演的感染力。",
        highScore: "当出现病态求关注行为时，实践"观众筛选"：只为值得的人展现才华（如真实欣赏者）。",
        balanceTip: "表现如彩虹，需有雨露方显形。"
      },
      schizotypal: {
        name: "分裂型特质",
        description: "社交和人际关系缺陷，伴有认知或知觉扭曲及行为怪异。存在牵连观念、古怪信念和不寻常知觉体验。",
        coreFeatures: "古怪信念 · 知觉异常 · 关系焦虑",
        lowScore: "您的非常规思维在艺术创新中极具价值，如达利超现实主义画作开启的新维度。",
        highScore: "当现实检验受损时，使用"三重验证法"：记录事件→寻找物理证据→咨询可信者意见。",
        balanceTip: "想象如星轨，锚定大地观天文。"
      },
      // 简单版的三大类群
      cluster_a: {
        name: "A型人格特质群",
        description: "包含偏执型、分裂样型和分裂型特质，以奇异、偏执或退缩行为为特征。",
        coreFeatures: "警觉性 · 关系距离 · 认知特异",
        lowScore: "您的独特思维方式在创造性领域具有潜在优势，能从不同角度看待问题。",
        highScore: "注意培养现实检验能力，尝试多元信息验证法：至少从三个独立渠道确认重要信息。",
        balanceTip: "特立独行固然可贵，与世界保持联结更为重要。"
      },
      cluster_b: {
        name: "B型人格特质群",
        description: "包含反社会型、边缘型、自恋型和表演型特质，以情绪不稳、冲动和戏剧化行为为特征。",
        coreFeatures: "情感强度 · 关系波动 · 行为张力",
        lowScore: "您的情感丰富度和表现力在人际交往和创造性工作中具有独特价值。",
        highScore: "尝试ABC情绪管理法：识别事件(A)→觉察信念(B)→关注后果(C)，建立情绪-思维-行为连接。",
        balanceTip: "情感如火，既能照亮也能燃烧，掌握调节是关键。"
      },
      cluster_c: {
        name: "C型人格特质群", 
        description: "包含回避型、依赖型和强迫型特质，以焦虑、恐惧和过度控制行为为特征。",
        coreFeatures: "安全需求 · 秩序执着 · 不确定性焦虑",
        lowScore: "您的谨慎性和细节关注在需要精确和稳定的工作中具有显著优势。",
        highScore: "尝试"不确定性耐受训练"：每周尝试一件小事的新方法，逐步提高舒适区弹性。",
        balanceTip: "安全感既来自稳固的堡垒，也来自适应变化的能力。"
      }
    };

    // 检查是否存在该维度的数据
    if (!traitData[dimensionKey]) {
      return "未能找到该维度的详细解释。";
    }

    const trait = traitData[dimensionKey];
    const isHighScore = score >= threshold;
    
    // 构建更详细的解释
    return `
<span class="font-bold">${trait.name}</span>

<span class="text-gray-600">${trait.description}</span>

<span class="font-semibold mt-3">核心特征：</span> ${trait.coreFeatures}

<span class="font-semibold mt-3">您的表现：</span>
${isHighScore ? `<span class="text-red-700">≥${threshold}分：</span> ${trait.highScore}` : `<span class="text-green-700"><${threshold}分：</span> ${trait.lowScore}`}

<span class="font-semibold mt-3">平衡提示：</span> ${trait.balanceTip}
`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  // 下载PDF报告
  const downloadPDF = () => {
    const { results } = calculateResults();
    const reportContent = `
人格特质筛查报告

测试版本：${testData.title}
完成时间：${new Date().toLocaleString()}
测试用时：${formatTime(timeSpent)}

重要免责声明：
本测试仅用于评估人格特质倾向，绝不能替代医学诊断。
人格障碍的诊断必须由具备资质的精神科医生或临床心理学家完成。
本工具基于DSM-5标准设计，但不具备诊断效力。

评估结果：
${Object.entries(results).map(([key, data]) => 
  `${data.name}（${data.code}）：${data.score.toFixed(2)}/5.0 - ${data.level}`
).join('\n')}

建议：
如果多个维度得分较高且持续影响日常生活，建议咨询精神科医生或注册心理师。

24小时心理援助热线：400-161-9995
    `;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `人格特质筛查报告_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 页面截图
  const captureScreenshot = async () => {
    try {
      // 使用html2canvas库的替代方案 - 简单的DOM截图
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // 创建一个简单的报告图片
      canvas.width = 800;
      canvas.height = 600;
      
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 600);
        
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('人格特质筛查报告', 50, 50);
        
        ctx.font = '16px Arial';
        ctx.fillText(`测试版本：${testData.title}`, 50, 100);
        ctx.fillText(`完成时间：${new Date().toLocaleString()}`, 50, 130);
        
        const { results } = calculateResults();
        let yPos = 180;
        Object.entries(results).forEach(([key, data]) => {
          ctx.fillText(`${data.name}：${data.score.toFixed(2)}/5.0 - ${data.level}`, 50, yPos);
          yPos += 30;
        });
        
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('重要：本测试不能替代医学诊断', 50, yPos + 50);
      }
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `人格特质筛查报告_${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      alert('截图功能暂时不可用，请使用PDF下载功能');
    }
  };

  // 分享功能
  const shareResults = async (method: 'link' | 'text') => {
    const { results } = calculateResults();
    const shareText = `我完成了人格特质筛查测试。这是一个基于DSM-5标准的评估工具，仅供参考，不能替代医学诊断。如需了解详情，请访问测试页面。`;
    
    if (method === 'link' && navigator.share) {
      try {
        await navigator.share({
          title: '人格特质筛查测试',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        // 如果分享失败，复制到剪贴板
        navigator.clipboard.writeText(shareText + '\n' + window.location.href);
        alert('分享链接已复制到剪贴板');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('分享文本已复制到剪贴板');
    }
  };

  // 免责声明组件
  const DisclaimerBanner = () => (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl">
      <div className="flex items-start">
        <AlertTriangle className="text-red-500 mr-3 mt-1 flex-shrink-0" size={20} />
        <div>
          <h3 className="text-sm font-bold text-red-800 mb-2">📢 重要免责声明</h3>
          <div className="text-red-700 text-xs space-y-1">
            <p>本测试仅用于评估人格特质倾向，<span className="underline font-semibold">绝不能替代医学诊断</span>。</p>
            <p>人格障碍的诊断必须由具备资质的精神科医生或临床心理学家完成。</p>
            <p>本工具基于DSM-5标准设计，但<span className="font-semibold">不具备诊断效力</span>。</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 危机警示弹窗
  const CrisisAlert = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-red-800 mb-4">重要提示</h3>
          <p className="text-gray-700 mb-6">
            您提到曾有自伤行为或相关想法。如果您目前正在经历困扰，建议立即联系帮助：
          </p>
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <p className="font-bold text-red-700 mb-2">24小时心理危机干预热线：</p>
            <a href="tel:400-161-9995" className="text-2xl font-bold text-red-600 hover:text-red-700">
              ☎️ 400-161-9995
            </a>
          </div>
          <button
            onClick={() => setShowCrisisAlert(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            我已了解，继续测试
          </button>
        </div>
      </div>
    </div>
  );

  // 反模式警示弹窗
  const PatternAlert = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <AlertTriangle className="text-yellow-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-yellow-800 mb-4">作答提醒</h3>
          <p className="text-gray-700 mb-6">
            检测到您连续选择了相同选项。为确保结果准确性，请根据每题的具体内容真实反映您的感受差异。
          </p>
          <button
            onClick={() => setShowPatternAlert(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            我会认真作答
          </button>
        </div>
      </div>
    </div>
  );

  // 下载模态框
  const DownloadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <Download className="text-blue-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-4">下载报告</h3>
          <p className="text-gray-600 mb-6">选择您希望的报告格式：</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                downloadPDF();
                setShowDownloadModal(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
            >
              <FileText className="mr-2" size={20} />
              下载文本报告
            </button>
            <button
              onClick={() => {
                captureScreenshot();
                setShowDownloadModal(false);
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
            >
              <Camera className="mr-2" size={20} />
              下载图片报告
            </button>
          </div>
          <button
            onClick={() => setShowDownloadModal(false)}
            className="mt-4 text-gray-500 hover:text-gray-700 font-semibold"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );

  // 分享模态框
  const ShareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <Share2 className="text-green-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-4">分享测试</h3>
          <p className="text-gray-600 mb-6">选择分享方式：</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                shareResults('link');
                setShowShareModal(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              分享测试链接
            </button>
            <button
              onClick={() => {
                shareResults('text');
                setShowShareModal(false);
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              分享测试介绍
            </button>
          </div>
          <button
            onClick={() => setShowShareModal(false)}
            className="mt-4 text-gray-500 hover:text-gray-700 font-semibold"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );

  // 主页
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Brain className="text-blue-600" size={48} />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                人格特质筛查系统
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                基于DSM-5标准的科学评估工具
              </p>
            </div>

            <DisclaimerBanner />

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* 简单版 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 hover:border-green-300 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Zap className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-4">快速筛查版</h3>
                  <div className="text-green-700 space-y-3 mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock size={16} />
                      <span className="font-semibold">约10-15分钟</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <FileText size={16} />
                      <span className="font-semibold">20题评估</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Users size={16} />
                      <span className="font-semibold">3大特质群</span>
                    </div>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg mb-6">
                    <p className="text-sm text-green-700">
                      <span className="font-semibold">适用于：</span>初步了解人格特质倾向，快速筛查评估
                    </p>
                  </div>
                  <button
                    onClick={() => startTest('simple')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    开始快速筛查
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
              </div>

              {/* 完整版 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">完整评估版</h3>
                  <div className="text-blue-700 space-y-3 mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock size={16} />
                      <span className="font-semibold">约25-35分钟</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <FileText size={16} />
                      <span className="font-semibold">80题评估</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Brain size={16} />
                      <span className="font-semibold">10种特质维度</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg mb-6">
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">适用于：</span>深入了解人格特质，获得详细分析报告
                    </p>
                  </div>
                  <button
                    onClick={() => startTest('full')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    开始完整评估
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-8">
              <div className="flex items-start">
                <Users className="text-amber-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-bold text-amber-800 mb-3">👥 使用说明</h3>
                  <div className="text-amber-700 space-y-2 text-sm">
                    <p><span className="font-semibold">适用人群：</span>18岁以上成年人</p>
                    <p><span className="font-semibold">评估期间：</span>近6个月的感受和行为</p>
                    <p><span className="font-semibold">作答原则：</span>根据第一直觉选择，避免过度思考</p>
                    <p><span className="font-semibold">隐私保护：</span>所有数据仅在本地处理，不会上传或存储</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                如有疑问或需要帮助，请联系
                <button className="text-blue-600 hover:text-blue-700 underline ml-1 font-semibold">
                  技术支持
                </button>
              </p>
            </div>
            
            {/* 开发者信息 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 max-w-md mx-auto mt-8">
              <div className="text-sm text-gray-600 mb-3 text-center">
                当前版本 v1.0.1（{getCurrentDate()}）
              </div>
              <div className="flex items-center justify-center gap-6 text-sm">
                <a 
                  href="https://github.com/forsakens0ul" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  GitHub主页
                </a>
                <span className="text-gray-400">by</span>
                <a 
                  href="https://www.chalice.lol/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  forsakensoul
                </a>
                <div className="relative group">
                  <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    公众号
                  </div>
                  {/* QR Code Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                      <div className="text-xs text-gray-600 mb-2 text-center whitespace-nowrap">扫码关注公众号</div>
                      <img 
                        src="/data/wechatQR.jpg" 
                        alt="微信公众号二维码" 
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center text-gray-600 hover:text-gray-800 font-semibold"
              >
                <Home className="mr-2" size={20} />
                返回首页
              </button>
            </div>

            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Brain className="text-blue-600" size={48} />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {testData.title}
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                {testData.description}
              </p>
              <p className="text-lg text-red-600 font-semibold mt-2">
                （非诊断工具 - 仅供筛查参考）
              </p>
            </div>

            <DisclaimerBanner />

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <Clock className="text-blue-600 mr-3" size={28} />
                  <h3 className="text-lg font-bold text-blue-800">🕒 测试详情</h3>
                </div>
                <div className="text-blue-700 space-y-2">
                  <p><span className="font-semibold">题目数量：</span>{testData.total_questions}题</p>
                  <p><span className="font-semibold">预计时长：</span>{testType === 'simple' ? '10-15分钟' : '25-35分钟'}</p>
                  <p><span className="font-semibold">评估维度：</span>{Object.keys(testData.dimensions).length}种特质</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-600 mr-3" size={28} />
                  <h3 className="text-lg font-bold text-green-800">📝 作答指导</h3>
                </div>
                <div className="text-green-700 space-y-2">
                  <p><span className="font-semibold">评估期间：</span>近6个月感受</p>
                  <p><span className="font-semibold">选择标准：</span>1=完全不符合 → 5=完全符合</p>
                  <p><span className="font-semibold">作答原则：</span>根据第一直觉选择</p>
                  <p><span className="font-semibold">操作方式：</span>选择后自动跳转下题</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                <div className="flex items-center mb-4">
                  <Shield className="text-purple-600 mr-3" size={28} />
                  <h3 className="text-lg font-bold text-purple-800">🔒 隐私保护</h3>
                </div>
                <div className="text-purple-700 space-y-2">
                  <p><span className="font-semibold">数据处理：</span>本地计算</p>
                  <p><span className="font-semibold">信息存储：</span>不保存任何数据</p>
                  <p><span className="font-semibold">结果用途：</span>仅生成个人报告</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-10">
              <div className="flex items-start">
                <Users className="text-amber-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-bold text-amber-800 mb-3">👥 适用人群说明</h3>
                  <div className="text-amber-700 space-y-2">
                    <p><span className="font-semibold">适用：</span>18岁以上成年人</p>
                    <p><span className="font-semibold">不适用：</span>18岁以下未成年人、急性精神状态、物质影响下</p>
                    <p><span className="font-semibold">建议：</span>在相对稳定的心理状态下完成测试</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setAnswers(new Array(testData.total_questions).fill(0));
                  setCurrentPage('test');
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-2xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                我已充分理解并开始评估
              </button>
              <p className="text-gray-500 text-sm mt-4">
                点击开始即表示您同意上述说明并确认符合测试条件
              </p>
            </div>
            
            {/* 开发者信息 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 max-w-md mx-auto mt-8">
              <div className="text-sm text-gray-600 mb-3 text-center">
                当前版本 v1.0.1（{getCurrentDate()}）
              </div>
              <div className="flex items-center justify-center gap-6 text-sm">
                <a 
                  href="https://github.com/forsakens0ul" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  GitHub主页
                </a>
                <span className="text-gray-400">by</span>
                <a 
                  href="https://www.chalice.lol/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  forsakensoul
                </a>
                <div className="relative group">
                  <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    公众号
                  </div>
                  {/* QR Code Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                      <div className="text-xs text-gray-600 mb-2 text-center whitespace-nowrap">扫码关注公众号</div>
                      <img 
                        src="/data/wechatQR.jpg" 
                        alt="微信公众号二维码" 
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'test') {
    const progress = ((currentQuestion + 1) / testData.total_questions) * 100;
    const currentDimension = getCurrentDimension();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
            <DisclaimerBanner />

            {/* 进度条和信息 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-gray-700">
                    {currentQuestion + 1} / {testData.total_questions}
                  </span>
                  {currentDimension && (
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {currentDimension.name}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  用时: {formatTime(timeSpent)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-gray-600">{progress.toFixed(1)}% 完成</span>
              </div>
            </div>

            {/* 题目 */}
            <div className="text-center mb-10">
              <div className="bg-gray-50 p-8 rounded-2xl mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                  {testData.questions[currentQuestion]}
                </h2>
              </div>

              {/* 维度归属提示 */}
              {currentDimension && (
                <div className="mb-8">
                  <p className="text-sm text-gray-500">
                    该题评估：{currentDimension.name}（{currentDimension.core_features}）
                  </p>
                </div>
              )}
              
              {/* 选项 - 响应式布局 */}
              <div className={`max-w-4xl mx-auto ${
                isMobile 
                  ? 'space-y-3' 
                  : 'grid grid-cols-5 gap-4'
              }`}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      answers[currentQuestion] === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-blue-300 text-gray-600 hover:bg-blue-50 shadow-sm'
                    } ${isMobile ? 'w-full text-left flex items-center' : 'text-center'}`}
                  >
                    <div className={isMobile ? 'flex items-center w-full' : 'text-center'}>
                      <div className={`text-2xl font-bold ${isMobile ? 'mr-4' : 'mb-2'}`}>
                        {value}
                      </div>
                      <div className="text-sm font-medium">
                        {value === 1 && '完全不符合'}
                        {value === 2 && '基本不符合'}
                        {value === 3 && '不确定'}
                        {value === 4 && '基本符合'}
                        {value === 5 && '完全符合'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 导航按钮 */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md hover:shadow-lg'
                }`}
              >
                <ArrowLeft size={20} className="mr-2" />
                上一题
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  {answers[currentQuestion] > 0 ? '✓ 已选择，即将自动跳转' : '请选择答案'}
                </p>
              </div>

              <div className="w-24"></div>
            </div>
          </div>
        </div>

        {/* 弹窗 */}
        {showCrisisAlert && <CrisisAlert />}
        {showPatternAlert && <PatternAlert />}
      </div>
    );
  }

  // 结果页面
  const { results, highRiskDimensions, comorbidityRisk } = calculateResults();
  const averageTime = questionTimes.length > 0 ? 
    questionTimes.reduce((sum, time) => sum + time, 0) / questionTimes.length / 1000 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center text-gray-600 hover:text-gray-800 font-semibold"
            >
              <Home className="mr-2" size={20} />
              返回首页
            </button>
          </div>

          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="text-green-600" size={48} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">筛查报告</h1>
            <p className="text-lg text-gray-600">基于DSM-5标准的人格特质评估结果</p>
            <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-500">
              <span>完成时间: {formatTime(timeSpent)}</span>
              <span>平均答题时间: {averageTime.toFixed(1)}秒/题</span>
              <span>评估维度: {Object.keys(testData.dimensions).length}项</span>
            </div>
          </div>

          {/* 开发者信息 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 max-w-md mx-auto mb-12">
            <div className="text-sm text-gray-600 mb-3 text-center">
              当前版本 v1.0.1（{getCurrentDate()}）
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a 
                href="https://github.com/forsakens0ul" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                GitHub主页
              </a>
              <span className="text-gray-400">by</span>
              <a 
                href="https://www.chalice.lol/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                forsakensoul
              </a>
              <div className="relative group">
                <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  公众号
                </div>
                {/* QR Code Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                    <div className="text-xs text-gray-600 mb-2 text-center whitespace-nowrap">扫码关注公众号</div>
                    <img 
                      src="/data/wechatQR.jpg" 
                      alt="微信公众号二维码" 
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              </div>
            </div>
          </div>

          <DisclaimerBanner />

          {/* 高风险警示 */}
          {(highRiskDimensions.length > 0 || comorbidityRisk === 'high') && (
            <div className="bg-red-50 border-l-4 border-red-500 p-8 mb-10 rounded-r-2xl">
              <div className="flex items-start">
                <AlertTriangle className="text-red-500 mr-4 mt-1 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ 重要提示</h3>
                  <div className="text-red-700 space-y-3">
                    {highRiskDimensions.length > 0 && (
                      <p className="font-semibold">
                        检测到 {highRiskDimensions.length} 个维度存在显著倾向特征。
                      </p>
                    )}
                    {comorbidityRisk === 'high' && (
                      <p className="font-semibold">
                        多维度高分提示可能存在共病风险。
                      </p>
                    )}
                    <p className="bg-red-100 p-4 rounded-lg">
                      <span className="font-bold">强烈建议：</span>
                      请尽快咨询精神科医生或注册临床心理师进行评估。
                      本筛查结果不能替代医学诊断，但可作为寻求帮助的重要参考。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 结果概览 */}
          <div className="grid lg:grid-cols-2 gap-10 mb-10">
            {/* 得分可视化 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Brain className="mr-3 text-blue-600" size={28} />
                特质得分分析
              </h3>
              <div className="space-y-4">
                {Object.entries(results).map(([key, data]) => (
                  <div 
                    key={key} 
                    className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                    onClick={() => setSelectedDimension(selectedDimension === key ? null : key)}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="font-bold text-gray-800">{data.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({data.code})</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm px-3 py-1 rounded-full font-semibold ${
                          data.riskLevel === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : data.riskLevel === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : data.riskLevel === 'low'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {data.level}
                        </span>
                        <span className="text-sm font-bold text-gray-600">
                          {data.score.toFixed(2)}/5.0
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-4 mr-4 shadow-inner">
                        <div 
                          className={`h-4 rounded-full transition-all duration-1000 ${
                            data.riskLevel === 'high' 
                              ? 'bg-gradient-to-r from-red-400 to-red-600' 
                              : data.riskLevel === 'medium'
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                              : data.riskLevel === 'low'
                              ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                              : 'bg-gradient-to-r from-green-400 to-green-600'
                          }`}
                          style={{ width: `${(data.score / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        阈值: {data.threshold}
                      </div>
                    </div>
                    {selectedDimension === key && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {getDetailedInterpretation(key, data.score, data.threshold)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 详细解读 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Heart className="mr-3 text-red-500" size={28} />
                解读建议
              </h3>
              <div className="space-y-5 max-h-96 overflow-y-auto pr-2">
                {Object.entries(results)
                  .sort(([,a], [,b]) => b.score - a.score)
                  .map(([key, data]) => (
                  <div key={key} className={`border-l-4 pl-5 py-3 rounded-r-lg ${
                    data.riskLevel === 'high' ? 'border-red-400 bg-red-50' :
                    data.riskLevel === 'medium' ? 'border-yellow-400 bg-yellow-50' :
                    data.riskLevel === 'low' ? 'border-blue-400 bg-blue-50' :
                    'border-green-400 bg-green-50'
                  }`}>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center justify-between">
                      <span>{data.name}</span>
                      <span className="text-sm font-normal text-gray-600">
                        {data.score.toFixed(2)}/5.0
                      </span>
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {getDetailedInterpretation(key, data.score, data.threshold)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 资源和建议 */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-200">
              <Phone className="text-blue-600 mx-auto mb-4" size={36} />
              <h4 className="font-bold text-blue-800 mb-3">24小时心理援助</h4>
              <a href="tel:400-161-9995" className="text-blue-600 text-lg font-bold mb-3 block hover:text-blue-700">
                400-161-9995
              </a>
              <button className="text-blue-600 hover:text-blue-700 text-sm underline font-semibold">
                立即拨打求助
              </button>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl text-center border border-green-200">
              <BookOpen className="text-green-600 mx-auto mb-4" size={36} />
              <h4 className="font-bold text-green-800 mb-3">资源库</h4>
              <p className="text-green-600 text-sm mb-3">心理健康知识与自助工具</p>
              <button className="text-green-600 hover:text-green-700 text-sm underline font-semibold">
                访问资源中心
              </button>
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl text-center border border-purple-200">
              <Download className="text-purple-600 mx-auto mb-4" size={36} />
              <h4 className="font-bold text-purple-800 mb-3">报告下载</h4>
              <p className="text-purple-600 text-sm mb-3">生成详细报告</p>
              <button 
                onClick={() => setShowDownloadModal(true)}
                className="text-purple-600 hover:text-purple-700 text-sm underline font-semibold"
              >
                下载完整报告
              </button>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl text-center border border-orange-200">
              <Share2 className="text-orange-600 mx-auto mb-4" size={36} />
              <h4 className="font-bold text-orange-800 mb-3">分享测试</h4>
              <p className="text-orange-600 text-sm mb-3">分享给朋友或医生</p>
              <button 
                onClick={() => setShowShareModal(true)}
                className="text-orange-600 hover:text-orange-700 text-sm underline font-semibold"
              >
                分享测试
              </button>
            </div>
          </div>

          {/* 重要说明 */}
          <div className="bg-gray-50 p-8 rounded-2xl mb-8 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📋 结果解读重要说明</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">✅ 本报告的价值：</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>提供人格特质的系统性评估</li>
                  <li>识别可能需要关注的特质模式</li>
                  <li>为咨询提供参考信息</li>
                  <li>促进自我认知和心理健康意识</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚠️ 使用限制：</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>不能替代医学诊断</li>
                  <li>结果可能受当前心理状态影响</li>
                  <li>需要医生进行综合评估</li>
                  <li>不适用于治疗方案制定</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 底部操作 */}
          <div className="text-center space-y-4">
            <div className="text-gray-500 text-sm">
              <p className="mb-2">
                💡 建议6个月后重新评估，人格特质可能随时间和干预发生变化
              </p>
              <p>
                如对测试结果有疑问，请咨询心理健康工作者
                <button className="text-blue-600 hover:text-blue-700 underline ml-2 font-semibold">
                  反馈建议
                </button>
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  resetTest();
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                重新开始评估
              </button>
              
              <button 
                onClick={() => setShowShareModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                分享给医生
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 模态框 */}
      {showDownloadModal && <DownloadModal />}
      {showShareModal && <ShareModal />}
    </div>
  );
}

export default App;