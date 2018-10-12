$(document).ready(() => {
    $('.warehouse-delete').on('click', (e) => {
      $target = $(e.target);
          $.ajax({
              type: 'DELETE',
              url: '/warehouse/delete/'+$target.attr('data-warehouse-id'),
              success: (response) => {
                    console.log('deleted warehouse')
                    window.location.reload(true)
              },
              error: (error) => {
                  console.log(error);
              }
          });
  
    });


    $('.product-delete').on('click', (e) => {
        $target = $(e.target);
            $.ajax({
                type: 'DELETE',
                url: '/products/delete/'+$target.attr('data-product-id'),
                success: (response) => {
                    console.log('deleted warehouse')
                    window.location.reload(true)
                },
                error: (error) => {
                    console.log(error);
                }
            });
    
      });
  });
  