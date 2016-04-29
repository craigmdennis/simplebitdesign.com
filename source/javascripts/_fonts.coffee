WebFontConfig =
  google:
    families: [ 'Lora:400,400italic,700,700italic:latin' ]

  monotype:
    projectId: '09fd0c05-177d-4a2b-9fcd-f4ec85499026'

  fontactive: (familyName, fvd) ->
    console.log 'familyName', familyName
    console.log 'fvd', fvd
