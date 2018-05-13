<?php
include 'ChromePhp.php';
function epub_show_nodes_form($form){
    drupal_flush_all_caches();
    $option = array();
    if( isset($_SESSION['nid'])) {
        $nid = $_SESSION['nid'];
        // wenn nid's enthalten erstelle checkboxesOptionen
        if ($nid != null) {
            $epubCard = node_load_multiple($nid);
            foreach ($epubCard as $n) {
                $option[$n->title] = $n->title;
            }
        }
    }
    // wenn session nid als key enthält und nid nicht leer ist führe aus
    if( isset($_SESSION['nid']) and !empty($_SESSION['nid']) ) {


        $form['general'] = array(
            '#type' => 'fieldset',
            '#title' => t('General'),
        );
        $form['general']['textfield'] = array(
            '#type' => 'textfield',
            '#title' => 'Titel',
            '#required' => TRUE,
        );
        $form['general']['beschreibung'] = array(
            '#type' => 'textfield',
            '#title' => 'Beschreibung',
            '#required' => TRUE,
        );

        $form['epub_items'] = array(
            '#type' => 'fieldset',
            '#title' => t('Epub articles'),
        );

        $form['epub_items']['check'] = array(
            '#title' => t('articles'),
            '#type' => 'checkboxes',
            '#description' => t('choose articles'),
            '#options' => $option,
        );


        $form['submit']['delete'] = array(
            '#type' => 'submit',
            '#value' => 'delete articel(s) from list',
            '#submit' => array('epub_show_nodes_delete')
        );
        $form['submit']['download'] = array(
            '#type' => 'submit',
            '#value' => 'download articel(s)',
            '#submit' => array('download')
        );



    } else {
        $form['some_text'] = array(
            '#markup' => '<p><b>Sie haben keine Artikel aus gewählt !</p>'
        );
    }
    dpm($_SESSION);
    return $form;

}


function download($form){
    $_SESSION['title'] = $form['textfield']['#value'];
    $_SESSION['beschreibung'] = $form['beschreibung']['#value'];


    drupal_goto($path = 'admin/epub/download');

}


//button delete()
function epub_show_nodes_delete($form, &$form_state){


    $sessionNid = $_SESSION['nid'];
    $node = node_load_multiple($sessionNid);
    $help = array();
    foreach ($node as $item){
     $help[$item->title] = $item->nid;
    }

    //Prüfe Checkbox
    foreach ($form_state['values']['check'] as $check){
        // wenn der wert nicht null ist (angeklickt bzw soll gelöscht werden)
        if (!empty($check)){
            //suche den titel der nid im $sessionNid und lösche den wert im $sessionNid
            if(($key = array_search($help[$check], $sessionNid)) !== false) {
                unset($sessionNid[$key]);

            }
        }
    }
    // ersetze das NidArray im SessionObjekt mit dem aktuellen
    $_SESSION['nid'] = $sessionNid;
    drupal_set_message("Node wurde gelöscht");
    drupal_flush_all_caches();

}
function getNodeInDatabase($nid){
    $title = db_query('SELECT n.title FROM {node} n WHERE n.nid = '. $nid )->fetchField();
    $body = db_query('SELECT n.body_value FROM {field_data_body} n WHERE n.entity_id = '.$nid )->fetchField();

    $node['title'] = $title;
    $node['body'] = nl2br($body);

    return $node;
};

function console_log( $data ){
    echo '<script>';
    echo 'console.log('. json_encode( $data ) .')';
    echo '</script>';
}
?>