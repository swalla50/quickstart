function PrintPDF(e){
    e.preventDefault();
    $(document).ready(function(){
        $('#btn-print-this').click(function(){
            $('#content').printThis();
        })
    });
}