<?php
/**
 * Created by PhpStorm.
 * User: julien
 * Date: 11.05.18
 * Time: 18:26
 */


/**
 * Implements hook_theme
 *
 */

/**
 * Implements hook_theme().
 */
function create_morphbox_theme($existing, $type, $theme, $path)
{
    return array(
        'create_morphbox_textfield_table' => array(
          'render element' => 'element',
        ),
    );
}



function form_create_morphbox($form, &$form_state) {
    $form['description'] = array(
        '#type' => 'item',
        '#title' => t('Create your Morphbox'),
        '#description' => t('Create Dimensions and Values'),
    );
    $form['name'] = array(
        '#type' => 'fieldset',
        '#title' => t('Dimension'),
        '#collapsible' => TRUE,
        '#collapsed' => FALSE,
    );

    $form['name']['first'] = array(
        '#type' => 'textfield',
        '#title' => t('Dimension'),
        '#required' => TRUE,
        '#default_value' => "Dimension",
        '#description' => t("Please enter your dimension name."),
        '#size' => 20,
        '#maxlength' => 20,
        '#ajax' => array(
            'callback' => 'ajaxforms_basic_callback',
            'wrapper' => 'ajaxforms-basic-wrapper',
        ),

    );

    $form['name']['table'] = array(
        '#prefix' => '<div id="ajaxforms-basic-wrapper">',
        '#suffix' => '</div>',
    );


    $form['year_of_birth'] = array(
        '#type' => 'textfield',
        '#title' => "Year of birth",
        '#description' => 'Format is "YYYY"',
    );

    $form['submit'] = array(
        '#type' => 'submit',
        '#value' => 'Submit',
    );
    return $form;
}

function ajaxforms_basic_callback($form, &$form_state) {
    dsm($form_state);

    $dimension = $form_state['value'];

    return $form['name']['table'] = array(
        '#type' => 'markup',
        '#markup' => '<p>Tabelle</p>',
    );
}

function form_create_morphbox_validate($form, &$form_state) {
    $year_of_birth = $form_state['values']['year_of_birth'];
    if ($year_of_birth && ($year_of_birth < 1900 || $year_of_birth > 2000)) {
        form_set_error('year_of_birth', t('Enter a year between 1900 and 2000.'));
    }
}

function form_create_morphbox_submit($form, &$form_state) {
    drupal_set_message(t('The form has been submitted. name="@first @last", year of birth=@year_of_birth',
        array(
            '@first' => $form_state['values']['first'],
            '@last' => $form_state['values']['last'],
            '@year_of_birth' => $form_state['values']['year_of_birth'],
        )
    ));
}

