var risk = risk || {};

$(document).ready(function(){
  function newSvgElem(type) {
    return $(document.createElementNS('http://www.w3.org/2000/svg', type))
  }

  function addConnectionLinesForCountry(pathEl) {
    var $this = $(pathEl);
    var cons = String($this.data('connections')).split(',');
    var g = newSvgElem('g')
      .attr('class', 'lines')
      .attr('id', $this.attr('id') + '-lines');
    g.hide();
    for (var i = 0; i < cons.length; i++) {
      var c = cons[i];
      var $other = $('#' + c);
      var p0 = $this.data('centre');
      var p1 = $other.data('centre');
      if (p0 !== undefined && p1 !== undefined) {
        var path = newSvgElem('path')
          .attr('d', 'M' + p0 + ' L' + p1);
        g.append(path);
      }
    }
    $('#connection-lines').append(g);
  }

  function highlightCountry(pathEl) {
    var $this = $(pathEl);
    $('.country').attr('class', 'country');
    $this.attr('class', 'country hi');
    var cons = String($this.data('connections')).split(',');
    for (var i = 0; i < cons.length; i++) {
      var c = cons[i];
      var $other = $('#' + c);
      $other.attr('class', 'country attacked');
    }
  }

  function addLabelToCountry(pathEl) {
    var $el = $(pathEl);
    var c = $el.data('centre').split(',');
    var x = c[0];
    var y = c[1];
    var name = $el.data('name');
    var label = newSvgElem('text')
      .text(name)
      .attr('class', 'label')
      .attr('for', $el.attr('id'))
      .attr('x', x)
      .attr('y', y);

    $('#labels').append(label);
  }

  $svg = $('.board > svg');

  $svg.on('mouseover', '.label', function(event) {
    var id = $(event.currentTarget).attr('for');
    highlightCountry($('#' + id));
  });
  $svg.on('mouseover', '.country', function(event) {
    highlightCountry(event.currentTarget);
  });

  // ----------------------------------------------------------------------
  // connection lines

  $('#connection-lines').empty();
  $('.country[data-connections]').each(function(i, el) {
    addConnectionLinesForCountry(el);
  });

  // ----------------------------------------------------------------------
  // country labels

  $('#labels').empty();
  $('.country[data-centre]').each(function(i, el) {
    addLabelToCountry(el);
  });
});

