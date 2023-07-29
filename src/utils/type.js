export const filterType = (val) => {
  switch (val) {
    case 1:
      return 'CET4'
    case 2:
      return 'CET6'
    case 3:
      return 'TEM4'
    case 4:
      return 'TEM8'
    case 5:
      return 'KAOYAN'
    case 6:
      return 'GRE'
    case 7:
      return 'TOEFL'
    case 8:
      return 'IELTS'
  }
}

export const filterWordTypeToInt = (val) => {
  switch (val) {
    case 'CET4':
      return 1
    case 'CET6':
      return 2
    case 'TEM4':
      return 3
    case 'TEM8':
      return 4
    case 'KAOYAN':
      return 5
    case 'GRE':
      return 6
    case 'TOEFL':
      return 7
    case 'IELTS':
      return 8
  }
}

export const filterEssayType = (val) => {
  switch (val) {
    case 1:
      return '英文小说'
    case 2:
      return '情感故事'
    case 3:
      return '英语美文'
    case 4:
      return '双语故事'
  }
}

export const filterEssayEngType = (val) => {
  switch (val) {
    case 1:
      return 'novel'
    case 2:
      return 'love'
    case 3:
      return 'essays'
    case 4:
      return 'shuangyu'
  }
}

export const filterEssayTypeToInt = (val) => {
  switch (val) {
    case '英文小说':
      return 1
    case '情感故事':
      return 2
    case '英语美文':
      return 3
    case '双语故事':
      return 4
  }
}

export const filterEssayEngTypeToInt = (val) => {
  switch (val) {
    case 'novel':
      return 1
    case 'love':
      return 2
    case 'essays':
      return 3
    case 'shuangyu':
      return 4
  }
}

export const filterEssayTypeToEng = (val) => {
  switch (val) {
    case '英文小说':
      return 'novel'
    case '情感故事':
      return 'love'
    case '英语美文':
      return 'essays'
    case '双语故事':
      return 'shuangyu'
  }
}

export const filterCommentTypeToInt = (val) => {
  switch (val) {
    case '可评论':
      return 1
    case '不可评论':
      return 0
  }
}

export const filterCommentEngTypeToInt = (val) => {
  switch (val) {
    case 'ok':
      return 1
    case 'no':
      return 0
  }
}

export const filterCommentType = (val) => {
  switch (val) {
    case 1:
      return '可评论'
    case 0:
      return '不可评论'
  }
}

export const filterListenType = (val) => {
  switch (val) {
    case 1:
      return '热点资讯传送门'
    case 2:
      return '国外媒体资讯'
    case 3:
      return '英语听力入门'
    case 4:
      return '可可之声'
    case 5:
      return '品牌英语听力'
  }
}

export const filterListenTypeToInt = (val) => {
  switch (val) {
    case '热点资讯传送门':
      return 1
    case '国外媒体资讯':
      return 2
    case '英语听力入门':
      return 3
    case '可可之声':
      return 4
    case '品牌英语听力':
      return 5
  }
}

export const filterListenEngTypeToInt = (val) => {
  switch (val) {
    case '17698':
      return 1
    case 'media':
      return 2
    case 'chuji':
      return 3
    case 'jiaoxue':
      return 4
    case 'brand':
      return 5
  }
}

export const filterListenTypeToEng = (val) => {
  switch (val) {
    case 1:
      return '17698'
    case 2:
      return 'media'
    case 3:
      return 'chuji'
    case 4:
      return 'jiaoxue'
    case 5:
      return 'brand'
  }
}
