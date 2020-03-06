/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var proto = { pulumirpc: {} }, global = proto;

var plugin_pb = require('./plugin_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.exportSymbol('proto.pulumirpc.GetRequiredPluginsRequest', null, global);
goog.exportSymbol('proto.pulumirpc.GetRequiredPluginsResponse', null, global);
goog.exportSymbol('proto.pulumirpc.RunRequest', null, global);
goog.exportSymbol('proto.pulumirpc.RunResponse', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pulumirpc.GetRequiredPluginsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pulumirpc.GetRequiredPluginsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.pulumirpc.GetRequiredPluginsRequest.displayName = 'proto.pulumirpc.GetRequiredPluginsRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pulumirpc.GetRequiredPluginsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pulumirpc.GetRequiredPluginsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pulumirpc.GetRequiredPluginsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pulumirpc.GetRequiredPluginsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    project: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pwd: jspb.Message.getFieldWithDefault(msg, 2, ""),
    program: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pulumirpc.GetRequiredPluginsRequest}
 */
proto.pulumirpc.GetRequiredPluginsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pulumirpc.GetRequiredPluginsRequest;
  return proto.pulumirpc.GetRequiredPluginsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pulumirpc.GetRequiredPluginsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pulumirpc.GetRequiredPluginsRequest}
 */
proto.pulumirpc.GetRequiredPluginsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setProject(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPwd(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setProgram(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pulumirpc.GetRequiredPluginsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pulumirpc.GetRequiredPluginsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pulumirpc.GetRequiredPluginsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pulumirpc.GetRequiredPluginsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProject();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPwd();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getProgram();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string project = 1;
 * @return {string}
 */
proto.pulumirpc.GetRequiredPluginsRequest.prototype.getProject = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.pulumirpc.GetRequiredPluginsRequest.prototype.setProject = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string pwd = 2;
 * @return {string}
 */
proto.pulumirpc.GetRequiredPluginsRequest.prototype.getPwd = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.pulumirpc.GetRequiredPluginsRequest.prototype.setPwd = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string program = 3;
 * @return {string}
 */
proto.pulumirpc.GetRequiredPluginsRequest.prototype.getProgram = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.pulumirpc.GetRequiredPluginsRequest.prototype.setProgram = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pulumirpc.GetRequiredPluginsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pulumirpc.GetRequiredPluginsResponse.repeatedFields_, null);
};
goog.inherits(proto.pulumirpc.GetRequiredPluginsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.pulumirpc.GetRequiredPluginsResponse.displayName = 'proto.pulumirpc.GetRequiredPluginsResponse';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pulumirpc.GetRequiredPluginsResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pulumirpc.GetRequiredPluginsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pulumirpc.GetRequiredPluginsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pulumirpc.GetRequiredPluginsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pulumirpc.GetRequiredPluginsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginsList: jspb.Message.toObjectList(msg.getPluginsList(),
    plugin_pb.PluginDependency.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pulumirpc.GetRequiredPluginsResponse}
 */
proto.pulumirpc.GetRequiredPluginsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pulumirpc.GetRequiredPluginsResponse;
  return proto.pulumirpc.GetRequiredPluginsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pulumirpc.GetRequiredPluginsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pulumirpc.GetRequiredPluginsResponse}
 */
proto.pulumirpc.GetRequiredPluginsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new plugin_pb.PluginDependency;
      reader.readMessage(value,plugin_pb.PluginDependency.deserializeBinaryFromReader);
      msg.addPlugins(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pulumirpc.GetRequiredPluginsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pulumirpc.GetRequiredPluginsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pulumirpc.GetRequiredPluginsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pulumirpc.GetRequiredPluginsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      plugin_pb.PluginDependency.serializeBinaryToWriter
    );
  }
};


/**
 * repeated PluginDependency plugins = 1;
 * @return {!Array<!proto.pulumirpc.PluginDependency>}
 */
proto.pulumirpc.GetRequiredPluginsResponse.prototype.getPluginsList = function() {
  return /** @type{!Array<!proto.pulumirpc.PluginDependency>} */ (
    jspb.Message.getRepeatedWrapperField(this, plugin_pb.PluginDependency, 1));
};


/** @param {!Array<!proto.pulumirpc.PluginDependency>} value */
proto.pulumirpc.GetRequiredPluginsResponse.prototype.setPluginsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.pulumirpc.PluginDependency=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pulumirpc.PluginDependency}
 */
proto.pulumirpc.GetRequiredPluginsResponse.prototype.addPlugins = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.pulumirpc.PluginDependency, opt_index);
};


