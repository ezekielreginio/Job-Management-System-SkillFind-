import { csrftoken } from "../_global/global";


export function RequestFactory(action){

    const request = new Request(
        action // "./request/reorder_task"
    );
    return request

}

export function RequestBodyFactory(context){
    /*
        Factory Parameters
        context = {
            "type": type,
            "method": POST or GET,
            "body": request data to be sent
        }
    */
    let header = {}
    if(context['type'] == "application/json"){
        header = {
            'Content-Type': context['type'], //'application/json',
            'X-CSRFToken': csrftoken //csrftoken
        }
    }
    else{
        header = {
            'X-CSRFToken': csrftoken //csrftoken
        }
    }
    const body = {
        method: context['method'], //POST,
        body: context['body'], //JSON.stringify(json_order),
        headers: header,
        mode: 'same-origin'  // Do not send CSRF token to another domain.
    }

    return body
}

