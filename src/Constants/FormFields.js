const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"   
    }

]

let customCSS = "p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

const addBookFields=[
    {
        labelText:"Book Name",
        labelFor:"book-name",
        id:"title",
        name:"title",
        type:"text",
        autoComplete:"book-name",
        isRequired:true,
        placeholder:"Book Name",
        customcss:customCSS
    },
    {
        labelText:"Book Slug",
        labelFor:"book-slug",
        id:"slug",
        name:"slug",
        type:"text",
        autoComplete:"book-slug",
        isRequired:true,
        placeholder:"Book Slug",
        customcss:customCSS
    }
]

const addPageFields=[
    {
        labelText:"title",
        labelFor:"title",
        id:"title",
        name:"title",
        type:"text",
        autoComplete:"title",
        isRequired:true,
        placeholder:"title",
        customcss:customCSS
    }
]

export {loginFields,signupFields,addBookFields,addPageFields}