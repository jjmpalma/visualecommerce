This file describes the structure and content of the technical work


========== EXTERNAL FILES ==========

Files fetched from github external repository:
- data_json: https://github.com/jjmpalma/jjmpalma.github.io/tree/main/data_json
- vectors: https://github.com/jjmpalma/jjmpalma.github.io/tree/main/assets

========== DIRECTORIES AND FILES ==========

-> index.html
Default homepage

===== data =====
-> ecommerceBehaviourCleaned.pkl
Original dataset, after cleaning, formatted as a .pkl file.
The original CSV dataset can be found at: https://www.kaggle.com/datasets/mkechinov/ecommerce-behavior-data-from-multi-category-store

===== data_json =====
-> all_events_big_network.json
-> all_events_small_network.json
-> cart_events_big_network.json
-> cart_events_small_network.json
-> purchase_events_big_network.json
-> purchase_events_small_network.json
-> view_events_big_network.json
-> view_events_small_network.json
Samples from the original dataset. Data transformed using a graph data model. Formatted as a .json file
Note: This directory is not required for the app functioning. The app fetches these files from the external github repository mentioned above.

===== data_preprocesing =====
-> eCommerceBehaviour.ipynb
Pyhton pre-processing 

Requirements:
Jupiter notebooks (Development environment): https://jupyter.org/
Anaconda Navigator (Package manager for Python dependencies. Dependencies: Pandas, NumPy and json.): https://www.anaconda.com/products/distribution

===== src =====
-> force.json
Script responsible of rendering graph visualization

-> graph_controller.json
Graph configuration menu (form processing)

===== styles =====
-> custom.css
Stylesheet overriding boostrap


========== WEBSITE ==========

This app has been made available within the University public_html directory in the IS personal filestore (M:)
https://users.aber.ac.uk/jmp16/

========== CDN LIBRARIES ==========

- Google fonts (Fonts): https://fonts.google.com/
- Bootstrap (CSS library): https://getbootstrap.com/ 
- Font Awesome (Vectors): https://fontawesome.com/
- G6 antv (Graph visualization library): https://g6.antv.vision/en 
- jQuery (JavaScript library): https://jquery.com/