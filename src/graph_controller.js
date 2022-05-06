$(document).ready(function() {

   $('#render_graph').click(function() {

      class graph_config {
         constructor(data_uri, node_size, node_product_colour, node_customer_colour,edge_colour,edge_shape){
            this.data_uri = data_uri;
            this.node_size = node_size;
            this.node_product_colour = node_product_colour;
            this.node_customer_colour = node_customer_colour; 
            this.edge_colour = edge_colour;
            this.edge_shape = edge_shape;
         }
      }

      //Data
      var data_select = $('#data_select').children('option:selected').val();
      //Graph
      //Graph: Layout
      var layout_select = $('#layout_select').children('option:selected').val();
      //Graph: Nodes
      var node_size_select = $('#node_size_select').children('option:selected').val();
      var node_product_colour_select = $('#node_product_colour_select').children('option:selected').val();
      var node_customer_colour_select = $('#node_customer_colour_select').children('option:selected').val();
      //Graph: Edges
      var edge_colour_check = $('#edge_colour_check').prop('checked');
      var edge_shape_check = $('#edge_shape_check').prop('checked');

      switch (data_select) {
         case 'all_events_small_network':
            data_uri = 'https://jjmpalma.github.io/data_json/all_events_small_network.json';
            break;
         
         case 'all_events_big_network':
            data_uri = 'https://jjmpalma.github.io/data_json/all_events_big_network.json';
            break;
         
         case 'purchase_events_small_network':
            data_uri = 'https://jjmpalma.github.io/data_json/purchase_events_small_network.json';
            break;

         case 'purchase_events_big_network':
            data_uri = 'https://jjmpalma.github.io/data_json/purchase_events_big_network.json';
            break;

         case 'cart_events_small_network':
            data_uri = 'https://jjmpalma.github.io/data_json/cart_events_small_network.json';
            break;

         case 'cart_events_big_network':
            data_uri = 'https://jjmpalma.github.io/data_json/cart_events_big_network.json';
            break;

         case 'view_events_small_network':
            data_uri = 'https://jjmpalma.github.io/data_json/view_events_small_network.json';
            break;
         
         case 'view_events_big_network':
            data_uri = 'https://jjmpalma.github.io/data_json/view_events_big_network.json';
            break;
      }

      graph_config_instance = new graph_config(data_uri,node_size_select,node_product_colour_select,node_customer_colour_select,edge_colour_check,edge_shape_check);
      start_force(graph_config_instance)

   });
});

