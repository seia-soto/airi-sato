module.exports = {
  emptySearchKeyword: '검색할 키워드를 입력하신 뒤에 다시시도해주세요.',
  pixivSearch: 'Pixiv 검색',
  searchResult: '{keyword}에 대해 검색했습니다.',
  sharedWarning: '> 내부 정책에 따라 데이터는 최대 5분까지 지연될 수 있습니다. 데이터가 올바르게 표시되지 않다고 생각되는 경우 help 명령어의 공식 Discord 서버를 통해 알려주세요.',
  artworkDescription: `by __**{userName}**__
> [Pixiv에서 아트워크 보기](https://pixiv.net/artworks/{id})`,
  noSearchResultFound: '{keyword}에 대한 검색결과가 없었습니다.',
  nsfwContentExcluded: '> 랭킹에서 성적 컨텐츠가 자동으로 숨겨졌습니다. 성적 컨텐츠를 포함하여 검색하려면 NSFW 채널에서 명령어를 실행해주세요.',
  invalidModeProvided: '잘못된 랭킹 정렬 모드가 주어졌습니다. {modes} 중 하나를 선택하세요.',
  pixivRanking: 'Pixiv 랭킹 ({mode})',
  rankingModes: {
    daily: '일일',
    weekly: '주간',
    monthly: '월간',
    rookie: '신인'
  },
  rankingResult: '{mode} 랭킹을 불러왔습니다.',
  rankingNotAvailable: 'Pixiv에서 데이터를 가져올 수 없습니다. Pixiv 웹 사이트가 정상적으로 동작하는지 확인해주시고 만약 그럼에도 불구하고 계속 이 오류가 표시될 경우 help 명령어의 공식 Discord 서버를 통해 알려주세요.',
  rankedArtworkDescription: `by __**{user_name}**__
> 순위: {rank}
> 태그: {tags}
> 이전 기간 대비: {yes_rank}
> [Pixiv에서 아트워크 보기](https://pixiv.net/artworks/{illust_id})`
}
