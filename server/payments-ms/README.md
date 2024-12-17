# notes
- Al momento de registrar un usuario es necesario ejecutar:
  - stripe-create-customer: crea un customer id para las subs
  
- Para subscribirse se necesita un metodo de pago por default, para ello ejecutar primero:
  - stripe-customer-portal: con el id customer genera una url para configurar los metodos de pago y ver/cancelar las subscripciones
  
- Una vez se configure el metodo de pago por default, comprar la subscripcion ejecutand:
  - stripe-create-subscription: con el customer id y el precio asociado a la subscripcion (puede tener varios precios pero solo trabajaremos con un precio)