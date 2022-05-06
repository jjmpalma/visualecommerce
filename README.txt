This file describes the structure and content of the technical work

========== WEBSITE ==========

This app has been made available within the University public_html directory in the IS personal filestore (M:)
https://users.aber.ac.uk/jmp16/

========== CDN LIBRARIES ==========

- Google fonts (Fonts): https://fonts.google.com/
- Bootstrap (CSS library): https://getbootstrap.com/ (CSS library)
- Font Awesome (Vectors): https://fontawesome.com/
- G6 antv (Graph visualization library): https://g6.antv.vision/en 
- jQuery (JavaScript library): https://jquery.com/

========== EXTERNAL FILES ==========

Files fetched from github external repository:
- data_json: https://github.com/jjmpalma/jjmpalma.github.io/tree/main/data_json
- vectors: https://github.com/jjmpalma/jjmpalma.github.io/tree/main/assets

========== DIRECTORIES AND FILES ==========

-> index.html

===== data =====
Original dataset, after cleaning, formatted as a .pkl file.
The original CSV dataset can be found at: https://www.kaggle.com/datasets/mkechinov/ecommerce-behavior-data-from-multi-category-store
-> ecommerceBehaviourCleaned.pkl


===== data_json =====
Samples from the original dataset. Data transformed using a graph data model. Formatted as a .json file
-> all_events_big_network.json
-> all_events_small_network.json
-> cart_events_big_network.json
-> cart_events_small_network.json
-> purchase_events_big_network.json
-> purchase_events_small_network.json
-> view_events_big_network.json
-> view_events_small_network.json

Note: This directory is not required for the app functioning. The app fetches these files from the external github repository mentioned above.


===== data_preprocesing =====
Pyhton pre-processing 
-> eCommerceBehaviour.ipynb

Requirements:
Jupiter notebooks (Development environment for notebooks, code, and data): https://jupyter.org/
Anaconda Navigator (Package manager for Python dependencies. Dependencies: Pandas, NumPy and json.): https://www.anaconda.com/products/distribution


===== src =====
Script responsible of rendering graph visualization
-> force.json

Graph configuration menu (form processing)
-> graph_controller.json

===== styles =====
Stylesheet overriding boostrap
-> custom.css


