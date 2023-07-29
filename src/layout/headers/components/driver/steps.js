export const steps = (i18n) => [
  {
    element: '#guide',
    popover: {
      title: i18n('driver.guideBtn'),
      description: '这是引导管理员了解每个按钮的功能',
      position: 'left'
    }
  },
  {
    element: '#hamburger',
    popover: {
      title: i18n('driver.hamburgerBtn'),
      description: '点击这里可以让菜单伸缩',
      position: 'bottom'
    }
  },
  {
    element: '#screenFul',
    popover: {
      title: i18n('driver.fullScreen'),
      description: '点击这里可以显示全屏',
      position: 'left'
    }
  },
  {
    element: '#reset',
    popover: {
      title: i18n('driver.resetButton'),
      description: '这是重置数据库的按钮，请小心使用',
      position: 'left'
    }
  },
  {
    element: '#user',
    popover: {
      title: i18n('driver.userMenu'),
      description: '这是用户管理菜单',
      position: 'right'
    }
  },
  {
    element: '#word',
    popover: {
      title: i18n('driver.wordMenu'),
      description: '这是单词管理菜单',
      position: 'right'
    }
  },
  {
    element: '#essay',
    popover: {
      title: i18n('driver.essayMenu'),
      description: '这是文章管理菜单',
      position: 'right'
    }
  },
  {
    element: '#listen',
    popover: {
      title: i18n('driver.listenMenu'),
      description: '这是听力管理菜单',
      position: 'right'
    }
  },
  {
    element: '#feedback',
    popover: {
      title: i18n('driver.feedbackMenu'),
      description: '这是反馈管理菜单',
      position: 'right'
    }
  }
]
