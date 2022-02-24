==> MODULES
modules are ways to organize components with related functionallity
modules are singletons, so they can be imported by multiple modules

creating a module through the nest cli `nest g module [name]`

==> CONTROLLERS
controllers are responsible for handling requests and responses
they are bonded to a specific path, for example /tasks and contains handlers
handlers are responsible for handling http methods for certain endpoints

request incoming => routed to a controller depending on the path => handled by a handler depending on the method and endpoint

creating a controller through the nest cli `nest g controller [name] --no-spec`

==> SERVICES
contains the bussiness logic and can be injected into controllers to use that logic

creating a service through the nest cli `nest g service [name] --no-spec`

==> DTO (DATA TRANSFER OBJECT)
is an object used to encapsulate and define how to move data between processes and services
use classes instead of interfaces (which are part of typescript and not preserved post-compilation)

==> PATCH BEST PRACTICES
refer to the resource in the URL
refer to a specific item by ID
specifi what has to be patched in the URL
provide the required parameters in the BODY

example => `PATCH http://localhost:3000/tasks/a00751a7-2f42-4a82-9d00-e46fcc5ceea7/status`