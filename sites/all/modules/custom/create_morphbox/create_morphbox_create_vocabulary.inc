<?php
/**
 * Created by PhpStorm.
 * User: julien
 * Date: 11.05.18
 * Time: 17:56
 */

function create_morphbox_create_morphstructure() {
    create_morphbox_create_vocabulary();
    dsm('Dimension erstellt');
    create_morphbox_create_term();
    dsm('Ausprägung erstellt');

    return null;
}


function create_morphbox_create_vocabulary() {

    $vocab_prefix = 'tax_morph_';

    $new_vocabulary = (object) array(
        'name' => 'My new vocab',
        'description' => 'This vocabulary',
        'machine_name' => $vocab_prefix . 'my_new_vocab',
    );

    taxonomy_vocabulary_save($new_vocabulary);
}

function create_morphbox_create_term() {
    $vocab = taxonomy_vocabulary_machine_name_load('tax_morph_my_new_vocab'); //TODO parameterisieren



    $term1 = (object) array(
        'name' => 'Term1',
        'description' => 'This is term 1',
        'vid' => $vocab->vid,

    );

    taxonomy_term_save($term1);

}