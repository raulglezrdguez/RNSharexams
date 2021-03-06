const municipalities = [
  {label: 'Sandino', prov: '21', mun: '01'},
  {label: 'Mantua', prov: '21', mun: '02'},
  {label: 'Minas de Matahambre', prov: '21', mun: '03'},
  {label: 'Viñales', prov: '21', mun: '04'},
  {label: 'La Palma', prov: '21', mun: '05'},
  {label: 'Los Palacios', prov: '21', mun: '06'},
  {label: 'Consolación del Sur', prov: '21', mun: '07'},
  {label: 'Pinar del Río', prov: '21', mun: '08'},
  {label: 'San Luis', prov: '21', mun: '09'},
  {label: 'San Juan y Martínez', prov: '21', mun: '10'},
  {label: 'Guane', prov: '21', mun: '11'},
  {label: 'Bahía Honda', prov: '22', mun: '01'},
  {label: 'Mariel', prov: '22', mun: '02'},
  {label: 'Guanajay', prov: '22', mun: '03'},
  {label: 'Caimito', prov: '22', mun: '04'},
  {label: 'Bauta', prov: '22', mun: '05'},
  {label: 'San Antonio de los Baños', prov: '22', mun: '06'},
  {label: 'Güira de Melena', prov: '22', mun: '07'},
  {label: 'Alquízar', prov: '22', mun: '08'},
  {label: 'Artemisa', prov: '22', mun: '09'},
  {label: 'Candelaria', prov: '22', mun: '10'},
  {label: 'San Cristóbal', prov: '22', mun: '11'},
  {label: 'Playa', prov: '23', mun: '01'},
  {label: 'Plaza de la Revolución', prov: '23', mun: '02'},
  {label: 'Centro Habana', prov: '23', mun: '03'},
  {label: 'La Habana Vieja', prov: '23', mun: '04'},
  {label: 'Regla', prov: '23', mun: '05'},
  {label: 'La Habana del Este', prov: '23', mun: '06'},
  {label: 'Guanabacoa', prov: '23', mun: '07'},
  {label: 'San Miguel del Padrón', prov: '23', mun: '08'},
  {label: 'Diez de Octubre', prov: '23', mun: '09'},
  {label: 'Cerro', prov: '23', mun: '10'},
  {label: 'Marianao', prov: '23', mun: '11'},
  {label: 'La Lisa', prov: '23', mun: '12'},
  {label: 'Boyeros', prov: '23', mun: '13'},
  {label: 'Arroyo Naranjo', prov: '23', mun: '14'},
  {label: 'Cotorro', prov: '23', mun: '15'},
  {label: 'Bejucal', prov: '24', mun: '01'},
  {label: 'San José de las Lajas', prov: '24', mun: '02'},
  {label: 'Jaruco', prov: '24', mun: '03'},
  {label: 'Santa Cruz del Norte', prov: '24', mun: '04'},
  {label: 'Madruga', prov: '24', mun: '05'},
  {label: 'Nueva Paz', prov: '24', mun: '06'},
  {label: 'San Nicolás', prov: '24', mun: '07'},
  {label: 'Güines', prov: '24', mun: '08'},
  {label: 'Melena del Sur', prov: '24', mun: '09'},
  {label: 'Batabanó', prov: '24', mun: '10'},
  {label: 'Quivicán', prov: '24', mun: '11'},
  {label: 'Matanzas', prov: '25', mun: '01'},
  {label: 'Cárdenas', prov: '25', mun: '02'},
  {label: 'Martí', prov: '25', mun: '03'},
  {label: 'Colón', prov: '25', mun: '04'},
  {label: 'Perico', prov: '25', mun: '05'},
  {label: 'Jovellanos', prov: '25', mun: '06'},
  {label: 'Pedro Betancourt', prov: '25', mun: '07'},
  {label: 'Limonar', prov: '25', mun: '08'},
  {label: 'Unión de Reyes', prov: '25', mun: '09'},
  {label: 'Ciénaga de Zapata', prov: '25', mun: '10'},
  {label: 'Jagüey Grande', prov: '25', mun: '11'},
  {label: 'Calimete', prov: '25', mun: '12'},
  {label: 'Los Arabos', prov: '25', mun: '13'},
  {label: 'Corralillo', prov: '26', mun: '01'},
  {label: 'Quemado de Güines', prov: '26', mun: '02'},
  {label: 'Sagua la Grande', prov: '26', mun: '03'},
  {label: 'Encrucijada', prov: '26', mun: '04'},
  {label: 'Camajuaní', prov: '26', mun: '05'},
  {label: 'Caibarién', prov: '26', mun: '06'},
  {label: 'Remedios', prov: '26', mun: '07'},
  {label: 'Placetas', prov: '26', mun: '08'},
  {label: 'Santa Clara', prov: '26', mun: '09'},
  {label: 'Cifuentes', prov: '26', mun: '10'},
  {label: 'Santo Domingo', prov: '26', mun: '11'},
  {label: 'Ranchuelo', prov: '26', mun: '12'},
  {label: 'Manicaragua', prov: '26', mun: '13'},
  {label: 'Aguada de Pasajeros', prov: '27', mun: '01'},
  {label: 'Rodas', prov: '27', mun: '02'},
  {label: 'Palmira', prov: '27', mun: '03'},
  {label: 'Lajas', prov: '27', mun: '04'},
  {label: 'Cruces', prov: '27', mun: '05'},
  {label: 'Cumanayagua', prov: '27', mun: '06'},
  {label: 'Cienfuegos', prov: '27', mun: '07'},
  {label: 'Abreus', prov: '27', mun: '08'},
  {label: 'Yaguajay', prov: '28', mun: '01'},
  {label: 'Jatibonico', prov: '28', mun: '02'},
  {label: 'Taguasco', prov: '28', mun: '03'},
  {label: 'Cabaiguán', prov: '28', mun: '04'},
  {label: 'Fomento', prov: '28', mun: '05'},
  {label: 'Trinidad', prov: '28', mun: '06'},
  {label: 'Sancti Spíritus', prov: '28', mun: '07'},
  {label: 'La Sierpe', prov: '28', mun: '08'},
  {label: 'Chambas', prov: '29', mun: '01'},
  {label: 'Morón', prov: '29', mun: '02'},
  {label: 'Bolivia', prov: '29', mun: '03'},
  {label: 'Primero de Enero', prov: '29', mun: '04'},
  {label: 'Ciro Redondo', prov: '29', mun: '05'},
  {label: 'Florencia', prov: '29', mun: '06'},
  {label: 'Majagua', prov: '29', mun: '07'},
  {label: 'Ciego de Ávila', prov: '29', mun: '08'},
  {label: 'Venezuela', prov: '29', mun: '09'},
  {label: 'Baraguá', prov: '29', mun: '10'},
  {label: 'Carlos Manuel de Céspedes', prov: '30', mun: '01'},
  {label: 'Esmeralda', prov: '30', mun: '02'},
  {label: 'Sierra de Cubitas', prov: '30', mun: '03'},
  {label: 'Minas', prov: '30', mun: '04'},
  {label: 'Nuevitas', prov: '30', mun: '05'},
  {label: 'Guáimaro', prov: '30', mun: '06'},
  {label: 'Sibanicú', prov: '30', mun: '07'},
  {label: 'Camagüey', prov: '30', mun: '08'},
  {label: 'Florida', prov: '30', mun: '09'},
  {label: 'Vertientes', prov: '30', mun: '10'},
  {label: 'Jimaguayú', prov: '30', mun: '11'},
  {label: 'Najasa', prov: '30', mun: '12'},
  {label: 'Santa Cruz del Sur', prov: '30', mun: '13'},
  {label: 'Manatí', prov: '31', mun: '01'},
  {label: 'Puerto Padre', prov: '31', mun: '02'},
  {label: 'Jesús Menéndez', prov: '31', mun: '03'},
  {label: 'Majibacoa', prov: '31', mun: '04'},
  {label: 'Las Tunas', prov: '31', mun: '05'},
  {label: 'Jobabo', prov: '31', mun: '06'},
  {label: 'Colombia', prov: '31', mun: '07'},
  {label: 'Amancio', prov: '31', mun: '08'},
  {label: 'Gibara', prov: '32', mun: '01'},
  {label: 'Rafael Freyre', prov: '32', mun: '02'},
  {label: 'Banes', prov: '32', mun: '03'},
  {label: 'Antilla', prov: '32', mun: '04'},
  {label: 'Báguanos', prov: '32', mun: '05'},
  {label: 'Holguín', prov: '32', mun: '06'},
  {label: 'Calixto García', prov: '32', mun: '07'},
  {label: 'Cacocum', prov: '32', mun: '08'},
  {label: 'Urbano Noris', prov: '32', mun: '09'},
  {label: 'Cueto', prov: '32', mun: '10'},
  {label: 'Mayarí', prov: '32', mun: '11'},
  {label: 'Frank País', prov: '32', mun: '12'},
  {label: 'Sagua de Tánamo', prov: '32', mun: '13'},
  {label: 'Moa', prov: '32', mun: '14'},
  {label: 'Río Cauto', prov: '33', mun: '01'},
  {label: 'Cauto Cristo', prov: '33', mun: '02'},
  {label: 'Jiguaní', prov: '33', mun: '03'},
  {label: 'Bayamo', prov: '33', mun: '04'},
  {label: 'Yara', prov: '33', mun: '05'},
  {label: 'Manzanillo', prov: '33', mun: '06'},
  {label: 'Campechuela', prov: '33', mun: '07'},
  {label: 'Media Luna', prov: '33', mun: '08'},
  {label: 'Niquero', prov: '33', mun: '09'},
  {label: 'Pilón', prov: '33', mun: '10'},
  {label: 'Bartolomé Masó', prov: '33', mun: '11'},
  {label: 'Buey Arriba', prov: '33', mun: '12'},
  {label: 'Guisa', prov: '33', mun: '13'},
  {label: 'Contramaestre', prov: '34', mun: '01'},
  {label: 'Mella', prov: '34', mun: '02'},
  {label: 'San Luis', prov: '34', mun: '03'},
  {label: 'Segundo Frente', prov: '34', mun: '04'},
  {label: 'Songo - La Maya', prov: '34', mun: '05'},
  {label: 'Santiago de Cuba', prov: '34', mun: '06'},
  {label: 'Palma Soriano', prov: '34', mun: '07'},
  {label: 'Tercer Frente', prov: '34', mun: '08'},
  {label: 'Guamá', prov: '34', mun: '09'},
  {label: 'El Salvador', prov: '35', mun: '01'},
  {label: 'Manuel Tames', prov: '35', mun: '02'},
  {label: 'Yateras', prov: '35', mun: '03'},
  {label: 'Baracoa', prov: '35', mun: '04'},
  {label: 'Maisí', prov: '35', mun: '05'},
  {label: 'Imías', prov: '35', mun: '06'},
  {label: 'San Antonio del Sur', prov: '35', mun: '07'},
  {label: 'Caimanera', prov: '35', mun: '08'},
  {label: 'Guantánamo', prov: '35', mun: '09'},
  {label: 'Niceto Pérez', prov: '35', mun: '10'},
  {label: 'Isla de la Juventud', prov: '40', mun: '01'},
];

export default municipalities;
