const getIconCode = iconId => {
  var digits = parseInt(iconId);
  let dayIconId = "0" + digits + "d";
  let nightIconId = "0" + digits + "n";

  //clear sky
  if (digits == 1) {
    if (iconId === dayIconId) {
      return "CLEAR_DAY";
    }
    if (iconId === nightIconId) {
      return "CLEAR_NIGHT";
    }
  }

  //partially cloudy
  if (digits == 2) {
    if (iconId === dayIconId) {
      return "PARTLY_CLOUDY_DAY";
    }
    if (iconId === nightIconId) {
      return "PARTLY_CLOUDY_NIGHT";
    }
  }

  //cloudy
  if (digits == 3 || digits == 4) {
    return "CLOUDY";
  }

  //rain
  if (digits == 9 || digits == 10) {
    return "RAIN";
  }

  //thunderstorm
  if (digits == 11) {
    return "SLEET";
  }

  //snow
  if (digits == 13) {
    return "SNOW";
  }

  //fog
  if (digits == 50) {
    return "FOG";
  }
};