proto.pulumirpc.GetRequiredPluginsResponse.prototype.clearPluginsList = function() {
  this.setPluginsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pulumirpc.RunRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pulumirpc.RunRequest.repeatedFields_, null);
};
goog.inherits(proto.pulumirpc.RunRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.pulumirpc.RunRequest.displayName = 'proto.pulumirpc.RunRequest';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pulumirpc.RunRequest.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pulumirpc.RunRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pulumirpc.RunRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pulumirpc.RunRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pulumirpc.RunRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    project: jspb.Message.getFieldWithDefault(msg, 1, ""),
    stack: jspb.Message.getFieldWithDefault(msg, 2, ""),
    pwd: jspb.Message.getFieldWithDefault(msg, 3, ""),
    program: jspb.Message.getFieldWithDefault(msg, 4, ""),
    argsList: jspb.Message.getRepeatedField(msg, 5),
    configMap: (f = msg.getConfigMap()) ? f.toObject(includeInstance, undefined) : [],
    dryrun: jspb.Message.getFieldWithDefault(msg, 7, false),
    parallel: jspb.Message.getFieldWithDefault(msg, 8, 0),
    monitorAddress: jspb.Message.getFieldWithDefault(msg, 9, ""),
    querymode: jspb.Message.getFieldWithDefault(msg, 10, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pulumirpc.RunRequest}
 */
proto.pulumirpc.RunRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pulumirpc.RunRequest;
  return proto.pulumirpc.RunRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pulumirpc.RunRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pulumirpc.RunRequest}
 */
proto.pulumirpc.RunRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setProject(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStack(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPwd(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setProgram(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.addArgs(value);
      break;
    case 6:
      var value = msg.getConfigMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "");
         });
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDryrun(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setParallel(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setMonitorAddress(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setQuerymode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pulumirpc.RunRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pulumirpc.RunRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pulumirpc.RunRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pulumirpc.RunRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProject();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getStack();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPwd();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getProgram();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getArgsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      5,
      f
    );
  }
  f = message.getConfigMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(6, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = message.getDryrun();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getParallel();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getMonitorAddress();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getQuerymode();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
};


/**
 * optional string project = 1;
 * @return {string}
 */
proto.pulumirpc.RunRequest.prototype.getProject = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.pulumirpc.RunRequest.prototype.setProject = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string stack = 2;
 * @return {string}
 */
proto.pulumirpc.RunRequest.prototype.getStack = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.pulumirpc.RunRequest.prototype.setStack = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string pwd = 3;
 * @return {string}
 */
proto.pulumirpc.RunRequest.prototype.getPwd = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.pulumirpc.RunRequest.prototype.setPwd = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string program = 4;
 * @return {string}
 */
proto.pulumirpc.RunRequest.prototype.getProgram = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.pulumirpc.RunRequest.prototype.setProgram = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated string args = 5;
 * @return {!Array<string>}
 */
proto.pulumirpc.RunRequest.prototype.getArgsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 5));
};


/** @param {!Array<string>} value */
proto.pulumirpc.RunRequest.prototype.setArgsList = function(value) {
  jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.pulumirpc.RunRequest.prototype.addArgs = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


proto.pulumirpc.RunRequest.prototype.clearArgsList = function() {
  this.setArgsList([]);
};


/**
 * map<string, string> config = 6;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.pulumirpc.RunRequest.prototype.getConfigMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 6, opt_noLazyCreate,
      null));
};


proto.pulumirpc.RunRequest.prototype.clearConfigMap = function() {
  this.getConfigMap().clear();
};


/**
 * optional bool dryRun = 7;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.pulumirpc.RunRequest.prototype.getDryrun = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 7, false));
};


/** @param {boolean} value */
proto.pulumirpc.RunRequest.prototype.setDryrun = function(value) {
  jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional int32 parallel = 8;
 * @return {number}
 */
proto.pulumirpc.RunRequest.prototype.getParallel = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/** @param {number} value */
proto.pulumirpc.RunRequest.prototype.setParallel = function(value) {
  jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional string monitor_address = 9;
 * @return {string}
 */
proto.pulumirpc.RunRequest.prototype.getMonitorAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/** @param {string} value */
proto.pulumirpc.RunRequest.prototype.setMonitorAddress = function(value) {
  jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional bool queryMode = 10;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.pulumirpc.RunRequest.prototype.getQuerymode = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 10, false));
};


/** @param {boolean} value */
proto.pulumirpc.RunRequest.prototype.setQuerymode = function(value) {
  jspb.Message.setProto3BooleanField(this, 10, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pulumirpc.RunResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pulumirpc.RunResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.pulumirpc.RunResponse.displayName = 'proto.pulumirpc.RunResponse';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pulumirpc.RunResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pulumirpc.RunResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pulumirpc.RunResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pulumirpc.RunResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    error: jspb.Message.getFieldWithDefault(msg, 1, ""),
    bail: jspb.Message.getFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pulumirpc.RunResponse}
 */
proto.pulumirpc.RunResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pulumirpc.RunResponse;
  return proto.pulumirpc.RunResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pulumirpc.RunResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pulumirpc.RunResponse}
 */
proto.pulumirpc.RunResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBail(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pulumirpc.RunResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pulumirpc.RunResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pulumirpc.RunResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pulumirpc.RunResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getBail();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string error = 1;
 * @return {string}
 */
proto.pulumirpc.RunResponse.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.pulumirpc.RunResponse.prototype.setError = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool bail = 2;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.pulumirpc.RunResponse.prototype.getBail = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 2, false));
};


/** @param {boolean} value */
proto.pulumirpc.RunResponse.prototype.setBail = function(value) {
  jspb.Message.setProto3BooleanField(this, 2, value);
};


goog.object.extend(exports, proto.pulumirpc);