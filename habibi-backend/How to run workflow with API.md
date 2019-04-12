# How to run workflow with API

## 1. Get Cookies



## 2. Start a process

url:

	POST http://localhost:8081/api/engine/engine/default/process-definition/Process_1:15:5da340d1-131d-11e9-94dd-0242ac120004/submit-form

Body: 

	{"businessKey":"asdf","variables":{}}

Headers:

	Content-Type:application/json
	Cookie:defaultLocale=en-US; currency=USD; timezone=America/Los_Angeles; JSESSIONID=297B0F27AC2A2F4521C0

Response:

```
	[
	    {
	        "id": "dce14e4b-132d-11e9-94dd-0242ac120004",
	        "name": "task1_peter",
	        "assignee": null,
	        "created": "2019-01-08T11:12:11.172+0100",
	        "due": null,
	        "followUp": null,
	        "delegationState": null,
	        "description": null,
	        "executionId": "dcddf2e8-132d-11e9-94dd-0242ac120004",
	        "owner": null,
	        "parentTaskId": null,
	        "priority": 50,
	        "processDefinitionId": "Process_1:15:5da340d1-131d-11e9-94dd-0242ac120004",
	        "processInstanceId": "dcddf2e8-132d-11e9-94dd-0242ac120004",
	        "taskDefinitionKey": "Task_1reu257",
	        "caseExecutionId": null,
	        "caseInstanceId": null,
	        "caseDefinitionId": null,
	        "suspended": false,
	        "formKey": null,
	        "tenantId": null
	    }
	]
```

## 2.5.5. Get filter ID

url:

	GET http://localhost:8081/api/engine/engine/default/filter?itemCount=false&resoureType=Task

Headers:

	Normal

Body: 

	/

Response:

```
0: {id: "f0f1eb84-1323-11e9-94dd-0242ac120004", resourceType: "Task", name: "All Tasks", owner: null,…}
	id: "f0f1eb84-1323-11e9-94dd-0242ac120004"
	name: "All Tasks"
	owner: null
	properties: {color: "#555555", howUndefinedVariable: false, description: "Unfiltered Tasks", refresh: false,…}
		color: "#555555"
		description: "Unfiltered Tasks"
		howUndefinedVariable: false
		priority: 1
		refresh: false
	query: {taskVariables: [], processVariables: [], caseInstanceVariables: [], orQueries: []}
		caseInstanceVariables: []
		orQueries: []
		processVariables: []
		taskVariables: []
	resourceType: "Task"

```

We need the ID when we want to filter for tasks later, to get the task IDs.

## 2.5 List Tasks

list the tasks to get the task id.

url:

	POST http://localhost:8081/api/engine/engine/default/filter/f0f1eb84-1323-11e9-94dd-0242ac120004/list?firstResult=0&maxResults=15

Headers: 

	Normal

Body:

	/







## 3.  Claim task

url:

	POST http://localhost:8081/api/engine/engine/default/task/6e737e70-1343-11e9-94dd-0242ac120004/claim

Headers:

	Content-Type:application/json
	Cookie:defaultLocale=en-US; currency=USD; timezone=America/Los_Angeles; JSESSIONID=297B0F27AC2A2F4521C0

Body:

	{"userId":"admin"}	


## 4. Get User Tasks

url:

	GET http://localhost:8081/api/engine/engine/default/task/6e737e70-1343-11e9-94dd-0242ac120004/form-variables

Headers: 

	Content-Type:application/json
	Cookie:defaultLocale=en-US; currency=USD; timezone=America/Los_Angeles; JSESSIONID=297B0F27AC2A2F4521C0

Response:

```
	{
	    "FormField_30aimms": {
	        "type": "String",
	        "value": "orange",
	        "valueInfo": {}
	    }
	}
```


## 5. Post Variables for user task

url:

	POST http://localhost:8081/api/engine/engine/default/task/6e737e70-1343-11e9-94dd-0242ac120004/submit-form

Headers:

	Content-Type:application/json
	Cookie:defaultLocale=en-US; currency=USD; timezone=America/Los_Angeles; JSESSIONID=297B0F27AC2A2F4521C0


Body:

	{"variables":{}}




## OPTIONAL Get info about started process

url:

	GET http://localhost:8081/api/engine/engine/default/task/6e737e70-1343-11e9-94dd-0242ac120004

Headers:

	Content-Type:application/json
	Cookie:defaultLocale=en-US; currency=USD; timezone=America/Los_Angeles; JSESSIONID=297B0F27AC2A2F4521C0


Response: