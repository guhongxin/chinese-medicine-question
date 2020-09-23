export const questionnaireContent = [{
  name: '门诊预约',
  child: {
    mm: [
      '普通、专科和专家门诊号源网上开放比例（%）', '开展哪些预约诊疗方式', '实现分时段精准预约（每个时段精确到30分钟以内）', '网上预约人次数',
      '预约患者按时就诊人次数', '网上预约专家号人次数', '预约专家号的患者按时就诊人次数', '网上预约普通号人次数', '预约普通号的患者按时就诊人次数'
    ],
    cz1: [
      { type: 0, value: '' },
      { type: 1, value: [], options: ['网上预约', '电话预约', '诊间预约', '自助机预约', 'app预约', '公众号预约', '其它'] },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 0, value: '' },
      { type: 1, value: [], options: ['网上预约', '电话预约', '诊间预约', '自助机预约', 'app预约', '公众号预约', '其它'] },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
},
// {
//   name: '健康',
//   child: {
//     mm: ['是否实现“两卡融合”'],
//     cz1: [{ type: 2, value: '', options: ['是', '否'] }],
//     cz2: [{ type: 2, value: '', options: ['是', '否'] }]
//   }
// },
{
  name: '医保卡',
  child: {
    mm: ['是否实现“两卡融合”', '健康医保卡使用人次', '健康医保卡使用占就诊人次比例（%）'],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '', rowName: '健康医保卡使用人次' },
      { type: 4, value: '' }
      // { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '', rowName: '健康医保卡使用人次' },
      { type: 4, value: '' }
      // { type: 0, value: '' }
    ]
  }
}, {
  name: '现场排队',
  child: {
    mm: ['高峰期现场排队时间（min）'],
    cz1: [{ type: 0, value: '' }],
    cz2: [{ type: 0, value: '' }]
  }
}, {
  name: '门诊结算',
  child: {
    mm: ['是否开展门诊智慧结算', '智慧结算方式', '门诊总结算笔数', '门诊智慧结算笔数',
      '门诊诊间结算笔数', '门诊自助结算笔数', '门诊通过移动终端进行支付的结算笔数'
    ],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['自助结算', '诊间结算', '移动终端结算'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['自助结算', '诊间结算', '移动终端结算'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '病房结算',
  child: {
    mm: ['是否开展门诊智慧结算', '智慧结算方式', '病房总结算笔数', '病房智慧结算笔数',
      '病区（床边）结算笔数', '病房自助结算笔数', '病房通过移动终端进行支付的结算笔数'
    ],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['自助结算', '诊间结算', '移动终端结算'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['自助结算', '诊间结算', '移动终端结算'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '电子发票',
  child: {
    mm: ['是否开展电子发票应用', '发票总开票数（包括电子发票生成数）', '电子发票生成数', '发票总打印数',
      '发票自助打印数'
    ],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '医后付',
  child: {
    mm: ['是否开展医后付', '自助机端医后付笔数', '移动终端医后付笔数'],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '检查预约',
  child: {
    mm: ['是否开展检查智慧预约', '检查预约人次数', '检查智慧预约人次数', '检查诊间预约人次数', '检查集中预约人次数',
      '检查自助预约人次数', '预约患者按时检查人次数', '分时段检查预约人次数', '检验检查报告查询方式'
    ],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 1, value: [], options: ['APP查询', '网上查询', '公众号查询', '其它'] }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 1, value: [], options: ['APP查询', '网上查询', '公众号查询', '其它'] }
    ]
  }
}, {
  name: '互联网+',
  child: {
    mm: ['是否开展互联网医疗', '互联网医院是否接入省互联网监管平台', '互联网医院建设方式', '互联网诊疗总例数（机构对个人）',
      '远程会诊总例数', '互联网电子处方张数', '是否开展互联网+护理', '服务模式', '网上门诊服务例数', '其中中医护理例数', '中医护理技术开展项目数',
      '中医护理服务模式有哪些？', '中医护理回访人次数'
    ],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 3, value: '', valueInput: '', options: ['入驻', '单独建设', '合作共建', '其它'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['网上诊疗', '居家护理'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 1, value: [], options: ['门诊护理', '住院护理', '网上诊疗', '居家护理'] },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 3, value: '', valueInput: '', options: ['入驻', '单独建设', '合作共建', '其它'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['网上诊疗', '居家护理'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 1, value: [], options: ['门诊护理', '住院护理', '网上诊疗', '居家护理'] },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '刷脸就医',
  child: {
    mm: ['是否开展刷脸就医', '应用流程'],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['挂号', '付费', '诊间', '检查检验'] }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['挂号', '付费', '诊间', '检查检验'] }
    ]
  }
}, {
  name: '名中医预约挂号',
  child: {
    mm: ['是否开展名中医预约挂号', '网上预约名中医人次数', '名中医就诊人次数', '预约名中医号的患者按时就诊人次数',
      '名中医初诊病人人次数'
    ],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '中草药代煎代送',
  child: {
    mm: ['是否开展中草药代煎服务？', '是否开展中药饮片代煎质量管控？', '现场取煎药的平均等候时间（min）', '是否开展中草药配送服务？',
      '中草药配送范围', '不同范围的平均配送送达时间（min）'
    ],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['市', '省', '国'] },
      { type: 0, value: '' }

    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 2, value: '', options: ['是', '否'] },
      { type: 1, value: [], options: ['市', '省', '国'] },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '中药师线上门诊',
  child: {
    mm: ['是否开展中药药物咨询线上门诊', '线上服务人次总数'],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' }

    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '中医远程会诊（包括国际会诊）',
  child: {
    mm: ['是否开展中医远程会诊', '开展中医远程会诊人次总数', '开展中医远程国际会诊人次总数'],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '中医冬病夏治服务',
  child: {
    mm: ['是否开展冬病夏治服务', '开展冬病夏治服务总人次数', '冬病夏治服务回访人次数'],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '中医膏方线上预约',
  child: {
    mm: ['是否开展中医膏方线上预约服务', '中医药膏方线上预约服务总人次数', '中药膏方服务回访人次数'],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '中医药线上科普宣教',
  child: {
    mm: ['是否开展中医药线上科普宣教？', '开展中医药线上科普宣教频次数？'],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' }
    ]
  }
}, {
  name: '中医线上适宜技术推广',
  child: {
    mm: ['是否开展线上适宜技术推广？', '开展适宜技术推广项目数？', '开展线上适宜技术推广项目总数？', '适宜技术推广回访总数？'],
    cz1: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ],
    cz2: [
      { type: 2, value: '', options: ['是', '否'] },
      { type: 0, value: '' },
      { type: 0, value: '' },
      { type: 0, value: '' }
    ]
  }
}]
export const scoreContent = [{
  name: '按时就诊率',
  cz1: '',
  cz2: '',
  method: [4, 3]
}, {
  name: '预约专家号的患者按时就诊率',
  cz1: '',
  cz2: '',
  method: [6, 5]
}, {
  name: '预约普通号的患者按时就诊率',
  cz1: '',
  cz2: '',
  method: [8, 7]
}, {
  name: '门诊智慧结算率',
  cz1: '',
  cz2: '',
  method: [16, 15]
}, {
  name: '门诊诊间结算率',
  cz1: '',
  cz2: '',
  method: [17, 15]
}, {
  name: '门诊自助结算率',
  cz1: '',
  cz2: '',
  method: [18, 15]
}, {
  name: '门诊移动终端进支付结算率',
  cz1: '',
  cz2: '',
  method: [19, 15]
}, {
  name: '病房智慧结算率',
  cz1: '',
  cz2: '',
  method: [23, 22]
}, {
  name: '病区（床边）结算笔率',
  cz1: '',
  cz2: '',
  method: [24, 22]
}, {
  name: '病房自助结算笔率',
  cz1: '',
  cz2: '',
  method: [25, 22]
}, {
  name: '病房移动终端支付结算率',
  cz1: '',
  cz2: '',
  method: [26, 22]
}, {
  name: '电子发票使用率',
  cz1: '',
  cz2: '',
  method: [29, 28]
}, {
  name: '发票自助打印率',
  cz1: '',
  cz2: '',
  method: [30, 28]
}, {
  name: '检查智慧预约率',
  cz1: '',
  cz2: '',
  method: [37, 36]
}, {
  name: '检查诊间预约率',
  cz1: '',
  cz2: '',
  method: [38, 36]
}, {
  name: '检查集中预约率',
  cz1: '',
  cz2: '',
  method: [39, 36]
}]
