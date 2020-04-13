module.exports = {
  functionAlreadyRunning: '이미 검색 중이거나 최근에 검색을 실행한 적이 있으신 것 같습니다. 과도한 API 요청을 막기 위해 조금 뒤에 다시시도해주세요.',
  noKeywordProvided: `최근 메세지를 검색할 키워드를 입력해야 합니다. 더 정확한 검색 결과를 위해 다음 파라메터를 추가로 설정할 수 있습니다.
> **amount:Number** 검색할 메세지 수 설정하기
> **user:UserID** 특정 사용자가 보낸 메세지만 보여주기
> **before:MessageID** 특정 메세지 전에 보낸 메세지에서만 검색하기
`,
  title: '검색',
  description: '{keyword}에 대한 최근 메세지 {amount}개의 검색 결과입니다.',
  whoseMessage: '{author}님의 메세지',
  messageContent: '{content}... [(메세지 보기)]({link})'
}
