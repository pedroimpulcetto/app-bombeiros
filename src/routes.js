import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Inicio from './pages/Inicio.js';
import Talao from './pages/Talao.js';
import Crm from './pages/Crm.js';
import Resumo from './pages/Resumo.js';
import EditCrm from './pages/EditCrm.js';
import Ontem from './pages/Ontem.js';
import Semana from './pages/Semana.js';

const Routes = createAppContainer(
	createSwitchNavigator({
		Inicio,
		Talao,
		Crm,
		Resumo,
		EditCrm,
		Ontem,
		Semana
	})
);

export default Routes;
