<?php

namespace Drupal\passwordwidgets\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class hideShowPassword extends ConfigFormBase {
  /*
  * Hide show password widget Id
  */
  public function getFormId() {
    return 'hide_show_password_configration';
  }

  /*
  * Create configurations Name
  */
  protected function getEditableConfigNames() {
    return [
      'hide_show.settings',
    ];
  }

  /*
  * Create form for configure Widget
  */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $config = $this->config('hide_show.settings');

    $form['passwordwidgets_password_config'] = [
      '#type' => 'radios',
      '#title' => t('Password Configration'),
      '#description' => t('Choose show password widgets.'),
      '#options' => [
        '1' => t('Show password click on image'),
        '2' => t('Show password check box display'),
        '3' => t('Click on field show and hide field display'),
        '4' => t('Default Option')
      ],
      '#default_value' => $config->get('hide_show_value'),
    ];

    $form['passwordwidgets_generate_strong_password'] = [
      '#type' => 'checkbox', 
      '#title' => t('Generate Strong Password.'),
      '#description' => t('Enable generate password widgets in account page.'),
      '#default_value' => $config->get('strong_password'),
    ];

    $form['password_range'] = [
      '#type' => 'select',
      '#title' => t('Password range in Charactors'),
      '#description' => t('Default password range is 10.'),
      '#options' => [
        '1' => t('5'),
        '2' => t('8'),
        '3' => t('10'),
        '4' => t('12'),
        '5' => t('15'),
        '6' => t('18'),
        '7' => t('20')
      ],
      '#default_value' => $config->get('range'),
    ];

    $form['password_type'] = [
      '#type' => 'radios',
      '#title' => t('Password Type'),
      '#description' => t('Choose password Type.'),
      '#options' => [
        '1' => t('3D Password'),
        '2' => t('Alphabets (A-Z, a-z)'),
        '3' => t('Alphabets with Numbers (A-Z, a-z, 0-9)'),
        '4' => t('Numbers with Special charactors (0-9, @~#)'),
        '5' => t('Alphabets with special charactors (A-Z, a-z, @~#)'),
      ],
      '#default_value' => $config->get('password_types'),
    ];


    // Add a submit button that handles the submission of the form.
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return parent::buildForm($form, $form_state);;
  }

  /*
  * Submit password Widget 
  */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = \Drupal::service('config.factory')->getEditable('hide_show.settings');
    $config->set('hide_show_value', $form_state->getValue('passwordwidgets_password_config'));
    $config->set('strong_password', $form_state->getValue('passwordwidgets_generate_strong_password'));
    $config->set('range', $form_state->getValue('password_range'));
    $config->set('password_types', $form_state->getValue('password_type'))
     ->save();  

    parent::submitForm($form, $form_state);
  }
}
