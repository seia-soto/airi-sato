module.exports = {
  emptySearchKeyword: '검색할 키워드를 입력하신 뒤에 다시시도하라고 미사카는 다시 말합니다.',
  pixivSearch: 'Pixiv 검색',
  searchResult: '{keyword}에 대해 검색했다고 미사카는 보고합니다.',
  sharedWarning: '> 내부 정책에 따라 데이터는 최대 5분까지 지연될 수 있으며 데이터가 올바르지 않다고 생각하는 경우에는 help 명령어를 통해 Discord 서버에 알려달라고 미사카는 부탁합니다.',
  artworkDescription: `by __**{userName}**__
> [Pixiv에서 아트워크 보기](https://pixiv.net/artworks/{id})`,
  noSearchResultFound: '{keyword}에 대한 검색결과가 없었다고 당신의 검색어에 대해 의구심을 품습니다.',
  nsfwContentExcluded: '> 랭킹에서 성적 컨텐츠가 자동으로 숨겨졌다고 미사카는 알려줍니다. 성적 컨텐츠를 포함하여 검색하려면 NSFW 채널에서 명령어를 실행해야 한다고 미사카는 핀잔을 줍니다.',
  invalidModeProvided: '잘못된 랭킹 정렬 모드가 주어졌다고 미사카는 투덜댑니다. {modes} 중 하나를 선택해달라고 미사카는 당신에게 딱밤을 때립니다.',
  pixivRanking: 'Pixiv 랭킹 ({mode})',
  rankingModes: {
    daily: '일일',
    weekly: '주간',
    monthly: '월간',
    rookie: '신인'
  },
  rankingResult: '{mode} 랭킹을 불러왔다고 미사카는 당신의 칭찬을 기대합니다.',
  rankingNotAvailable: 'Pixiv에서 데이터를 가져올 수 없습니다. Pixiv 웹 사이트가 정상적으로 동작하는지 확인해주시고 만약 그럼에도 불구하고 계속 이 오류가 표시될 경우 help 명령어의 공식 Discord 서버를 통해 알려달라고 미사카는 작전의 B 플랜을 당신에게 보고합니다.',
  rankedArtworkDescription: `by __**{user_name}**__
> 순위: {rank}
> 태그: {tags}
> 이전 기간 대비: {yes_rank}
> [Pixiv에서 아트워크 보기](https://pixiv.net/artworks/{illust_id})`,
  pixiv: 'Pixiv',
  baseDescription: 'Pixiv 검색 혹은 랭킹을 최대 5개까지 즉시 볼 수 있는 명령어라고 미사카는 알려줍니다.',
  rankingUsage: 'Pixiv의 일러스트 랭킹을 가져오는 명령어이며 mode 값은 daily(일일)가 기본값이며 부가적으로 weekly, monthly, rookie를 사용할 수 있다고 미사카는 귀찮은 목소리로 당신에게 알려줍니다. 랭킹에서 성인 컨텐츠는 일반 채널인 경우 자동으로 삭제되며 NSFW 채널을 굳이 사용할 필요는 없다고 미사카는 생각합니다.',
  searchUsage: 'Pixiv에서 일러스트를 검색하는 명령어이며 keyword 값은 필수라고 미사카는 조용히 핀잔을 줍니다.'
}
