suite('test about', function(){
    test('href contacts exists', function(){
        assert($('a[href="/contacts"]').length)
    })
})