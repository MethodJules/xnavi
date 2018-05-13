<?php
/**
 * Created by PhpStorm.
 * User: julien
 * Date: 01.04.18
 * Time: 20:01
 */

function saveNid_callback($form){
    if ( ! isset($_SESSION['nid']) ){
        $_SESSION['nid'] = array();
    }

    // testen mit $node->nid und vorher abfrage ob null
    // hole die node id aus dem node
    if (arg(0) == 'node') {
        $nid = arg(1);
    }
    $value = array();
    $sessionNid = $_SESSION['nid'];
    //  hole alle nid's aus dem sessionObjekt
    foreach ($sessionNid as $item){
        array_push($value, $item);
    }
    //wenn die neue nid nich enthalten ist füge sie hinzu
    if(!in_array($nid, $sessionNid) && $nid != 0) {
        array_push($value, $nid);

        $_SESSION['nid'] = $value;
    }
    // cache leeren um anzeige(zahl) im menuLink zu aktualiesieren
    drupal_flush_all_caches();
}