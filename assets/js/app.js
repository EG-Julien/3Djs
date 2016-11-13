(function($){
    var $arrays = [[[1, 2, 4], [3, 2, 1]], [[5, 1, 9], [4, 5, 6]], [[1, 58, 32], [4, 56, 85]]];

    /* FORMAT : [[[x, x, x, x ...],[y, y, y, y, y....]], [[x, x, x, x, x ...], [y, y, y, y ....]]] */

    var $img = 0; //Current frame
    var $max = $arrays.length - 1; //Max amount of frames
    var template = '<div class="ui indicating progress" data-value="{{ current }}" data-total="{{ total }}" id="progress"><div class="bar"><div class="progress"></div></div><div class="label" id="count">Frame {{ current }} of {{ total }}</div></div><script >$(\'.progress\').progress();</script>';
    var graphics = '<div class="render"><div id="myDiv" style="width:480px; height:400px;"></div></div>';
    var title = '<h1 class="ui">{{ title }}  <small>{{ file }}</small></h1>';
    var loader = '<div class="ui"><p></p><div class="ui active dimmer"><div class="ui loader"></div></div></div>';
    var isLoading = false;

    Mustache.parse(template);
    var rendered = Mustache.render(template, {current: $img, total: $max});
    $('.loading').html(rendered);
    
    function loading($state) {
        if ($state === true) {
            $('#isloading').html(loader);
        } else {
            $('#isloading').html('');
        }
    }

    function refreshTemplate() {
        Mustache.parse(template);
        var rendered = Mustache.render(template, {current: $img, total: $max});
        $('.loading').html(rendered);
        return;
    }

    function createGraphic($state) {
        var x = $arrays[$state][0];
        var y = $arrays[$state][1];

        var data = [
            {
                x: x,
                y: y,
                type: 'histogram2d'
            }
        ];
        Plotly.newPlot('myDiv', data);
    }

    function refreshGraphic() {
        Mustache.parse(graphics);
        var rendered = Mustache.render(graphics);
        $('.graphic').html(rendered);
        return;
    }

    /*$('#upload').click(function (e) {

    })*/
    var fileInput = document.querySelector('#upload');

    fileInput.addEventListener('change', function() {
        loading(true);
        var reader = new FileReader();
        reader.addEventListener('load', function() {
            var $name = fileInput.files[0].name;
            var $content = reader.result;
            try {
                var $data = JSON.parse($content);

                var title = $data.title;
                $arrays = $data.arrays.data;
                $max = $arrays.length - 1; //Max amount of frames

                Mustache.parse(title);
                var rendered = Mustache.render(title, {title: title, file: fileInput.files[0].name});
                $('#title').html(rendered);

                refreshTemplate();

                refreshGraphic();
                createGraphic(0);

                loading(false);
            } catch (e) {
                console.error("Parsing error:", e);
                alert('Error : can\'t read data');

                loading(false);
            }
        });

        reader.readAsText(fileInput.files[0]);
    });

    $('#next').click(function (e) {
        e.preventDefault();
        if ($img == $max) {
            alert('There is no more frames');
        } else {
            $img = $img + 1;
        }
        refreshTemplate();

        refreshGraphic();
        createGraphic($img);
    })

    $('#prev').click(function (e) {
        e.preventDefault();
        if ($img == 0) {
            alert('There is no more frames');
        } else {
            $img = $img - 1;
        }
        refreshTemplate();

        refreshGraphic();
        createGraphic($img);
    })

    refreshGraphic();
    createGraphic($img);
})(jQuery);