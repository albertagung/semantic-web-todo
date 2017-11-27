// Open modal view completed todos
$(document).ready(function(){
  $('#viewCompleted').click(function(){
    $('#modalCompleted').modal('toggle')
  })
})

// Open modal for adding more todos
$(document).ready(function(){
  $('#imgAdd').click(function(){
    $('#modalAddMore').modal('toggle')
  })
})
