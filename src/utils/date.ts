const compareTimeDate = (dateBefore: Date, dateAfter: Date) :Date=> {
  if (dateBefore.getTime() > dateAfter.getTime()) {
    return true;
  } else {
    return false;
  }
};
