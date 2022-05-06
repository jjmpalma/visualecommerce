// =============== CANVAS AND SCREEN CONFIG ===============

const container = document.querySelector('#container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 1200);



//=============== GRAPH COMPONENTS ===============

// == TOOLTIP (Item context menu) ==
const tooltip = new G6.Tooltip({
  offsetX: 15,
  offsetY: 15,
  trigger: 'click',
  itemTypes: ['node', 'edge'],
  getContent: (e) => {
    const menu = document.createElement('div');
    menu.style.width = 'fit-content';
    menu.style.padding = '0px 0px 20px 0px';

    if(e.item.getType() == 'node'){
      if(e.item.getModel().class == 'customer'){
        menu.innerHTML = `
          <h6>Customer:</h6>
          <ul>
            <li><span style="font-weight: bold;">ID:</span> ${e.item.getModel().id}</li>
          </ul>
          <ul>
            <li><span style="font-weight: bold;">Session:</span> ${e.item.getModel().sess}</li>
          </ul>
          <ul>
            <li><span style="font-weight: bold;">RFM segmentation:</span> ${e.item.getModel().rfm}</li>
          </ul>
          <ul>
            <li><span style="font-weight: bold;">Interactions:</span> ${e.item.getModel().int}</li>
            <li><span style="font-weight: bold;">Interactions (View):</span> ${e.item.getModel().int_v}</li>
            <li><span style="font-weight: bold;">Interactions (Cart):</span> ${e.item.getModel().int_c}</li>
            <li><span style="font-weight: bold;">Interactions (Purchase):</span> ${e.item.getModel().int_p}</li>
          </ul>`;
        return menu;
      } else {
        menu.innerHTML = `
        <h6>Product:</h6>
        <ul>
          <li><span style="font-weight: bold;">ID:</span> ${e.item.getModel().id}</li>
        </ul>
        <ul>
          <li><span style="font-weight: bold;">Category:</span> ${e.item.getModel().cat}</li>
          <li><span style="font-weight: bold;">Brand:</span> ${e.item.getModel().bra}</li>
          <li><span style="font-weight: bold;">Price:</span> ${e.item.getModel().pri}</li>
        </ul>
        <ul>
          <li><span style="font-weight: bold;">Interactions:</span> ${e.item.getModel().int}</li>
          <li><span style="font-weight: bold;">Interactions (View):</span> ${e.item.getModel().int_v}</li>
          <li><span style="font-weight: bold;">Interactions (Cart):</span> ${e.item.getModel().int_c}</li>
          <li><span style="font-weight: bold;">Interactions (Purchase):</span> ${e.item.getModel().int_p}</li>
        </ul>`;
        return menu;
      }
    }
  },
});

//== SNAP LINE ==
const snapLine = new G6.SnapLine({
  line: {
    stroke: '#343a40',
    lineWidth: 1,
  },
  itemAlignType: true,
});



//============== GRAPH LAYOUT ===============

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'force',
    preventOverlap: true,
    nodeSpacing: 30,
    nodeStrength: 20,
  },
  modes: {
    default: ['zoom-canvas', 'drag-canvas'],
  },
  plugins: [tooltip, snapLine],
  nodeStateStyles: {
    bright: {
      opacity: 1,
    },
    shade: {
      opacity: 0.4,
    }
  },
  edgeStateStyles: {
    bright: {
      stroke: '#0275d8',
      lineWidth: '2',
    }
  }
});



// =============== EVENTS HANDLING ===============

// == NODE DRAGGING ==
// Event: Update position when dragging starts
graph.on('node:dragstart', function (itemEvent) {
  graph.layout();
  updatePosition(itemEvent);
});

// Event: Update position while dragging
graph.on('node:drag', function (itemEvent) {
  const forceLayout = graph.get('layoutController').layoutMethods[0];
  forceLayout.execute();
  updatePosition(itemEvent);
});

// Event: Fix node position when dragging finishes
graph.on('item:dragend', function (itemEvent) {
  itemEvent.item.get('model').fx = itemEvent.x;
  itemEvent.item.get('model').fy = itemEvent.y;
});

// Function: Update position of given node
function updatePosition(itemEvent) {
  const model = itemEvent.item.get('model');
  model.fx = itemEvent.x;
  model.fy = itemEvent.y;
} 

// == RELATIONSHIPS HIGHLIGHT ==
// Event: Apply items state change when hovering a node
graph.on('node:mouseenter', function (eventItem) {

  const itemHover = eventItem.item;

  graph.setAutoPaint(false);

  //Set shade state for all nodes
  graph.getNodes().forEach(function (node) {
    graph.clearItemStates(node);
    graph.setItemState(node, 'shade', true);
  });

  //Set highlight state for edges and nodes linked to selected node
  graph.getEdges().forEach(function (edge) {
    if (edge.getSource() === itemHover) {
      graph.setItemState(edge.getTarget(), 'shade', false);
      graph.setItemState(edge.getTarget(), 'bright', true);
      graph.setItemState(edge, 'bright', true);
      edge.toFront();
    } else if (edge.getTarget() === itemHover) {
      graph.setItemState(edge.getSource(), 'shade', false);
      graph.setItemState(edge.getSource(), 'bright', true);
      graph.setItemState(edge, 'bright', true);
      edge.toFront();
    } else {
      graph.setItemState(edge, 'bright', false);
    }
  });

  //Set highlight state for selected node
  graph.setItemState(itemHover, 'shade', false);
  graph.setItemState(itemHover, 'bright', true);

  //Apply state changes
  graph.paint();

  graph.setAutoPaint(true);
});

