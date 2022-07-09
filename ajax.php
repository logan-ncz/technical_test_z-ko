<?php

	$testSlider = filter_input(INPUT_POST, 'z_test');

	if($testSlider == 'slider')
	{
		$retour = array(
			'https://www.metalorgie.com/grp_tof/982-photo_Kiss.jpg',
			'https://www.metalorgie.com/grp_tof/2326-photo_Motley_Crue.jpg',
			'https://www.metalorgie.com/grp_tof/2728-photo_Alestorm.jpg',
			'https://www.metalorgie.com//grp_tof/Dragonforce.jpg',
		);

		die(json_encode($retour));
	}

?>