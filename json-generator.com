  [
    '{{repeat(5, 7)}}',
    {
      postId: '{{index()}}',
      name: '{{lorem(3, "words")}}',
      content: '{{lorem(1, "paragraph")}}',
      date: '{{date(new Date(2014, 0, 1), new Date(), "dd-MM-2014")}}',
      comments: [
        '{{repeat(0, 5)}}',
        {
          date: '{{date(new Date(2014, 0, 1), new Date(), "dd-MM-YYYY")}}',
          text: '{{lorem(1, "paragraph")}}',
	      id: '{{index()}}',
        }
      ]
    }
  ]