// Event: remove items state when hovering outside the selected node
graph.on('node:mouseleave', removeItemsState);

// Function: Remove state from nodes and edges
function removeItemsState() {
  graph.setAutoPaint(false);

  //Remove nodes state
  graph.getNodes().forEach(function (node) {
    graph.clearItemStates(node);
  });
  //Remove edges state
  graph.getEdges().forEach(function (edge) {
    graph.clearItemStates(edge);
  });
  //Apply changes
  graph.paint();

  graph.setAutoPaint(true);
}



// =============== DATA LOAD AND GRAPH RENDERING ===============

function start_force(graph_config) {

  fetch(graph_config.data_uri)
  .then((res) => res.json())
  .then((data) => {

    const nodes = data.nodes;
    const edges = data.edges;

    colourFillingProduct = new Map();
    colourFillingCustomer = new Map();

    nodes.forEach((node) => {

      if(!node.style){
        node.style = {};
      }

      //Node size
      if(graph_config.node_size != 'Node size') {
        switch (graph_config.node_size) {

          case 'all':
            customer_node_size = Math.round((((node.int) * (80 - 15)) / (6043 - 1)) + 15);
            product_node_size = Math.round((((node.int) * (80 - 15)) / (500354 - 1)) + 15);
            break;
  
          case 'view':
            customer_node_size = Math.round((((node.int_v) * (80 - 15)) / (6043 - 1)) + 15);
            product_node_size = Math.round((((node.int_v) * (80 - 15)) / (419287 - 1)) + 15);
            break;
  
          case 'cart':
            customer_node_size = Math.round((((node.int_c) * (80 - 15)) / (494 - 1)) + 15);
            product_node_size = Math.round((((node.int_c) * (80 - 15)) / (52123 - 1)) + 15);
            break;
  
          case 'purchase':
            customer_node_size = Math.round((((node.int_p) * (80 - 15)) / (322 - 1)) + 15);
            product_node_size = Math.round((((node.int_p) * (80 - 15)) / (28944 - 1)) + 15);
            break;
        }
      }

      switch (node.class) {

        case 'customer': {

          node.type = 'circle';
          node.style.fill = '#eff4ff';
          node.style.stroke = 'black';
          node.style.lineWidth = 0.4;

          if(graph_config.node_size != 'Node size') {
            node.size = customer_node_size;
            node.icon = {
              show: true,
              width: customer_node_size * 0.7,
              height: customer_node_size * 0.7,
              img: 'https://jjmpalma.github.io/assets/customer.svg'
            }
          } else {
            node.size = 20
            node.icon = {
              show: true,
              width: 10,
              height: 10,
              img: 'https://jjmpalma.github.io/assets/customer.svg'
            }
          }

          if(graph_config.node_customer_colour != 'Node (Customer) colour' && node.rfm != 'Only view customer'){
            if(colourFillingCustomer.get(node.rfm) == undefined){
                  randomColour = '#' + Math.floor(Math.random()*16777215).toString(16);
                  colourFillingCustomer.set(node.rfm,randomColour);
                  node.style.fill = randomColour;
                } else {
                  node.style.fill = colourFillingCustomer.get(node.rfm);
                }
          }

          break;
        }

        case 'product': {

          node.type = 'circle';
          node.style.fill = '#d9534f';
          node.style.stroke = 'black';
          node.style.lineWidth = 0.4;

          if(graph_config.node_size != 'Node size') {
            node.size = product_node_size;
          } else {
            node.size = 20;
          }

          if(graph_config.node_product_colour != 'Node (Product) colour'){

            switch (graph_config.node_product_colour) {

              case 'category':
                if(colourFillingProduct.get(node.cat) == undefined){
                  randomColour = '#' + Math.floor(Math.random()*16777215).toString(16);
                  colourFillingProduct.set(node.cat,randomColour);
                  node.style.fill = randomColour;
                } else {
                  node.style.fill = colourFillingProduct.get(node.cat);
                }
                break;
              
              case 'brand':
                if(colourFillingProduct.get(node.bra) == undefined){
                  randomColour = '#' + Math.floor(Math.random()*16777215).toString(16);
                  colourFillingProduct.set(node.bra,randomColour);
                  node.style.fill = randomColour;
                } else {
                  node.style.fill = colourFillingProduct.get(node.bra);
                }
                break;
            }
          }
          break;
        }
      }

    });

    edges.forEach((edge) => {

      if(!edge.style){
        edge.style = {};
      }

      if(graph_config.edge_colour == true){
        switch(edge.event){

          case 'view':
            edge.style.stroke = '#D5D7D8';
            break;

          case 'cart':
            edge.style.stroke = '#F8DCB4';
            break;

          case 'purchase':
            edge.style.stroke = '#C6E6C6';
            break;
        }
      } else {
        edge.style.stroke = '#D5D7D8';
      }

    });

    if(graph_config.edge_shape == true){
      console.log('in');
      G6.Util.processParallelEdges(data.edges);
    }
    
    graph.data(data);
    graph.render();
  });
}



// =============== SCREEN RESIZE ===============
// Note: This code has been copied from the G6 implementation examples found at: https://g6.antv.vision/en/examples/gallery

if (typeof window !== 'undefined')
window.onresize = () => {
  if (!graph || graph.get('destroyed')) return;
  if (!container || !container.scrollWidth || !container.scrollHeight) return;
  graph.changeSize(container.scrollWidth, container.scrollHeight);
};


