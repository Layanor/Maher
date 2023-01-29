export function printDiv(divId: string) {
  //const css = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
  //integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">`;
  //const css2 = `<link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/droidarabickufi.css"
  //>`;
  const css3 = `<link rel="stylesheet" href="/styles.35fef115a927e096.css">`;
  const printContents = document.getElementById(divId).innerHTML;
  const pageContent = `<!DOCTYPE html dir="rtl"><html><head>
   ${css3}
</head><body style="width: 99%; margin-top: 10px; font-family: Droid Arabic Kufi; font-size: 16px; direction: rtl; " dir="rtl" onload="window.print();window.close()">${printContents}</html>`;
  let popupWindow: Window;
  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    popupWindow = window.open(
      '',
      '_blank',
      'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
    );
    popupWindow.window.focus();
    popupWindow.document.write(pageContent);
    popupWindow.document.close();
    popupWindow.onbeforeunload = event => {
      popupWindow.close();
    };
    popupWindow.onabort = event => {
      popupWindow.document.close();
      popupWindow.close();
    };
  } else {
    popupWindow = window.open('', '_blank', 'width=600,height=600');
    popupWindow.document.open();
    popupWindow.document.write(pageContent);
    popupWindow.document.close();
  }

}
