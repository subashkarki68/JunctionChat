// @bun
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => (all[name] = () => newValue),
    });
};

// node_modules/@sinclair/typebox/build/esm/value/guard/guard.mjs
function IsAsyncIterator(value) {
  return IsObject(value) && Symbol.asyncIterator in value;
}
function IsIterator(value) {
  return IsObject(value) && Symbol.iterator in value;
}
function IsStandardObject(value) {
  return (
    IsObject(value) &&
    (Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null)
  );
}
function IsPromise(value) {
  return value instanceof Promise;
}
function IsDate(value) {
  return value instanceof Date && Number.isFinite(value.getTime());
}
function IsTypedArray(value) {
  return ArrayBuffer.isView(value);
}
function IsUint8Array(value) {
  return value instanceof globalThis.Uint8Array;
}
function HasPropertyKey(value, key) {
  return key in value;
}
function IsObject(value) {
  return value !== null && typeof value === 'object';
}
function IsArray(value) {
  return Array.isArray(value) && !ArrayBuffer.isView(value);
}
function IsUndefined(value) {
  return value === undefined;
}
function IsNull(value) {
  return value === null;
}
function IsBoolean(value) {
  return typeof value === 'boolean';
}
function IsNumber(value) {
  return typeof value === 'number';
}
function IsInteger(value) {
  return Number.isInteger(value);
}
function IsBigInt(value) {
  return typeof value === 'bigint';
}
function IsString(value) {
  return typeof value === 'string';
}
function IsFunction(value) {
  return typeof value === 'function';
}
function IsSymbol(value) {
  return typeof value === 'symbol';
}
function IsValueType(value) {
  return (
    IsBigInt(value) ||
    IsBoolean(value) ||
    IsNull(value) ||
    IsNumber(value) ||
    IsString(value) ||
    IsSymbol(value) ||
    IsUndefined(value)
  );
}
// node_modules/@sinclair/typebox/build/esm/system/policy.mjs
var TypeSystemPolicy;
(function (TypeSystemPolicy2) {
  TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
  TypeSystemPolicy2.AllowArrayObject = false;
  TypeSystemPolicy2.AllowNaN = false;
  TypeSystemPolicy2.AllowNullVoid = false;
  function IsExactOptionalProperty(value, key) {
    return TypeSystemPolicy2.ExactOptionalPropertyTypes
      ? key in value
      : value[key] !== undefined;
  }
  TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value) {
    const isObject = IsObject(value);
    return TypeSystemPolicy2.AllowArrayObject
      ? isObject
      : isObject && !IsArray(value);
  }
  TypeSystemPolicy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value) {
    return (
      IsObjectLike(value) &&
      !(value instanceof Date) &&
      !(value instanceof Uint8Array)
    );
  }
  TypeSystemPolicy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value) {
    return TypeSystemPolicy2.AllowNaN
      ? IsNumber(value)
      : Number.isFinite(value);
  }
  TypeSystemPolicy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value) {
    const isUndefined = IsUndefined(value);
    return TypeSystemPolicy2.AllowNullVoid
      ? isUndefined || value === null
      : isUndefined;
  }
  TypeSystemPolicy2.IsVoidLike = IsVoidLike;
})(TypeSystemPolicy || (TypeSystemPolicy = {}));
// node_modules/@sinclair/typebox/build/esm/type/registry/format.mjs
var exports_format = {};
__export(exports_format, {
  Set: () => Set2,
  Has: () => Has,
  Get: () => Get,
  Entries: () => Entries,
  Delete: () => Delete,
  Clear: () => Clear,
});
function Entries() {
  return new Map(map);
}
function Clear() {
  return map.clear();
}
function Delete(format) {
  return map.delete(format);
}
function Has(format) {
  return map.has(format);
}
function Set2(format, func) {
  map.set(format, func);
}
function Get(format) {
  return map.get(format);
}
var map = new Map();
// node_modules/@sinclair/typebox/build/esm/type/registry/type.mjs
var exports_type = {};
__export(exports_type, {
  Set: () => Set3,
  Has: () => Has2,
  Get: () => Get2,
  Entries: () => Entries2,
  Delete: () => Delete2,
  Clear: () => Clear2,
});
function Entries2() {
  return new Map(map2);
}
function Clear2() {
  return map2.clear();
}
function Delete2(kind) {
  return map2.delete(kind);
}
function Has2(kind) {
  return map2.has(kind);
}
function Set3(kind, func) {
  map2.set(kind, func);
}
function Get2(kind) {
  return map2.get(kind);
}
var map2 = new Map();
// node_modules/@sinclair/typebox/build/esm/type/symbols/symbols.mjs
var TransformKind = Symbol.for('TypeBox.Transform');
var ReadonlyKind = Symbol.for('TypeBox.Readonly');
var OptionalKind = Symbol.for('TypeBox.Optional');
var Hint = Symbol.for('TypeBox.Hint');
var Kind = Symbol.for('TypeBox.Kind');
// node_modules/@sinclair/typebox/build/esm/type/unsafe/unsafe.mjs
function Unsafe(options = {}) {
  return {
    ...options,
    [Kind]: options[Kind] ?? 'Unsafe',
  };
}
// node_modules/@sinclair/typebox/build/esm/type/error/error.mjs
class TypeBoxError extends Error {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/system/system.mjs
class TypeSystemDuplicateTypeKind extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate type kind '${kind}' detected`);
  }
}

class TypeSystemDuplicateFormat extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate string format '${kind}' detected`);
  }
}
var TypeSystem;
(function (TypeSystem2) {
  function Type(kind, check) {
    if (exports_type.Has(kind)) throw new TypeSystemDuplicateTypeKind(kind);
    exports_type.Set(kind, check);
    return (options = {}) => Unsafe({ ...options, [Kind]: kind });
  }
  TypeSystem2.Type = Type;
  function Format(format, check) {
    if (exports_format.Has(format)) throw new TypeSystemDuplicateFormat(format);
    exports_format.Set(format, check);
    return format;
  }
  TypeSystem2.Format = Format;
})(TypeSystem || (TypeSystem = {}));
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped-result.mjs
function MappedResult(properties) {
  return {
    [Kind]: 'MappedResult',
    properties,
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/value.mjs
var exports_value = {};
__export(exports_value, {
  IsUndefined: () => IsUndefined2,
  IsUint8Array: () => IsUint8Array2,
  IsSymbol: () => IsSymbol2,
  IsString: () => IsString2,
  IsRegExp: () => IsRegExp,
  IsObject: () => IsObject2,
  IsNumber: () => IsNumber2,
  IsNull: () => IsNull2,
  IsIterator: () => IsIterator2,
  IsFunction: () => IsFunction2,
  IsDate: () => IsDate2,
  IsBoolean: () => IsBoolean2,
  IsBigInt: () => IsBigInt2,
  IsAsyncIterator: () => IsAsyncIterator2,
  IsArray: () => IsArray2,
});
function IsAsyncIterator2(value) {
  return (
    IsObject2(value) &&
    !IsArray2(value) &&
    !IsUint8Array2(value) &&
    Symbol.asyncIterator in value
  );
}
function IsArray2(value) {
  return Array.isArray(value);
}
function IsBigInt2(value) {
  return typeof value === 'bigint';
}
function IsBoolean2(value) {
  return typeof value === 'boolean';
}
function IsDate2(value) {
  return value instanceof globalThis.Date;
}
function IsFunction2(value) {
  return typeof value === 'function';
}
function IsIterator2(value) {
  return (
    IsObject2(value) &&
    !IsArray2(value) &&
    !IsUint8Array2(value) &&
    Symbol.iterator in value
  );
}
function IsNull2(value) {
  return value === null;
}
function IsNumber2(value) {
  return typeof value === 'number';
}
function IsObject2(value) {
  return typeof value === 'object' && value !== null;
}
function IsRegExp(value) {
  return value instanceof globalThis.RegExp;
}
function IsString2(value) {
  return typeof value === 'string';
}
function IsSymbol2(value) {
  return typeof value === 'symbol';
}
function IsUint8Array2(value) {
  return value instanceof globalThis.Uint8Array;
}
function IsUndefined2(value) {
  return value === undefined;
}

// node_modules/@sinclair/typebox/build/esm/type/clone/value.mjs
function ArrayType(value) {
  return value.map((value2) => Visit(value2));
}
function DateType(value) {
  return new Date(value.getTime());
}
function Uint8ArrayType(value) {
  return new Uint8Array(value);
}
function RegExpType(value) {
  return new RegExp(value.source, value.flags);
}
function ObjectType(value) {
  const result = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    result[key] = Visit(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    result[key] = Visit(value[key]);
  }
  return result;
}
function Visit(value) {
  return IsArray2(value)
    ? ArrayType(value)
    : IsDate2(value)
      ? DateType(value)
      : IsUint8Array2(value)
        ? Uint8ArrayType(value)
        : IsRegExp(value)
          ? RegExpType(value)
          : IsObject2(value)
            ? ObjectType(value)
            : value;
}
function Clone(value) {
  return Visit(value);
}

// node_modules/@sinclair/typebox/build/esm/type/clone/type.mjs
function CloneRest(schemas) {
  return schemas.map((schema) => CloneType(schema));
}
function CloneType(schema, options = {}) {
  return { ...Clone(schema), ...options };
}

// node_modules/@sinclair/typebox/build/esm/type/discard/discard.mjs
function DiscardKey(value2, key) {
  const { [key]: _, ...rest } = value2;
  return rest;
}
function Discard(value2, keys) {
  return keys.reduce((acc, key) => DiscardKey(acc, key), value2);
}
// node_modules/@sinclair/typebox/build/esm/type/array/array.mjs
function Array2(schema, options = {}) {
  return {
    ...options,
    [Kind]: 'Array',
    type: 'array',
    items: CloneType(schema),
  };
}
// node_modules/@sinclair/typebox/build/esm/type/async-iterator/async-iterator.mjs
function AsyncIterator(items, options = {}) {
  return {
    ...options,
    [Kind]: 'AsyncIterator',
    type: 'AsyncIterator',
    items: CloneType(items),
  };
}
// node_modules/@sinclair/typebox/build/esm/type/constructor/constructor.mjs
function Constructor(parameters, returns, options) {
  return {
    ...options,
    [Kind]: 'Constructor',
    type: 'Constructor',
    parameters: CloneRest(parameters),
    returns: CloneType(returns),
  };
}
// node_modules/@sinclair/typebox/build/esm/type/function/function.mjs
function Function2(parameters, returns, options) {
  return {
    ...options,
    [Kind]: 'Function',
    type: 'Function',
    parameters: CloneRest(parameters),
    returns: CloneType(returns),
  };
}
// node_modules/@sinclair/typebox/build/esm/type/never/never.mjs
function Never(options = {}) {
  return {
    ...options,
    [Kind]: 'Never',
    not: {},
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/kind.mjs
function IsReadonly(value2) {
  return IsObject2(value2) && value2[ReadonlyKind] === 'Readonly';
}
function IsOptional(value2) {
  return IsObject2(value2) && value2[OptionalKind] === 'Optional';
}
function IsAny(value2) {
  return IsKindOf(value2, 'Any');
}
function IsArray3(value2) {
  return IsKindOf(value2, 'Array');
}
function IsAsyncIterator3(value2) {
  return IsKindOf(value2, 'AsyncIterator');
}
function IsBigInt3(value2) {
  return IsKindOf(value2, 'BigInt');
}
function IsBoolean3(value2) {
  return IsKindOf(value2, 'Boolean');
}
function IsConstructor(value2) {
  return IsKindOf(value2, 'Constructor');
}
function IsDate3(value2) {
  return IsKindOf(value2, 'Date');
}
function IsFunction3(value2) {
  return IsKindOf(value2, 'Function');
}
function IsInteger2(value2) {
  return IsKindOf(value2, 'Integer');
}
function IsIntersect(value2) {
  return IsKindOf(value2, 'Intersect');
}
function IsIterator3(value2) {
  return IsKindOf(value2, 'Iterator');
}
function IsKindOf(value2, kind) {
  return IsObject2(value2) && Kind in value2 && value2[Kind] === kind;
}
function IsLiteral(value2) {
  return IsKindOf(value2, 'Literal');
}
function IsMappedKey(value2) {
  return IsKindOf(value2, 'MappedKey');
}
function IsMappedResult(value2) {
  return IsKindOf(value2, 'MappedResult');
}
function IsNever(value2) {
  return IsKindOf(value2, 'Never');
}
function IsNot(value2) {
  return IsKindOf(value2, 'Not');
}
function IsNull3(value2) {
  return IsKindOf(value2, 'Null');
}
function IsNumber3(value2) {
  return IsKindOf(value2, 'Number');
}
function IsObject3(value2) {
  return IsKindOf(value2, 'Object');
}
function IsPromise2(value2) {
  return IsKindOf(value2, 'Promise');
}
function IsRecord(value2) {
  return IsKindOf(value2, 'Record');
}
function IsRef(value2) {
  return IsKindOf(value2, 'Ref');
}
function IsRegExp2(value2) {
  return IsKindOf(value2, 'RegExp');
}
function IsString3(value2) {
  return IsKindOf(value2, 'String');
}
function IsSymbol3(value2) {
  return IsKindOf(value2, 'Symbol');
}
function IsTemplateLiteral(value2) {
  return IsKindOf(value2, 'TemplateLiteral');
}
function IsThis(value2) {
  return IsKindOf(value2, 'This');
}
function IsTransform(value2) {
  return IsObject2(value2) && TransformKind in value2;
}
function IsTuple(value2) {
  return IsKindOf(value2, 'Tuple');
}
function IsUndefined3(value2) {
  return IsKindOf(value2, 'Undefined');
}
function IsUnion(value2) {
  return IsKindOf(value2, 'Union');
}
function IsUint8Array3(value2) {
  return IsKindOf(value2, 'Uint8Array');
}
function IsUnknown(value2) {
  return IsKindOf(value2, 'Unknown');
}
function IsUnsafe(value2) {
  return IsKindOf(value2, 'Unsafe');
}
function IsVoid(value2) {
  return IsKindOf(value2, 'Void');
}
function IsKind(value2) {
  return IsObject2(value2) && Kind in value2 && IsString2(value2[Kind]);
}
function IsSchema(value2) {
  return (
    IsAny(value2) ||
    IsArray3(value2) ||
    IsBoolean3(value2) ||
    IsBigInt3(value2) ||
    IsAsyncIterator3(value2) ||
    IsConstructor(value2) ||
    IsDate3(value2) ||
    IsFunction3(value2) ||
    IsInteger2(value2) ||
    IsIntersect(value2) ||
    IsIterator3(value2) ||
    IsLiteral(value2) ||
    IsMappedKey(value2) ||
    IsMappedResult(value2) ||
    IsNever(value2) ||
    IsNot(value2) ||
    IsNull3(value2) ||
    IsNumber3(value2) ||
    IsObject3(value2) ||
    IsPromise2(value2) ||
    IsRecord(value2) ||
    IsRef(value2) ||
    IsRegExp2(value2) ||
    IsString3(value2) ||
    IsSymbol3(value2) ||
    IsTemplateLiteral(value2) ||
    IsThis(value2) ||
    IsTuple(value2) ||
    IsUndefined3(value2) ||
    IsUnion(value2) ||
    IsUint8Array3(value2) ||
    IsUnknown(value2) ||
    IsUnsafe(value2) ||
    IsVoid(value2) ||
    IsKind(value2)
  );
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional.mjs
function RemoveOptional(schema) {
  return Discard(CloneType(schema), [OptionalKind]);
}
function AddOptional(schema) {
  return { ...CloneType(schema), [OptionalKind]: 'Optional' };
}
function OptionalWithFlag(schema, F) {
  return F === false ? RemoveOptional(schema) : AddOptional(schema);
}
function Optional(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema)
    ? OptionalFromMappedResult(schema, F)
    : OptionalWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional-from-mapped-result.mjs
function FromProperties(P, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Optional(P[K2], F);
  return Acc;
}
function FromMappedResult(R, F) {
  return FromProperties(R.properties, F);
}
function OptionalFromMappedResult(R, F) {
  const P = FromMappedResult(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-create.mjs
function IntersectCreate(T, options) {
  const allObjects = T.every((schema) => IsObject3(schema));
  const clonedUnevaluatedProperties = IsSchema(options.unevaluatedProperties)
    ? { unevaluatedProperties: CloneType(options.unevaluatedProperties) }
    : {};
  return options.unevaluatedProperties === false ||
    IsSchema(options.unevaluatedProperties) ||
    allObjects
    ? {
        ...options,
        ...clonedUnevaluatedProperties,
        [Kind]: 'Intersect',
        type: 'object',
        allOf: CloneRest(T),
      }
    : {
        ...options,
        ...clonedUnevaluatedProperties,
        [Kind]: 'Intersect',
        allOf: CloneRest(T),
      };
}

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-evaluated.mjs
function IsIntersectOptional(T) {
  return T.every((L) => IsOptional(L));
}
function RemoveOptionalFromType(T) {
  return Discard(T, [OptionalKind]);
}
function RemoveOptionalFromRest(T) {
  return T.map((L) => (IsOptional(L) ? RemoveOptionalFromType(L) : L));
}
function ResolveIntersect(T, options) {
  return IsIntersectOptional(T)
    ? Optional(IntersectCreate(RemoveOptionalFromRest(T), options))
    : IntersectCreate(RemoveOptionalFromRest(T), options);
}
function IntersectEvaluated(T, options = {}) {
  if (T.length === 0) return Never(options);
  if (T.length === 1) return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error('Cannot intersect transform types');
  return ResolveIntersect(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect.mjs
function Intersect(T, options = {}) {
  if (T.length === 0) return Never(options);
  if (T.length === 1) return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error('Cannot intersect transform types');
  return IntersectCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union-create.mjs
function UnionCreate(T, options) {
  return { ...options, [Kind]: 'Union', anyOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/union/union-evaluated.mjs
function IsUnionOptional(T) {
  return T.some((L) => IsOptional(L));
}
function RemoveOptionalFromRest2(T) {
  return T.map((L) => (IsOptional(L) ? RemoveOptionalFromType2(L) : L));
}
function RemoveOptionalFromType2(T) {
  return Discard(T, [OptionalKind]);
}
function ResolveUnion(T, options) {
  return IsUnionOptional(T)
    ? Optional(UnionCreate(RemoveOptionalFromRest2(T), options))
    : UnionCreate(RemoveOptionalFromRest2(T), options);
}
function UnionEvaluated(T, options = {}) {
  return T.length === 0
    ? Never(options)
    : T.length === 1
      ? CloneType(T[0], options)
      : ResolveUnion(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union.mjs
function Union(T, options = {}) {
  return T.length === 0
    ? Never(options)
    : T.length === 1
      ? CloneType(T[0], options)
      : UnionCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/parse.mjs
function Unescape(pattern) {
  return pattern
    .replace(/\\\$/g, '$')
    .replace(/\\\*/g, '*')
    .replace(/\\\^/g, '^')
    .replace(/\\\|/g, '|')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')');
}
function IsNonEscaped(pattern, index, char) {
  return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
}
function IsOpenParen(pattern, index) {
  return IsNonEscaped(pattern, index, '(');
}
function IsCloseParen(pattern, index) {
  return IsNonEscaped(pattern, index, ')');
}
function IsSeparator(pattern, index) {
  return IsNonEscaped(pattern, index, '|');
}
function IsGroup(pattern) {
  if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
    return false;
  let count = 0;
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) count += 1;
    if (IsCloseParen(pattern, index)) count -= 1;
    if (count === 0 && index !== pattern.length - 1) return false;
  }
  return true;
}
function InGroup(pattern) {
  return pattern.slice(1, pattern.length - 1);
}
function IsPrecedenceOr(pattern) {
  let count = 0;
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) count += 1;
    if (IsCloseParen(pattern, index)) count -= 1;
    if (IsSeparator(pattern, index) && count === 0) return true;
  }
  return false;
}
function IsPrecedenceAnd(pattern) {
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) return true;
  }
  return false;
}
function Or(pattern) {
  let [count, start] = [0, 0];
  const expressions = [];
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) count += 1;
    if (IsCloseParen(pattern, index)) count -= 1;
    if (IsSeparator(pattern, index) && count === 0) {
      const range2 = pattern.slice(start, index);
      if (range2.length > 0) expressions.push(TemplateLiteralParse(range2));
      start = index + 1;
    }
  }
  const range = pattern.slice(start);
  if (range.length > 0) expressions.push(TemplateLiteralParse(range));
  if (expressions.length === 0) return { type: 'const', const: '' };
  if (expressions.length === 1) return expressions[0];
  return { type: 'or', expr: expressions };
}
function And(pattern) {
  function Group(value2, index) {
    if (!IsOpenParen(value2, index))
      throw new TemplateLiteralParserError(
        `TemplateLiteralParser: Index must point to open parens`
      );
    let count = 0;
    for (let scan = index; scan < value2.length; scan++) {
      if (IsOpenParen(value2, scan)) count += 1;
      if (IsCloseParen(value2, scan)) count -= 1;
      if (count === 0) return [index, scan];
    }
    throw new TemplateLiteralParserError(
      `TemplateLiteralParser: Unclosed group parens in expression`
    );
  }
  function Range(pattern2, index) {
    for (let scan = index; scan < pattern2.length; scan++) {
      if (IsOpenParen(pattern2, scan)) return [index, scan];
    }
    return [index, pattern2.length];
  }
  const expressions = [];
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) {
      const [start, end] = Group(pattern, index);
      const range = pattern.slice(start, end + 1);
      expressions.push(TemplateLiteralParse(range));
      index = end;
    } else {
      const [start, end] = Range(pattern, index);
      const range = pattern.slice(start, end);
      if (range.length > 0) expressions.push(TemplateLiteralParse(range));
      index = end - 1;
    }
  }
  return expressions.length === 0
    ? { type: 'const', const: '' }
    : expressions.length === 1
      ? expressions[0]
      : { type: 'and', expr: expressions };
}
function TemplateLiteralParse(pattern) {
  return IsGroup(pattern)
    ? TemplateLiteralParse(InGroup(pattern))
    : IsPrecedenceOr(pattern)
      ? Or(pattern)
      : IsPrecedenceAnd(pattern)
        ? And(pattern)
        : { type: 'const', const: Unescape(pattern) };
}
function TemplateLiteralParseExact(pattern) {
  return TemplateLiteralParse(pattern.slice(1, pattern.length - 1));
}

class TemplateLiteralParserError extends TypeBoxError {}

// node_modules/@sinclair/typebox/build/esm/type/template-literal/finite.mjs
function IsNumberExpression(expression) {
  return (
    expression.type === 'or' &&
    expression.expr.length === 2 &&
    expression.expr[0].type === 'const' &&
    expression.expr[0].const === '0' &&
    expression.expr[1].type === 'const' &&
    expression.expr[1].const === '[1-9][0-9]*'
  );
}
function IsBooleanExpression(expression) {
  return (
    expression.type === 'or' &&
    expression.expr.length === 2 &&
    expression.expr[0].type === 'const' &&
    expression.expr[0].const === 'true' &&
    expression.expr[1].type === 'const' &&
    expression.expr[1].const === 'false'
  );
}
function IsStringExpression(expression) {
  return expression.type === 'const' && expression.const === '.*';
}
function IsTemplateLiteralExpressionFinite(expression) {
  return IsNumberExpression(expression) || IsStringExpression(expression)
    ? false
    : IsBooleanExpression(expression)
      ? true
      : expression.type === 'and'
        ? expression.expr.every((expr) =>
            IsTemplateLiteralExpressionFinite(expr)
          )
        : expression.type === 'or'
          ? expression.expr.every((expr) =>
              IsTemplateLiteralExpressionFinite(expr)
            )
          : expression.type === 'const'
            ? true
            : (() => {
                throw new TemplateLiteralFiniteError(`Unknown expression type`);
              })();
}
function IsTemplateLiteralFinite(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression);
}

class TemplateLiteralFiniteError extends TypeBoxError {}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/generate.mjs
function* GenerateReduce(buffer) {
  if (buffer.length === 1) return yield* buffer[0];
  for (const left of buffer[0]) {
    for (const right of GenerateReduce(buffer.slice(1))) {
      yield `${left}${right}`;
    }
  }
}
function* GenerateAnd(expression) {
  return yield* GenerateReduce(
    expression.expr.map((expr) => [...TemplateLiteralExpressionGenerate(expr)])
  );
}
function* GenerateOr(expression) {
  for (const expr of expression.expr)
    yield* TemplateLiteralExpressionGenerate(expr);
}
function* GenerateConst(expression) {
  return yield expression.const;
}
function* TemplateLiteralExpressionGenerate(expression) {
  return expression.type === 'and'
    ? yield* GenerateAnd(expression)
    : expression.type === 'or'
      ? yield* GenerateOr(expression)
      : expression.type === 'const'
        ? yield* GenerateConst(expression)
        : (() => {
            throw new TemplateLiteralGenerateError('Unknown expression');
          })();
}
function TemplateLiteralGenerate(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression)
    ? [...TemplateLiteralExpressionGenerate(expression)]
    : [];
}

class TemplateLiteralGenerateError extends TypeBoxError {}
// node_modules/@sinclair/typebox/build/esm/type/literal/literal.mjs
function Literal(value2, options = {}) {
  return {
    ...options,
    [Kind]: 'Literal',
    const: value2,
    type: typeof value2,
  };
}
// node_modules/@sinclair/typebox/build/esm/type/boolean/boolean.mjs
function Boolean(options = {}) {
  return {
    ...options,
    [Kind]: 'Boolean',
    type: 'boolean',
  };
}
// node_modules/@sinclair/typebox/build/esm/type/bigint/bigint.mjs
function BigInt2(options = {}) {
  return {
    ...options,
    [Kind]: 'BigInt',
    type: 'bigint',
  };
}
// node_modules/@sinclair/typebox/build/esm/type/number/number.mjs
function Number2(options = {}) {
  return {
    ...options,
    [Kind]: 'Number',
    type: 'number',
  };
}
// node_modules/@sinclair/typebox/build/esm/type/string/string.mjs
function String2(options = {}) {
  return { ...options, [Kind]: 'String', type: 'string' };
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/syntax.mjs
function* FromUnion(syntax) {
  const trim = syntax.trim().replace(/"|'/g, '');
  return trim === 'boolean'
    ? yield Boolean()
    : trim === 'number'
      ? yield Number2()
      : trim === 'bigint'
        ? yield BigInt2()
        : trim === 'string'
          ? yield String2()
          : yield (() => {
              const literals = trim
                .split('|')
                .map((literal3) => Literal(literal3.trim()));
              return literals.length === 0
                ? Never()
                : literals.length === 1
                  ? literals[0]
                  : UnionEvaluated(literals);
            })();
}
function* FromTerminal(syntax) {
  if (syntax[1] !== '{') {
    const L = Literal('$');
    const R = FromSyntax(syntax.slice(1));
    return yield* [L, ...R];
  }
  for (let i = 2; i < syntax.length; i++) {
    if (syntax[i] === '}') {
      const L = FromUnion(syntax.slice(2, i));
      const R = FromSyntax(syntax.slice(i + 1));
      return yield* [...L, ...R];
    }
  }
  yield Literal(syntax);
}
function* FromSyntax(syntax) {
  for (let i = 0; i < syntax.length; i++) {
    if (syntax[i] === '$') {
      const L = Literal(syntax.slice(0, i));
      const R = FromTerminal(syntax.slice(i));
      return yield* [L, ...R];
    }
  }
  yield Literal(syntax);
}
function TemplateLiteralSyntax(syntax) {
  return [...FromSyntax(syntax)];
}
// node_modules/@sinclair/typebox/build/esm/type/patterns/patterns.mjs
var PatternBoolean = '(true|false)';
var PatternNumber = '(0|[1-9][0-9]*)';
var PatternString = '(.*)';
var PatternBooleanExact = `^${PatternBoolean}\$`;
var PatternNumberExact = `^${PatternNumber}\$`;
var PatternStringExact = `^${PatternString}\$`;
// node_modules/@sinclair/typebox/build/esm/type/template-literal/pattern.mjs
function Escape(value2) {
  return value2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function Visit2(schema, acc) {
  return IsTemplateLiteral(schema)
    ? schema.pattern.slice(1, schema.pattern.length - 1)
    : IsUnion(schema)
      ? `(${schema.anyOf.map((schema2) => Visit2(schema2, acc)).join('|')})`
      : IsNumber3(schema)
        ? `${acc}${PatternNumber}`
        : IsInteger2(schema)
          ? `${acc}${PatternNumber}`
          : IsBigInt3(schema)
            ? `${acc}${PatternNumber}`
            : IsString3(schema)
              ? `${acc}${PatternString}`
              : IsLiteral(schema)
                ? `${acc}${Escape(schema.const.toString())}`
                : IsBoolean3(schema)
                  ? `${acc}${PatternBoolean}`
                  : (() => {
                      throw new TemplateLiteralPatternError(
                        `Unexpected Kind '${schema[Kind]}'`
                      );
                    })();
}
function TemplateLiteralPattern(kinds) {
  return `^${kinds.map((schema) => Visit2(schema, '')).join('')}$`;
}

class TemplateLiteralPatternError extends TypeBoxError {}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/union.mjs
function TemplateLiteralToUnion(schema) {
  const R = TemplateLiteralGenerate(schema);
  const L = R.map((S) => Literal(S));
  return UnionEvaluated(L);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/template-literal.mjs
function TemplateLiteral(unresolved, options = {}) {
  const pattern2 = IsString2(unresolved)
    ? TemplateLiteralPattern(TemplateLiteralSyntax(unresolved))
    : TemplateLiteralPattern(unresolved);
  return {
    ...options,
    [Kind]: 'TemplateLiteral',
    type: 'string',
    pattern: pattern2,
  };
}
// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-property-keys.mjs
function FromTemplateLiteral(T) {
  const R = TemplateLiteralGenerate(T);
  return R.map((S) => S.toString());
}
function FromUnion2(T) {
  const Acc = [];
  for (const L of T) Acc.push(...IndexPropertyKeys(L));
  return Acc;
}
function FromLiteral(T) {
  return [T.toString()];
}
function IndexPropertyKeys(T) {
  return [
    ...new Set(
      IsTemplateLiteral(T)
        ? FromTemplateLiteral(T)
        : IsUnion(T)
          ? FromUnion2(T.anyOf)
          : IsLiteral(T)
            ? FromLiteral(T.const)
            : IsNumber3(T)
              ? ['[number]']
              : IsInteger2(T)
                ? ['[number]']
                : []
    ),
  ];
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-result.mjs
function FromProperties2(T, P, options) {
  const Acc = {};
  for (const K2 of Object.getOwnPropertyNames(P)) {
    Acc[K2] = Index(T, IndexPropertyKeys(P[K2]), options);
  }
  return Acc;
}
function FromMappedResult2(T, R, options) {
  return FromProperties2(T, R.properties, options);
}
function IndexFromMappedResult(T, R, options) {
  const P = FromMappedResult2(T, R, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed.mjs
function FromRest(T, K) {
  return T.map((L) => IndexFromPropertyKey(L, K));
}
function FromIntersectRest(T) {
  return T.filter((L) => !IsNever(L));
}
function FromIntersect(T, K) {
  return IntersectEvaluated(FromIntersectRest(FromRest(T, K)));
}
function FromUnionRest(T) {
  return T.some((L) => IsNever(L)) ? [] : T;
}
function FromUnion3(T, K) {
  return UnionEvaluated(FromUnionRest(FromRest(T, K)));
}
function FromTuple(T, K) {
  return K in T ? T[K] : K === '[number]' ? UnionEvaluated(T) : Never();
}
function FromArray(T, K) {
  return K === '[number]' ? T : Never();
}
function FromProperty(T, K) {
  return K in T ? T[K] : Never();
}
function IndexFromPropertyKey(T, K) {
  return IsIntersect(T)
    ? FromIntersect(T.allOf, K)
    : IsUnion(T)
      ? FromUnion3(T.anyOf, K)
      : IsTuple(T)
        ? FromTuple(T.items ?? [], K)
        : IsArray3(T)
          ? FromArray(T.items, K)
          : IsObject3(T)
            ? FromProperty(T.properties, K)
            : Never();
}
function IndexFromPropertyKeys(T, K) {
  return K.map((L) => IndexFromPropertyKey(T, L));
}
function FromSchema(T, K) {
  return UnionEvaluated(IndexFromPropertyKeys(T, K));
}
function Index(T, K, options = {}) {
  return IsMappedResult(K)
    ? CloneType(IndexFromMappedResult(T, K, options))
    : IsMappedKey(K)
      ? CloneType(IndexFromMappedKey(T, K, options))
      : IsSchema(K)
        ? CloneType(FromSchema(T, IndexPropertyKeys(K)), options)
        : CloneType(FromSchema(T, K), options);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-key.mjs
function MappedIndexPropertyKey(T, K, options) {
  return { [K]: Index(T, [K], options) };
}
function MappedIndexPropertyKeys(T, K, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIndexPropertyKey(T, L, options) };
  }, {});
}
function MappedIndexProperties(T, K, options) {
  return MappedIndexPropertyKeys(T, K.keys, options);
}
function IndexFromMappedKey(T, K, options) {
  const P = MappedIndexProperties(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/iterator/iterator.mjs
function Iterator(items, options = {}) {
  return {
    ...options,
    [Kind]: 'Iterator',
    type: 'Iterator',
    items: CloneType(items),
  };
}
// node_modules/@sinclair/typebox/build/esm/type/object/object.mjs
function _Object(properties, options = {}) {
  const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
  const optionalKeys = propertyKeys.filter((key) =>
    IsOptional(properties[key])
  );
  const requiredKeys = propertyKeys.filter(
    (name) => !optionalKeys.includes(name)
  );
  const clonedAdditionalProperties = IsSchema(options.additionalProperties)
    ? { additionalProperties: CloneType(options.additionalProperties) }
    : {};
  const clonedProperties = {};
  for (const key of propertyKeys)
    clonedProperties[key] = CloneType(properties[key]);
  return requiredKeys.length > 0
    ? {
        ...options,
        ...clonedAdditionalProperties,
        [Kind]: 'Object',
        type: 'object',
        properties: clonedProperties,
        required: requiredKeys,
      }
    : {
        ...options,
        ...clonedAdditionalProperties,
        [Kind]: 'Object',
        type: 'object',
        properties: clonedProperties,
      };
}
var Object2 = _Object;
// node_modules/@sinclair/typebox/build/esm/type/promise/promise.mjs
function Promise2(item, options = {}) {
  return {
    ...options,
    [Kind]: 'Promise',
    type: 'Promise',
    item: CloneType(item),
  };
}
// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly.mjs
function RemoveReadonly(schema) {
  return Discard(CloneType(schema), [ReadonlyKind]);
}
function AddReadonly(schema) {
  return { ...CloneType(schema), [ReadonlyKind]: 'Readonly' };
}
function ReadonlyWithFlag(schema, F) {
  return F === false ? RemoveReadonly(schema) : AddReadonly(schema);
}
function Readonly(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema)
    ? ReadonlyFromMappedResult(schema, F)
    : ReadonlyWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly-from-mapped-result.mjs
function FromProperties3(K, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Readonly(K[K2], F);
  return Acc;
}
function FromMappedResult3(R, F) {
  return FromProperties3(R.properties, F);
}
function ReadonlyFromMappedResult(R, F) {
  const P = FromMappedResult3(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/tuple/tuple.mjs
function Tuple(items, options = {}) {
  const [additionalItems, minItems, maxItems] = [
    false,
    items.length,
    items.length,
  ];
  return items.length > 0
    ? {
        ...options,
        [Kind]: 'Tuple',
        type: 'array',
        items: CloneRest(items),
        additionalItems,
        minItems,
        maxItems,
      }
    : { ...options, [Kind]: 'Tuple', type: 'array', minItems, maxItems };
}
// node_modules/@sinclair/typebox/build/esm/type/sets/set.mjs
function SetIncludes(T, S) {
  return T.includes(S);
}
function SetDistinct(T) {
  return [...new Set(T)];
}
function SetIntersect(T, S) {
  return T.filter((L) => S.includes(L));
}
function SetIntersectManyResolve(T, Init) {
  return T.reduce((Acc, L) => {
    return SetIntersect(Acc, L);
  }, Init);
}
function SetIntersectMany(T) {
  return T.length === 1
    ? T[0]
    : T.length > 1
      ? SetIntersectManyResolve(T.slice(1), T[0])
      : [];
}
function SetUnionMany(T) {
  const Acc = [];
  for (const L of T) Acc.push(...L);
  return Acc;
}
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped.mjs
function FromMappedResult4(K, P) {
  return K in P ? FromSchemaType(K, P[K]) : MappedResult(P);
}
function MappedKeyToKnownMappedResultProperties(K) {
  return { [K]: Literal(K) };
}
function MappedKeyToUnknownMappedResultProperties(P) {
  const Acc = {};
  for (const L of P) Acc[L] = Literal(L);
  return Acc;
}
function MappedKeyToMappedResultProperties(K, P) {
  return SetIncludes(P, K)
    ? MappedKeyToKnownMappedResultProperties(K)
    : MappedKeyToUnknownMappedResultProperties(P);
}
function FromMappedKey(K, P) {
  const R = MappedKeyToMappedResultProperties(K, P);
  return FromMappedResult4(K, R);
}
function FromRest2(K, T) {
  return T.map((L) => FromSchemaType(K, L));
}
function FromProperties4(K, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(T))
    Acc[K2] = FromSchemaType(K, T[K2]);
  return Acc;
}
function FromSchemaType(K, T) {
  return IsOptional(T)
    ? Optional(FromSchemaType(K, Discard(T, [OptionalKind])))
    : IsReadonly(T)
      ? Readonly(FromSchemaType(K, Discard(T, [ReadonlyKind])))
      : IsMappedResult(T)
        ? FromMappedResult4(K, T.properties)
        : IsMappedKey(T)
          ? FromMappedKey(K, T.keys)
          : IsConstructor(T)
            ? Constructor(
                FromRest2(K, T.parameters),
                FromSchemaType(K, T.returns)
              )
            : IsFunction3(T)
              ? Function2(
                  FromRest2(K, T.parameters),
                  FromSchemaType(K, T.returns)
                )
              : IsAsyncIterator3(T)
                ? AsyncIterator(FromSchemaType(K, T.items))
                : IsIterator3(T)
                  ? Iterator(FromSchemaType(K, T.items))
                  : IsIntersect(T)
                    ? Intersect(FromRest2(K, T.allOf))
                    : IsUnion(T)
                      ? Union(FromRest2(K, T.anyOf))
                      : IsTuple(T)
                        ? Tuple(FromRest2(K, T.items ?? []))
                        : IsObject3(T)
                          ? Object2(FromProperties4(K, T.properties))
                          : IsArray3(T)
                            ? Array2(FromSchemaType(K, T.items))
                            : IsPromise2(T)
                              ? Promise2(FromSchemaType(K, T.item))
                              : T;
}
function MappedFunctionReturnType(K, T) {
  const Acc = {};
  for (const L of K) Acc[L] = FromSchemaType(L, T);
  return Acc;
}
function Mapped(key, map3, options = {}) {
  const K = IsSchema(key) ? IndexPropertyKeys(key) : key;
  const RT = map3({ [Kind]: 'MappedKey', keys: K });
  const R = MappedFunctionReturnType(K, RT);
  return CloneType(Object2(R), options);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-keys.mjs
function FromRest3(T) {
  const Acc = [];
  for (const L of T) Acc.push(KeyOfPropertyKeys(L));
  return Acc;
}
function FromIntersect2(T) {
  const C = FromRest3(T);
  const R = SetUnionMany(C);
  return R;
}
function FromUnion4(T) {
  const C = FromRest3(T);
  const R = SetIntersectMany(C);
  return R;
}
function FromTuple2(T) {
  return T.map((_, I) => I.toString());
}
function FromArray2(_) {
  return ['[number]'];
}
function FromProperties5(T) {
  return globalThis.Object.getOwnPropertyNames(T);
}
function FromPatternProperties(patternProperties) {
  if (!includePatternProperties) return [];
  const patternPropertyKeys =
    globalThis.Object.getOwnPropertyNames(patternProperties);
  return patternPropertyKeys.map((key) => {
    return key[0] === '^' && key[key.length - 1] === '$'
      ? key.slice(1, key.length - 1)
      : key;
  });
}
function KeyOfPropertyKeys(T) {
  return IsIntersect(T)
    ? FromIntersect2(T.allOf)
    : IsUnion(T)
      ? FromUnion4(T.anyOf)
      : IsTuple(T)
        ? FromTuple2(T.items ?? [])
        : IsArray3(T)
          ? FromArray2(T.items)
          : IsObject3(T)
            ? FromProperties5(T.properties)
            : IsRecord(T)
              ? FromPatternProperties(T.patternProperties)
              : [];
}
function KeyOfPattern(schema) {
  includePatternProperties = true;
  const keys = KeyOfPropertyKeys(schema);
  includePatternProperties = false;
  const pattern3 = keys.map((key) => `(${key})`);
  return `^(${pattern3.join('|')})\$`;
}
var includePatternProperties = false;

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof.mjs
function KeyOfPropertyKeysToRest(T) {
  return T.map((L) => (L === '[number]' ? Number2() : Literal(L)));
}
function KeyOf(T, options = {}) {
  if (IsMappedResult(T)) {
    return KeyOfFromMappedResult(T, options);
  } else {
    const K = KeyOfPropertyKeys(T);
    const S = KeyOfPropertyKeysToRest(K);
    const U = UnionEvaluated(S);
    return CloneType(U, options);
  }
}

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-from-mapped-result.mjs
function FromProperties6(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = KeyOf(K[K2], options);
  return Acc;
}
function FromMappedResult5(R, options) {
  return FromProperties6(R.properties, options);
}
function KeyOfFromMappedResult(R, options) {
  const P = FromMappedResult5(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-entries.mjs
function KeyOfPropertyEntries(schema) {
  const keys = KeyOfPropertyKeys(schema);
  const schemas = IndexFromPropertyKeys(schema, keys);
  return keys.map((_, index) => [keys[index], schemas[index]]);
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-undefined.mjs
function Intersect2(schema) {
  return schema.allOf.every((schema2) => ExtendsUndefinedCheck(schema2));
}
function Union2(schema) {
  return schema.anyOf.some((schema2) => ExtendsUndefinedCheck(schema2));
}
function Not(schema) {
  return !ExtendsUndefinedCheck(schema.not);
}
function ExtendsUndefinedCheck(schema) {
  return schema[Kind] === 'Intersect'
    ? Intersect2(schema)
    : schema[Kind] === 'Union'
      ? Union2(schema)
      : schema[Kind] === 'Not'
        ? Not(schema)
        : schema[Kind] === 'Undefined'
          ? true
          : false;
}

// node_modules/@sinclair/typebox/build/esm/errors/function.mjs
function DefaultErrorFunction(error7) {
  switch (error7.errorType) {
    case ValueErrorType.ArrayContains:
      return 'Expected array to contain at least one matching value';
    case ValueErrorType.ArrayMaxContains:
      return `Expected array to contain no more than ${error7.schema.maxContains} matching values`;
    case ValueErrorType.ArrayMinContains:
      return `Expected array to contain at least ${error7.schema.minContains} matching values`;
    case ValueErrorType.ArrayMaxItems:
      return `Expected array length to be less or equal to ${error7.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `Expected array length to be greater or equal to ${error7.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return 'Expected array elements to be unique';
    case ValueErrorType.Array:
      return 'Expected array';
    case ValueErrorType.AsyncIterator:
      return 'Expected AsyncIterator';
    case ValueErrorType.BigIntExclusiveMaximum:
      return `Expected bigint to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `Expected bigint to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `Expected bigint to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `Expected bigint to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `Expected bigint to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.BigInt:
      return 'Expected bigint';
    case ValueErrorType.Boolean:
      return 'Expected boolean';
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `Expected Date timestamp to be greater than ${error7.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `Expected Date timestamp to be less than ${error7.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `Expected Date timestamp to be greater or equal to ${error7.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `Expected Date timestamp to be less or equal to ${error7.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `Expected Date timestamp to be a multiple of ${error7.schema.multipleOfTimestamp}`;
    case ValueErrorType.Date:
      return 'Expected Date';
    case ValueErrorType.Function:
      return 'Expected function';
    case ValueErrorType.IntegerExclusiveMaximum:
      return `Expected integer to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `Expected integer to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `Expected integer to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `Expected integer to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `Expected integer to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.Integer:
      return 'Expected integer';
    case ValueErrorType.IntersectUnevaluatedProperties:
      return 'Unexpected property';
    case ValueErrorType.Intersect:
      return 'Expected all values to match';
    case ValueErrorType.Iterator:
      return 'Expected Iterator';
    case ValueErrorType.Literal:
      return `Expected ${typeof error7.schema.const === 'string' ? `'${error7.schema.const}'` : error7.schema.const}`;
    case ValueErrorType.Never:
      return 'Never';
    case ValueErrorType.Not:
      return 'Value should not match';
    case ValueErrorType.Null:
      return 'Expected null';
    case ValueErrorType.NumberExclusiveMaximum:
      return `Expected number to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `Expected number to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `Expected number to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `Expected number to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `Expected number to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.Number:
      return 'Expected number';
    case ValueErrorType.Object:
      return 'Expected object';
    case ValueErrorType.ObjectAdditionalProperties:
      return 'Unexpected property';
    case ValueErrorType.ObjectMaxProperties:
      return `Expected object to have no more than ${error7.schema.maxProperties} properties`;
    case ValueErrorType.ObjectMinProperties:
      return `Expected object to have at least ${error7.schema.minProperties} properties`;
    case ValueErrorType.ObjectRequiredProperty:
      return 'Required property';
    case ValueErrorType.Promise:
      return 'Expected Promise';
    case ValueErrorType.RegExp:
      return 'Expected string to match regular expression';
    case ValueErrorType.StringFormatUnknown:
      return `Unknown format '${error7.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `Expected string to match '${error7.schema.format}' format`;
    case ValueErrorType.StringMaxLength:
      return `Expected string length less or equal to ${error7.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `Expected string length greater or equal to ${error7.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `Expected string to match '${error7.schema.pattern}'`;
    case ValueErrorType.String:
      return 'Expected string';
    case ValueErrorType.Symbol:
      return 'Expected symbol';
    case ValueErrorType.TupleLength:
      return `Expected tuple to have ${error7.schema.maxItems || 0} elements`;
    case ValueErrorType.Tuple:
      return 'Expected tuple';
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `Expected byte length less or equal to ${error7.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `Expected byte length greater or equal to ${error7.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return 'Expected Uint8Array';
    case ValueErrorType.Undefined:
      return 'Expected undefined';
    case ValueErrorType.Union:
      return 'Expected union value';
    case ValueErrorType.Void:
      return 'Expected void';
    case ValueErrorType.Kind:
      return `Expected kind '${error7.schema[Kind]}'`;
    default:
      return 'Unknown error type';
  }
}
function GetErrorFunction() {
  return errorFunction;
}
var errorFunction = DefaultErrorFunction;

// node_modules/@sinclair/typebox/build/esm/value/deref/deref.mjs
function Resolve(schema, references) {
  const target = references.find((target2) => target2.$id === schema.$ref);
  if (target === undefined) throw new TypeDereferenceError(schema);
  return Deref(target, references);
}
function Deref(schema, references) {
  return schema[Kind] === 'This' || schema[Kind] === 'Ref'
    ? Resolve(schema, references)
    : schema;
}

class TypeDereferenceError extends TypeBoxError {
  constructor(schema) {
    super(`Unable to dereference schema with \$id '${schema.$id}'`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/hash/hash.mjs
function* NumberToBytes(value3) {
  const byteCount =
    value3 === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value3) + 1) / 8);
  for (let i = 0; i < byteCount; i++) {
    yield (value3 >> (8 * (byteCount - 1 - i))) & 255;
  }
}
function ArrayType2(value3) {
  FNV1A64(ByteMarker.Array);
  for (const item of value3) {
    Visit3(item);
  }
}
function BooleanType(value3) {
  FNV1A64(ByteMarker.Boolean);
  FNV1A64(value3 ? 1 : 0);
}
function BigIntType(value3) {
  FNV1A64(ByteMarker.BigInt);
  F64In.setBigInt64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
}
function DateType2(value3) {
  FNV1A64(ByteMarker.Date);
  Visit3(value3.getTime());
}
function NullType(value3) {
  FNV1A64(ByteMarker.Null);
}
function NumberType(value3) {
  FNV1A64(ByteMarker.Number);
  F64In.setFloat64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
}
function ObjectType2(value3) {
  FNV1A64(ByteMarker.Object);
  for (const key of globalThis.Object.getOwnPropertyNames(value3).sort()) {
    Visit3(key);
    Visit3(value3[key]);
  }
}
function StringType(value3) {
  FNV1A64(ByteMarker.String);
  for (let i = 0; i < value3.length; i++) {
    for (const byte of NumberToBytes(value3.charCodeAt(i))) {
      FNV1A64(byte);
    }
  }
}
function SymbolType(value3) {
  FNV1A64(ByteMarker.Symbol);
  Visit3(value3.description);
}
function Uint8ArrayType2(value3) {
  FNV1A64(ByteMarker.Uint8Array);
  for (let i = 0; i < value3.length; i++) {
    FNV1A64(value3[i]);
  }
}
function UndefinedType(value3) {
  return FNV1A64(ByteMarker.Undefined);
}
function Visit3(value3) {
  if (IsArray(value3)) return ArrayType2(value3);
  if (IsBoolean(value3)) return BooleanType(value3);
  if (IsBigInt(value3)) return BigIntType(value3);
  if (IsDate(value3)) return DateType2(value3);
  if (IsNull(value3)) return NullType(value3);
  if (IsNumber(value3)) return NumberType(value3);
  if (IsStandardObject(value3)) return ObjectType2(value3);
  if (IsString(value3)) return StringType(value3);
  if (IsSymbol(value3)) return SymbolType(value3);
  if (IsUint8Array(value3)) return Uint8ArrayType2(value3);
  if (IsUndefined(value3)) return UndefinedType(value3);
  throw new ValueHashError(value3);
}
function FNV1A64(byte) {
  Accumulator = Accumulator ^ Bytes[byte];
  Accumulator = (Accumulator * Prime) % Size;
}
function Hash(value3) {
  Accumulator = BigInt('14695981039346656037');
  Visit3(value3);
  return Accumulator;
}

class ValueHashError extends TypeBoxError {
  constructor(value3) {
    super(`Unable to hash value`);
    this.value = value3;
  }
}
var ByteMarker;
(function (ByteMarker2) {
  ByteMarker2[(ByteMarker2['Undefined'] = 0)] = 'Undefined';
  ByteMarker2[(ByteMarker2['Null'] = 1)] = 'Null';
  ByteMarker2[(ByteMarker2['Boolean'] = 2)] = 'Boolean';
  ByteMarker2[(ByteMarker2['Number'] = 3)] = 'Number';
  ByteMarker2[(ByteMarker2['String'] = 4)] = 'String';
  ByteMarker2[(ByteMarker2['Object'] = 5)] = 'Object';
  ByteMarker2[(ByteMarker2['Array'] = 6)] = 'Array';
  ByteMarker2[(ByteMarker2['Date'] = 7)] = 'Date';
  ByteMarker2[(ByteMarker2['Uint8Array'] = 8)] = 'Uint8Array';
  ByteMarker2[(ByteMarker2['Symbol'] = 9)] = 'Symbol';
  ByteMarker2[(ByteMarker2['BigInt'] = 10)] = 'BigInt';
})(ByteMarker || (ByteMarker = {}));
var Accumulator = BigInt('14695981039346656037');
var [Prime, Size] = [BigInt('1099511628211'), BigInt('2') ** BigInt('64')];
var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
var F64 = new Float64Array(1);
var F64In = new DataView(F64.buffer);
var F64Out = new Uint8Array(F64.buffer);
// node_modules/@sinclair/typebox/build/esm/errors/errors.mjs
function EscapeKey(key) {
  return key.replace(/~/g, '~0').replace(/\//g, '~1');
}
function IsDefined(value3) {
  return value3 !== undefined;
}
function Create(errorType, schema, path, value3) {
  return {
    type: errorType,
    schema,
    path,
    value: value3,
    message: GetErrorFunction()({ errorType, path, schema, value: value3 }),
  };
}
function* FromAny(schema, references, path, value3) {}
function* FromArray3(schema, references, path, value3) {
  if (!IsArray(value3)) {
    return yield Create(ValueErrorType.Array, schema, path, value3);
  }
  if (IsDefined(schema.minItems) && !(value3.length >= schema.minItems)) {
    yield Create(ValueErrorType.ArrayMinItems, schema, path, value3);
  }
  if (IsDefined(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    yield Create(ValueErrorType.ArrayMaxItems, schema, path, value3);
  }
  for (let i = 0; i < value3.length; i++) {
    yield* Visit4(schema.items, references, `${path}/${i}`, value3[i]);
  }
  if (
    schema.uniqueItems === true &&
    !(function () {
      const set2 = new Set();
      for (const element of value3) {
        const hashed = Hash(element);
        if (set2.has(hashed)) {
          return false;
        } else {
          set2.add(hashed);
        }
      }
      return true;
    })()
  ) {
    yield Create(ValueErrorType.ArrayUniqueItems, schema, path, value3);
  }
  if (
    !(
      IsDefined(schema.contains) ||
      IsDefined(schema.minContains) ||
      IsDefined(schema.maxContains)
    )
  ) {
    return;
  }
  const containsSchema = IsDefined(schema.contains) ? schema.contains : Never();
  const containsCount = value3.reduce(
    (acc, value4, index) =>
      Visit4(containsSchema, references, `${path}${index}`, value4).next()
        .done === true
        ? acc + 1
        : acc,
    0
  );
  if (containsCount === 0) {
    yield Create(ValueErrorType.ArrayContains, schema, path, value3);
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    yield Create(ValueErrorType.ArrayMinContains, schema, path, value3);
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    yield Create(ValueErrorType.ArrayMaxContains, schema, path, value3);
  }
}
function* FromAsyncIterator(schema, references, path, value3) {
  if (!IsAsyncIterator(value3))
    yield Create(ValueErrorType.AsyncIterator, schema, path, value3);
}
function* FromBigInt(schema, references, path, value3) {
  if (!IsBigInt(value3))
    return yield Create(ValueErrorType.BigInt, schema, path, value3);
  if (
    IsDefined(schema.exclusiveMaximum) &&
    !(value3 < schema.exclusiveMaximum)
  ) {
    yield Create(ValueErrorType.BigIntExclusiveMaximum, schema, path, value3);
  }
  if (
    IsDefined(schema.exclusiveMinimum) &&
    !(value3 > schema.exclusiveMinimum)
  ) {
    yield Create(ValueErrorType.BigIntExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.BigIntMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.BigIntMinimum, schema, path, value3);
  }
  if (
    IsDefined(schema.multipleOf) &&
    !(value3 % schema.multipleOf === BigInt(0))
  ) {
    yield Create(ValueErrorType.BigIntMultipleOf, schema, path, value3);
  }
}
function* FromBoolean(schema, references, path, value3) {
  if (!IsBoolean(value3))
    yield Create(ValueErrorType.Boolean, schema, path, value3);
}
function* FromConstructor(schema, references, path, value3) {
  yield* Visit4(schema.returns, references, path, value3.prototype);
}
function* FromDate(schema, references, path, value3) {
  if (!IsDate(value3))
    return yield Create(ValueErrorType.Date, schema, path, value3);
  if (
    IsDefined(schema.exclusiveMaximumTimestamp) &&
    !(value3.getTime() < schema.exclusiveMaximumTimestamp)
  ) {
    yield Create(
      ValueErrorType.DateExclusiveMaximumTimestamp,
      schema,
      path,
      value3
    );
  }
  if (
    IsDefined(schema.exclusiveMinimumTimestamp) &&
    !(value3.getTime() > schema.exclusiveMinimumTimestamp)
  ) {
    yield Create(
      ValueErrorType.DateExclusiveMinimumTimestamp,
      schema,
      path,
      value3
    );
  }
  if (
    IsDefined(schema.maximumTimestamp) &&
    !(value3.getTime() <= schema.maximumTimestamp)
  ) {
    yield Create(ValueErrorType.DateMaximumTimestamp, schema, path, value3);
  }
  if (
    IsDefined(schema.minimumTimestamp) &&
    !(value3.getTime() >= schema.minimumTimestamp)
  ) {
    yield Create(ValueErrorType.DateMinimumTimestamp, schema, path, value3);
  }
  if (
    IsDefined(schema.multipleOfTimestamp) &&
    !(value3.getTime() % schema.multipleOfTimestamp === 0)
  ) {
    yield Create(ValueErrorType.DateMultipleOfTimestamp, schema, path, value3);
  }
}
function* FromFunction(schema, references, path, value3) {
  if (!IsFunction(value3))
    yield Create(ValueErrorType.Function, schema, path, value3);
}
function* FromInteger(schema, references, path, value3) {
  if (!IsInteger(value3))
    return yield Create(ValueErrorType.Integer, schema, path, value3);
  if (
    IsDefined(schema.exclusiveMaximum) &&
    !(value3 < schema.exclusiveMaximum)
  ) {
    yield Create(ValueErrorType.IntegerExclusiveMaximum, schema, path, value3);
  }
  if (
    IsDefined(schema.exclusiveMinimum) &&
    !(value3 > schema.exclusiveMinimum)
  ) {
    yield Create(ValueErrorType.IntegerExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.IntegerMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.IntegerMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.IntegerMultipleOf, schema, path, value3);
  }
}
function* FromIntersect3(schema, references, path, value3) {
  for (const inner of schema.allOf) {
    const next = Visit4(inner, references, path, value3).next();
    if (!next.done) {
      yield Create(ValueErrorType.Intersect, schema, path, value3);
      yield next.value;
    }
  }
  if (schema.unevaluatedProperties === false) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        yield Create(
          ValueErrorType.IntersectUnevaluatedProperties,
          schema,
          `${path}/${valueKey}`,
          value3
        );
      }
    }
  }
  if (typeof schema.unevaluatedProperties === 'object') {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        const next = Visit4(
          schema.unevaluatedProperties,
          references,
          `${path}/${valueKey}`,
          value3[valueKey]
        ).next();
        if (!next.done) yield next.value;
      }
    }
  }
}
function* FromIterator(schema, references, path, value3) {
  if (!IsIterator(value3))
    yield Create(ValueErrorType.Iterator, schema, path, value3);
}
function* FromLiteral2(schema, references, path, value3) {
  if (!(value3 === schema.const))
    yield Create(ValueErrorType.Literal, schema, path, value3);
}
function* FromNever(schema, references, path, value3) {
  yield Create(ValueErrorType.Never, schema, path, value3);
}
function* FromNot(schema, references, path, value3) {
  if (Visit4(schema.not, references, path, value3).next().done === true)
    yield Create(ValueErrorType.Not, schema, path, value3);
}
function* FromNull(schema, references, path, value3) {
  if (!IsNull(value3)) yield Create(ValueErrorType.Null, schema, path, value3);
}
function* FromNumber(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3))
    return yield Create(ValueErrorType.Number, schema, path, value3);
  if (
    IsDefined(schema.exclusiveMaximum) &&
    !(value3 < schema.exclusiveMaximum)
  ) {
    yield Create(ValueErrorType.NumberExclusiveMaximum, schema, path, value3);
  }
  if (
    IsDefined(schema.exclusiveMinimum) &&
    !(value3 > schema.exclusiveMinimum)
  ) {
    yield Create(ValueErrorType.NumberExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.NumberMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.NumberMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.NumberMultipleOf, schema, path, value3);
  }
}
function* FromObject(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (
    IsDefined(schema.minProperties) &&
    !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)
  ) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (
    IsDefined(schema.maxProperties) &&
    !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)
  ) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  const unknownKeys = Object.getOwnPropertyNames(value3);
  for (const requiredKey of requiredKeys) {
    if (unknownKeys.includes(requiredKey)) continue;
    yield Create(
      ValueErrorType.ObjectRequiredProperty,
      schema.properties[requiredKey],
      `${path}/${EscapeKey(requiredKey)}`,
      undefined
    );
  }
  if (schema.additionalProperties === false) {
    for (const valueKey of unknownKeys) {
      if (!knownKeys.includes(valueKey)) {
        yield Create(
          ValueErrorType.ObjectAdditionalProperties,
          schema,
          `${path}/${EscapeKey(valueKey)}`,
          value3[valueKey]
        );
      }
    }
  }
  if (typeof schema.additionalProperties === 'object') {
    for (const valueKey of unknownKeys) {
      if (knownKeys.includes(valueKey)) continue;
      yield* Visit4(
        schema.additionalProperties,
        references,
        `${path}/${EscapeKey(valueKey)}`,
        value3[valueKey]
      );
    }
  }
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      yield* Visit4(
        property,
        references,
        `${path}/${EscapeKey(knownKey)}`,
        value3[knownKey]
      );
      if (ExtendsUndefinedCheck(schema) && !(knownKey in value3)) {
        yield Create(
          ValueErrorType.ObjectRequiredProperty,
          property,
          `${path}/${EscapeKey(knownKey)}`,
          undefined
        );
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey)) {
        yield* Visit4(
          property,
          references,
          `${path}/${EscapeKey(knownKey)}`,
          value3[knownKey]
        );
      }
    }
  }
}
function* FromPromise(schema, references, path, value3) {
  if (!IsPromise(value3))
    yield Create(ValueErrorType.Promise, schema, path, value3);
}
function* FromRecord(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (
    IsDefined(schema.minProperties) &&
    !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)
  ) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (
    IsDefined(schema.maxProperties) &&
    !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)
  ) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const [patternKey, patternSchema] = Object.entries(
    schema.patternProperties
  )[0];
  const regex = new RegExp(patternKey);
  for (const [propertyKey, propertyValue] of Object.entries(value3)) {
    if (regex.test(propertyKey))
      yield* Visit4(
        patternSchema,
        references,
        `${path}/${EscapeKey(propertyKey)}`,
        propertyValue
      );
  }
  if (typeof schema.additionalProperties === 'object') {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (!regex.test(propertyKey))
        yield* Visit4(
          schema.additionalProperties,
          references,
          `${path}/${EscapeKey(propertyKey)}`,
          propertyValue
        );
    }
  }
  if (schema.additionalProperties === false) {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (regex.test(propertyKey)) continue;
      return yield Create(
        ValueErrorType.ObjectAdditionalProperties,
        schema,
        `${path}/${EscapeKey(propertyKey)}`,
        propertyValue
      );
    }
  }
}
function* FromRef(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromRegExp(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  const regex = new RegExp(schema.source, schema.flags);
  if (!regex.test(value3)) {
    return yield Create(ValueErrorType.RegExp, schema, path, value3);
  }
}
function* FromString(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  if (IsString(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3)) {
      yield Create(ValueErrorType.StringPattern, schema, path, value3);
    }
  }
  if (IsString(schema.format)) {
    if (!exports_format.Has(schema.format)) {
      yield Create(ValueErrorType.StringFormatUnknown, schema, path, value3);
    } else {
      const format = exports_format.Get(schema.format);
      if (!format(value3)) {
        yield Create(ValueErrorType.StringFormat, schema, path, value3);
      }
    }
  }
}
function* FromSymbol(schema, references, path, value3) {
  if (!IsSymbol(value3))
    yield Create(ValueErrorType.Symbol, schema, path, value3);
}
function* FromTemplateLiteral2(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  const regex = new RegExp(schema.pattern);
  if (!regex.test(value3)) {
    yield Create(ValueErrorType.StringPattern, schema, path, value3);
  }
}
function* FromThis(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromTuple3(schema, references, path, value3) {
  if (!IsArray(value3))
    return yield Create(ValueErrorType.Tuple, schema, path, value3);
  if (schema.items === undefined && !(value3.length === 0)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!(value3.length === schema.maxItems)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!schema.items) {
    return;
  }
  for (let i = 0; i < schema.items.length; i++) {
    yield* Visit4(schema.items[i], references, `${path}/${i}`, value3[i]);
  }
}
function* FromUndefined(schema, references, path, value3) {
  if (!IsUndefined(value3))
    yield Create(ValueErrorType.Undefined, schema, path, value3);
}
function* FromUnion5(schema, references, path, value3) {
  let count = 0;
  for (const subschema of schema.anyOf) {
    const errors2 = [...Visit4(subschema, references, path, value3)];
    if (errors2.length === 0) return;
    count += errors2.length;
  }
  if (count > 0) {
    yield Create(ValueErrorType.Union, schema, path, value3);
  }
}
function* FromUint8Array(schema, references, path, value3) {
  if (!IsUint8Array(value3))
    return yield Create(ValueErrorType.Uint8Array, schema, path, value3);
  if (
    IsDefined(schema.maxByteLength) &&
    !(value3.length <= schema.maxByteLength)
  ) {
    yield Create(ValueErrorType.Uint8ArrayMaxByteLength, schema, path, value3);
  }
  if (
    IsDefined(schema.minByteLength) &&
    !(value3.length >= schema.minByteLength)
  ) {
    yield Create(ValueErrorType.Uint8ArrayMinByteLength, schema, path, value3);
  }
}
function* FromUnknown(schema, references, path, value3) {}
function* FromVoid(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsVoidLike(value3))
    yield Create(ValueErrorType.Void, schema, path, value3);
}
function* FromKind(schema, references, path, value3) {
  const check = exports_type.Get(schema[Kind]);
  if (!check(schema, value3))
    yield Create(ValueErrorType.Kind, schema, path, value3);
}
function* Visit4(schema, references, path, value3) {
  const references_ = IsDefined(schema.$id)
    ? [...references, schema]
    : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case 'Any':
      return yield* FromAny(schema_, references_, path, value3);
    case 'Array':
      return yield* FromArray3(schema_, references_, path, value3);
    case 'AsyncIterator':
      return yield* FromAsyncIterator(schema_, references_, path, value3);
    case 'BigInt':
      return yield* FromBigInt(schema_, references_, path, value3);
    case 'Boolean':
      return yield* FromBoolean(schema_, references_, path, value3);
    case 'Constructor':
      return yield* FromConstructor(schema_, references_, path, value3);
    case 'Date':
      return yield* FromDate(schema_, references_, path, value3);
    case 'Function':
      return yield* FromFunction(schema_, references_, path, value3);
    case 'Integer':
      return yield* FromInteger(schema_, references_, path, value3);
    case 'Intersect':
      return yield* FromIntersect3(schema_, references_, path, value3);
    case 'Iterator':
      return yield* FromIterator(schema_, references_, path, value3);
    case 'Literal':
      return yield* FromLiteral2(schema_, references_, path, value3);
    case 'Never':
      return yield* FromNever(schema_, references_, path, value3);
    case 'Not':
      return yield* FromNot(schema_, references_, path, value3);
    case 'Null':
      return yield* FromNull(schema_, references_, path, value3);
    case 'Number':
      return yield* FromNumber(schema_, references_, path, value3);
    case 'Object':
      return yield* FromObject(schema_, references_, path, value3);
    case 'Promise':
      return yield* FromPromise(schema_, references_, path, value3);
    case 'Record':
      return yield* FromRecord(schema_, references_, path, value3);
    case 'Ref':
      return yield* FromRef(schema_, references_, path, value3);
    case 'RegExp':
      return yield* FromRegExp(schema_, references_, path, value3);
    case 'String':
      return yield* FromString(schema_, references_, path, value3);
    case 'Symbol':
      return yield* FromSymbol(schema_, references_, path, value3);
    case 'TemplateLiteral':
      return yield* FromTemplateLiteral2(schema_, references_, path, value3);
    case 'This':
      return yield* FromThis(schema_, references_, path, value3);
    case 'Tuple':
      return yield* FromTuple3(schema_, references_, path, value3);
    case 'Undefined':
      return yield* FromUndefined(schema_, references_, path, value3);
    case 'Union':
      return yield* FromUnion5(schema_, references_, path, value3);
    case 'Uint8Array':
      return yield* FromUint8Array(schema_, references_, path, value3);
    case 'Unknown':
      return yield* FromUnknown(schema_, references_, path, value3);
    case 'Void':
      return yield* FromVoid(schema_, references_, path, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueErrorsUnknownTypeError(schema);
      return yield* FromKind(schema_, references_, path, value3);
  }
}
function Errors(...args) {
  const iterator3 =
    args.length === 3
      ? Visit4(args[0], args[1], '', args[2])
      : Visit4(args[0], [], '', args[1]);
  return new ValueErrorIterator(iterator3);
}
var ValueErrorType;
(function (ValueErrorType2) {
  ValueErrorType2[(ValueErrorType2['ArrayContains'] = 0)] = 'ArrayContains';
  ValueErrorType2[(ValueErrorType2['ArrayMaxContains'] = 1)] =
    'ArrayMaxContains';
  ValueErrorType2[(ValueErrorType2['ArrayMaxItems'] = 2)] = 'ArrayMaxItems';
  ValueErrorType2[(ValueErrorType2['ArrayMinContains'] = 3)] =
    'ArrayMinContains';
  ValueErrorType2[(ValueErrorType2['ArrayMinItems'] = 4)] = 'ArrayMinItems';
  ValueErrorType2[(ValueErrorType2['ArrayUniqueItems'] = 5)] =
    'ArrayUniqueItems';
  ValueErrorType2[(ValueErrorType2['Array'] = 6)] = 'Array';
  ValueErrorType2[(ValueErrorType2['AsyncIterator'] = 7)] = 'AsyncIterator';
  ValueErrorType2[(ValueErrorType2['BigIntExclusiveMaximum'] = 8)] =
    'BigIntExclusiveMaximum';
  ValueErrorType2[(ValueErrorType2['BigIntExclusiveMinimum'] = 9)] =
    'BigIntExclusiveMinimum';
  ValueErrorType2[(ValueErrorType2['BigIntMaximum'] = 10)] = 'BigIntMaximum';
  ValueErrorType2[(ValueErrorType2['BigIntMinimum'] = 11)] = 'BigIntMinimum';
  ValueErrorType2[(ValueErrorType2['BigIntMultipleOf'] = 12)] =
    'BigIntMultipleOf';
  ValueErrorType2[(ValueErrorType2['BigInt'] = 13)] = 'BigInt';
  ValueErrorType2[(ValueErrorType2['Boolean'] = 14)] = 'Boolean';
  ValueErrorType2[(ValueErrorType2['DateExclusiveMaximumTimestamp'] = 15)] =
    'DateExclusiveMaximumTimestamp';
  ValueErrorType2[(ValueErrorType2['DateExclusiveMinimumTimestamp'] = 16)] =
    'DateExclusiveMinimumTimestamp';
  ValueErrorType2[(ValueErrorType2['DateMaximumTimestamp'] = 17)] =
    'DateMaximumTimestamp';
  ValueErrorType2[(ValueErrorType2['DateMinimumTimestamp'] = 18)] =
    'DateMinimumTimestamp';
  ValueErrorType2[(ValueErrorType2['DateMultipleOfTimestamp'] = 19)] =
    'DateMultipleOfTimestamp';
  ValueErrorType2[(ValueErrorType2['Date'] = 20)] = 'Date';
  ValueErrorType2[(ValueErrorType2['Function'] = 21)] = 'Function';
  ValueErrorType2[(ValueErrorType2['IntegerExclusiveMaximum'] = 22)] =
    'IntegerExclusiveMaximum';
  ValueErrorType2[(ValueErrorType2['IntegerExclusiveMinimum'] = 23)] =
    'IntegerExclusiveMinimum';
  ValueErrorType2[(ValueErrorType2['IntegerMaximum'] = 24)] = 'IntegerMaximum';
  ValueErrorType2[(ValueErrorType2['IntegerMinimum'] = 25)] = 'IntegerMinimum';
  ValueErrorType2[(ValueErrorType2['IntegerMultipleOf'] = 26)] =
    'IntegerMultipleOf';
  ValueErrorType2[(ValueErrorType2['Integer'] = 27)] = 'Integer';
  ValueErrorType2[(ValueErrorType2['IntersectUnevaluatedProperties'] = 28)] =
    'IntersectUnevaluatedProperties';
  ValueErrorType2[(ValueErrorType2['Intersect'] = 29)] = 'Intersect';
  ValueErrorType2[(ValueErrorType2['Iterator'] = 30)] = 'Iterator';
  ValueErrorType2[(ValueErrorType2['Kind'] = 31)] = 'Kind';
  ValueErrorType2[(ValueErrorType2['Literal'] = 32)] = 'Literal';
  ValueErrorType2[(ValueErrorType2['Never'] = 33)] = 'Never';
  ValueErrorType2[(ValueErrorType2['Not'] = 34)] = 'Not';
  ValueErrorType2[(ValueErrorType2['Null'] = 35)] = 'Null';
  ValueErrorType2[(ValueErrorType2['NumberExclusiveMaximum'] = 36)] =
    'NumberExclusiveMaximum';
  ValueErrorType2[(ValueErrorType2['NumberExclusiveMinimum'] = 37)] =
    'NumberExclusiveMinimum';
  ValueErrorType2[(ValueErrorType2['NumberMaximum'] = 38)] = 'NumberMaximum';
  ValueErrorType2[(ValueErrorType2['NumberMinimum'] = 39)] = 'NumberMinimum';
  ValueErrorType2[(ValueErrorType2['NumberMultipleOf'] = 40)] =
    'NumberMultipleOf';
  ValueErrorType2[(ValueErrorType2['Number'] = 41)] = 'Number';
  ValueErrorType2[(ValueErrorType2['ObjectAdditionalProperties'] = 42)] =
    'ObjectAdditionalProperties';
  ValueErrorType2[(ValueErrorType2['ObjectMaxProperties'] = 43)] =
    'ObjectMaxProperties';
  ValueErrorType2[(ValueErrorType2['ObjectMinProperties'] = 44)] =
    'ObjectMinProperties';
  ValueErrorType2[(ValueErrorType2['ObjectRequiredProperty'] = 45)] =
    'ObjectRequiredProperty';
  ValueErrorType2[(ValueErrorType2['Object'] = 46)] = 'Object';
  ValueErrorType2[(ValueErrorType2['Promise'] = 47)] = 'Promise';
  ValueErrorType2[(ValueErrorType2['RegExp'] = 48)] = 'RegExp';
  ValueErrorType2[(ValueErrorType2['StringFormatUnknown'] = 49)] =
    'StringFormatUnknown';
  ValueErrorType2[(ValueErrorType2['StringFormat'] = 50)] = 'StringFormat';
  ValueErrorType2[(ValueErrorType2['StringMaxLength'] = 51)] =
    'StringMaxLength';
  ValueErrorType2[(ValueErrorType2['StringMinLength'] = 52)] =
    'StringMinLength';
  ValueErrorType2[(ValueErrorType2['StringPattern'] = 53)] = 'StringPattern';
  ValueErrorType2[(ValueErrorType2['String'] = 54)] = 'String';
  ValueErrorType2[(ValueErrorType2['Symbol'] = 55)] = 'Symbol';
  ValueErrorType2[(ValueErrorType2['TupleLength'] = 56)] = 'TupleLength';
  ValueErrorType2[(ValueErrorType2['Tuple'] = 57)] = 'Tuple';
  ValueErrorType2[(ValueErrorType2['Uint8ArrayMaxByteLength'] = 58)] =
    'Uint8ArrayMaxByteLength';
  ValueErrorType2[(ValueErrorType2['Uint8ArrayMinByteLength'] = 59)] =
    'Uint8ArrayMinByteLength';
  ValueErrorType2[(ValueErrorType2['Uint8Array'] = 60)] = 'Uint8Array';
  ValueErrorType2[(ValueErrorType2['Undefined'] = 61)] = 'Undefined';
  ValueErrorType2[(ValueErrorType2['Union'] = 62)] = 'Union';
  ValueErrorType2[(ValueErrorType2['Void'] = 63)] = 'Void';
})(ValueErrorType || (ValueErrorType = {}));

class ValueErrorsUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super('Unknown type');
    this.schema = schema;
  }
}

class ValueErrorIterator {
  constructor(iterator3) {
    this.iterator = iterator3;
  }
  [Symbol.iterator]() {
    return this.iterator;
  }
  First() {
    const next = this.iterator.next();
    return next.done ? undefined : next.value;
  }
}
// node_modules/@sinclair/typebox/build/esm/type/any/any.mjs
function Any(options = {}) {
  return { ...options, [Kind]: 'Any' };
}
// node_modules/@sinclair/typebox/build/esm/type/unknown/unknown.mjs
function Unknown(options = {}) {
  return {
    ...options,
    [Kind]: 'Unknown',
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/type.mjs
var exports_type2 = {};
__export(exports_type2, {
  TypeGuardUnknownTypeError: () => TypeGuardUnknownTypeError,
  IsVoid: () => IsVoid2,
  IsUnsafe: () => IsUnsafe2,
  IsUnknown: () => IsUnknown2,
  IsUnionLiteral: () => IsUnionLiteral,
  IsUnion: () => IsUnion2,
  IsUndefined: () => IsUndefined4,
  IsUint8Array: () => IsUint8Array4,
  IsTuple: () => IsTuple2,
  IsTransform: () => IsTransform2,
  IsThis: () => IsThis2,
  IsTemplateLiteral: () => IsTemplateLiteral2,
  IsSymbol: () => IsSymbol4,
  IsString: () => IsString4,
  IsSchema: () => IsSchema2,
  IsRegExp: () => IsRegExp3,
  IsRef: () => IsRef2,
  IsRecursive: () => IsRecursive,
  IsRecord: () => IsRecord2,
  IsReadonly: () => IsReadonly2,
  IsProperties: () => IsProperties,
  IsPromise: () => IsPromise3,
  IsOptional: () => IsOptional2,
  IsObject: () => IsObject4,
  IsNumber: () => IsNumber4,
  IsNull: () => IsNull4,
  IsNot: () => IsNot2,
  IsNever: () => IsNever2,
  IsMappedResult: () => IsMappedResult2,
  IsMappedKey: () => IsMappedKey2,
  IsLiteralValue: () => IsLiteralValue,
  IsLiteralString: () => IsLiteralString,
  IsLiteralNumber: () => IsLiteralNumber,
  IsLiteralBoolean: () => IsLiteralBoolean,
  IsLiteral: () => IsLiteral2,
  IsKindOf: () => IsKindOf2,
  IsKind: () => IsKind2,
  IsIterator: () => IsIterator4,
  IsIntersect: () => IsIntersect2,
  IsInteger: () => IsInteger3,
  IsFunction: () => IsFunction4,
  IsDate: () => IsDate4,
  IsConstructor: () => IsConstructor2,
  IsBoolean: () => IsBoolean4,
  IsBigInt: () => IsBigInt4,
  IsAsyncIterator: () => IsAsyncIterator4,
  IsArray: () => IsArray4,
  IsAny: () => IsAny2,
});
function IsPattern(value3) {
  try {
    new RegExp(value3);
    return true;
  } catch {
    return false;
  }
}
function IsControlCharacterFree(value3) {
  if (!IsString2(value3)) return false;
  for (let i = 0; i < value3.length; i++) {
    const code = value3.charCodeAt(i);
    if ((code >= 7 && code <= 13) || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
}
function IsAdditionalProperties(value3) {
  return IsOptionalBoolean(value3) || IsSchema2(value3);
}
function IsOptionalBigInt(value3) {
  return IsUndefined2(value3) || IsBigInt2(value3);
}
function IsOptionalNumber(value3) {
  return IsUndefined2(value3) || IsNumber2(value3);
}
function IsOptionalBoolean(value3) {
  return IsUndefined2(value3) || IsBoolean2(value3);
}
function IsOptionalString(value3) {
  return IsUndefined2(value3) || IsString2(value3);
}
function IsOptionalPattern(value3) {
  return (
    IsUndefined2(value3) ||
    (IsString2(value3) && IsControlCharacterFree(value3) && IsPattern(value3))
  );
}
function IsOptionalFormat(value3) {
  return (
    IsUndefined2(value3) ||
    (IsString2(value3) && IsControlCharacterFree(value3))
  );
}
function IsOptionalSchema(value3) {
  return IsUndefined2(value3) || IsSchema2(value3);
}
function IsReadonly2(value3) {
  return IsObject2(value3) && value3[ReadonlyKind] === 'Readonly';
}
function IsOptional2(value3) {
  return IsObject2(value3) && value3[OptionalKind] === 'Optional';
}
function IsAny2(value3) {
  return IsKindOf2(value3, 'Any') && IsOptionalString(value3.$id);
}
function IsArray4(value3) {
  return (
    IsKindOf2(value3, 'Array') &&
    value3.type === 'array' &&
    IsOptionalString(value3.$id) &&
    IsSchema2(value3.items) &&
    IsOptionalNumber(value3.minItems) &&
    IsOptionalNumber(value3.maxItems) &&
    IsOptionalBoolean(value3.uniqueItems) &&
    IsOptionalSchema(value3.contains) &&
    IsOptionalNumber(value3.minContains) &&
    IsOptionalNumber(value3.maxContains)
  );
}
function IsAsyncIterator4(value3) {
  return (
    IsKindOf2(value3, 'AsyncIterator') &&
    value3.type === 'AsyncIterator' &&
    IsOptionalString(value3.$id) &&
    IsSchema2(value3.items)
  );
}
function IsBigInt4(value3) {
  return (
    IsKindOf2(value3, 'BigInt') &&
    value3.type === 'bigint' &&
    IsOptionalString(value3.$id) &&
    IsOptionalBigInt(value3.exclusiveMaximum) &&
    IsOptionalBigInt(value3.exclusiveMinimum) &&
    IsOptionalBigInt(value3.maximum) &&
    IsOptionalBigInt(value3.minimum) &&
    IsOptionalBigInt(value3.multipleOf)
  );
}
function IsBoolean4(value3) {
  return (
    IsKindOf2(value3, 'Boolean') &&
    value3.type === 'boolean' &&
    IsOptionalString(value3.$id)
  );
}
function IsConstructor2(value3) {
  return (
    IsKindOf2(value3, 'Constructor') &&
    value3.type === 'Constructor' &&
    IsOptionalString(value3.$id) &&
    IsArray2(value3.parameters) &&
    value3.parameters.every((schema) => IsSchema2(schema)) &&
    IsSchema2(value3.returns)
  );
}
function IsDate4(value3) {
  return (
    IsKindOf2(value3, 'Date') &&
    value3.type === 'Date' &&
    IsOptionalString(value3.$id) &&
    IsOptionalNumber(value3.exclusiveMaximumTimestamp) &&
    IsOptionalNumber(value3.exclusiveMinimumTimestamp) &&
    IsOptionalNumber(value3.maximumTimestamp) &&
    IsOptionalNumber(value3.minimumTimestamp) &&
    IsOptionalNumber(value3.multipleOfTimestamp)
  );
}
function IsFunction4(value3) {
  return (
    IsKindOf2(value3, 'Function') &&
    value3.type === 'Function' &&
    IsOptionalString(value3.$id) &&
    IsArray2(value3.parameters) &&
    value3.parameters.every((schema) => IsSchema2(schema)) &&
    IsSchema2(value3.returns)
  );
}
function IsInteger3(value3) {
  return (
    IsKindOf2(value3, 'Integer') &&
    value3.type === 'integer' &&
    IsOptionalString(value3.$id) &&
    IsOptionalNumber(value3.exclusiveMaximum) &&
    IsOptionalNumber(value3.exclusiveMinimum) &&
    IsOptionalNumber(value3.maximum) &&
    IsOptionalNumber(value3.minimum) &&
    IsOptionalNumber(value3.multipleOf)
  );
}
function IsProperties(value3) {
  return (
    IsObject2(value3) &&
    Object.entries(value3).every(
      ([key, schema]) => IsControlCharacterFree(key) && IsSchema2(schema)
    )
  );
}
function IsIntersect2(value3) {
  return (
    IsKindOf2(value3, 'Intersect') &&
    (IsString2(value3.type) && value3.type !== 'object' ? false : true) &&
    IsArray2(value3.allOf) &&
    value3.allOf.every(
      (schema) => IsSchema2(schema) && !IsTransform2(schema)
    ) &&
    IsOptionalString(value3.type) &&
    (IsOptionalBoolean(value3.unevaluatedProperties) ||
      IsOptionalSchema(value3.unevaluatedProperties)) &&
    IsOptionalString(value3.$id)
  );
}
function IsIterator4(value3) {
  return (
    IsKindOf2(value3, 'Iterator') &&
    value3.type === 'Iterator' &&
    IsOptionalString(value3.$id) &&
    IsSchema2(value3.items)
  );
}
function IsKindOf2(value3, kind14) {
  return IsObject2(value3) && Kind in value3 && value3[Kind] === kind14;
}
function IsLiteralString(value3) {
  return IsLiteral2(value3) && IsString2(value3.const);
}
function IsLiteralNumber(value3) {
  return IsLiteral2(value3) && IsNumber2(value3.const);
}
function IsLiteralBoolean(value3) {
  return IsLiteral2(value3) && IsBoolean2(value3.const);
}
function IsLiteral2(value3) {
  return (
    IsKindOf2(value3, 'Literal') &&
    IsOptionalString(value3.$id) &&
    IsLiteralValue(value3.const)
  );
}
function IsLiteralValue(value3) {
  return IsBoolean2(value3) || IsNumber2(value3) || IsString2(value3);
}
function IsMappedKey2(value3) {
  return (
    IsKindOf2(value3, 'MappedKey') &&
    IsArray2(value3.keys) &&
    value3.keys.every((key) => IsNumber2(key) || IsString2(key))
  );
}
function IsMappedResult2(value3) {
  return IsKindOf2(value3, 'MappedResult') && IsProperties(value3.properties);
}
function IsNever2(value3) {
  return (
    IsKindOf2(value3, 'Never') &&
    IsObject2(value3.not) &&
    Object.getOwnPropertyNames(value3.not).length === 0
  );
}
function IsNot2(value3) {
  return IsKindOf2(value3, 'Not') && IsSchema2(value3.not);
}
function IsNull4(value3) {
  return (
    IsKindOf2(value3, 'Null') &&
    value3.type === 'null' &&
    IsOptionalString(value3.$id)
  );
}
function IsNumber4(value3) {
  return (
    IsKindOf2(value3, 'Number') &&
    value3.type === 'number' &&
    IsOptionalString(value3.$id) &&
    IsOptionalNumber(value3.exclusiveMaximum) &&
    IsOptionalNumber(value3.exclusiveMinimum) &&
    IsOptionalNumber(value3.maximum) &&
    IsOptionalNumber(value3.minimum) &&
    IsOptionalNumber(value3.multipleOf)
  );
}
function IsObject4(value3) {
  return (
    IsKindOf2(value3, 'Object') &&
    value3.type === 'object' &&
    IsOptionalString(value3.$id) &&
    IsProperties(value3.properties) &&
    IsAdditionalProperties(value3.additionalProperties) &&
    IsOptionalNumber(value3.minProperties) &&
    IsOptionalNumber(value3.maxProperties)
  );
}
function IsPromise3(value3) {
  return (
    IsKindOf2(value3, 'Promise') &&
    value3.type === 'Promise' &&
    IsOptionalString(value3.$id) &&
    IsSchema2(value3.item)
  );
}
function IsRecord2(value3) {
  return (
    IsKindOf2(value3, 'Record') &&
    value3.type === 'object' &&
    IsOptionalString(value3.$id) &&
    IsAdditionalProperties(value3.additionalProperties) &&
    IsObject2(value3.patternProperties) &&
    ((schema) => {
      const keys = Object.getOwnPropertyNames(schema.patternProperties);
      return (
        keys.length === 1 &&
        IsPattern(keys[0]) &&
        IsObject2(schema.patternProperties) &&
        IsSchema2(schema.patternProperties[keys[0]])
      );
    })(value3)
  );
}
function IsRecursive(value3) {
  return IsObject2(value3) && Hint in value3 && value3[Hint] === 'Recursive';
}
function IsRef2(value3) {
  return (
    IsKindOf2(value3, 'Ref') &&
    IsOptionalString(value3.$id) &&
    IsString2(value3.$ref)
  );
}
function IsRegExp3(value3) {
  return (
    IsKindOf2(value3, 'RegExp') &&
    IsOptionalString(value3.$id) &&
    IsString2(value3.source) &&
    IsString2(value3.flags) &&
    IsOptionalNumber(value3.maxLength) &&
    IsOptionalNumber(value3.minLength)
  );
}
function IsString4(value3) {
  return (
    IsKindOf2(value3, 'String') &&
    value3.type === 'string' &&
    IsOptionalString(value3.$id) &&
    IsOptionalNumber(value3.minLength) &&
    IsOptionalNumber(value3.maxLength) &&
    IsOptionalPattern(value3.pattern) &&
    IsOptionalFormat(value3.format)
  );
}
function IsSymbol4(value3) {
  return (
    IsKindOf2(value3, 'Symbol') &&
    value3.type === 'symbol' &&
    IsOptionalString(value3.$id)
  );
}
function IsTemplateLiteral2(value3) {
  return (
    IsKindOf2(value3, 'TemplateLiteral') &&
    value3.type === 'string' &&
    IsString2(value3.pattern) &&
    value3.pattern[0] === '^' &&
    value3.pattern[value3.pattern.length - 1] === '$'
  );
}
function IsThis2(value3) {
  return (
    IsKindOf2(value3, 'This') &&
    IsOptionalString(value3.$id) &&
    IsString2(value3.$ref)
  );
}
function IsTransform2(value3) {
  return IsObject2(value3) && TransformKind in value3;
}
function IsTuple2(value3) {
  return (
    IsKindOf2(value3, 'Tuple') &&
    value3.type === 'array' &&
    IsOptionalString(value3.$id) &&
    IsNumber2(value3.minItems) &&
    IsNumber2(value3.maxItems) &&
    value3.minItems === value3.maxItems &&
    ((IsUndefined2(value3.items) &&
      IsUndefined2(value3.additionalItems) &&
      value3.minItems === 0) ||
      (IsArray2(value3.items) &&
        value3.items.every((schema) => IsSchema2(schema))))
  );
}
function IsUndefined4(value3) {
  return (
    IsKindOf2(value3, 'Undefined') &&
    value3.type === 'undefined' &&
    IsOptionalString(value3.$id)
  );
}
function IsUnionLiteral(value3) {
  return (
    IsUnion2(value3) &&
    value3.anyOf.every(
      (schema) => IsLiteralString(schema) || IsLiteralNumber(schema)
    )
  );
}
function IsUnion2(value3) {
  return (
    IsKindOf2(value3, 'Union') &&
    IsOptionalString(value3.$id) &&
    IsObject2(value3) &&
    IsArray2(value3.anyOf) &&
    value3.anyOf.every((schema) => IsSchema2(schema))
  );
}
function IsUint8Array4(value3) {
  return (
    IsKindOf2(value3, 'Uint8Array') &&
    value3.type === 'Uint8Array' &&
    IsOptionalString(value3.$id) &&
    IsOptionalNumber(value3.minByteLength) &&
    IsOptionalNumber(value3.maxByteLength)
  );
}
function IsUnknown2(value3) {
  return IsKindOf2(value3, 'Unknown') && IsOptionalString(value3.$id);
}
function IsUnsafe2(value3) {
  return IsKindOf2(value3, 'Unsafe');
}
function IsVoid2(value3) {
  return (
    IsKindOf2(value3, 'Void') &&
    value3.type === 'void' &&
    IsOptionalString(value3.$id)
  );
}
function IsKind2(value3) {
  return (
    IsObject2(value3) &&
    Kind in value3 &&
    IsString2(value3[Kind]) &&
    !KnownTypes.includes(value3[Kind])
  );
}
function IsSchema2(value3) {
  return (
    IsObject2(value3) &&
    (IsAny2(value3) ||
      IsArray4(value3) ||
      IsBoolean4(value3) ||
      IsBigInt4(value3) ||
      IsAsyncIterator4(value3) ||
      IsConstructor2(value3) ||
      IsDate4(value3) ||
      IsFunction4(value3) ||
      IsInteger3(value3) ||
      IsIntersect2(value3) ||
      IsIterator4(value3) ||
      IsLiteral2(value3) ||
      IsMappedKey2(value3) ||
      IsMappedResult2(value3) ||
      IsNever2(value3) ||
      IsNot2(value3) ||
      IsNull4(value3) ||
      IsNumber4(value3) ||
      IsObject4(value3) ||
      IsPromise3(value3) ||
      IsRecord2(value3) ||
      IsRef2(value3) ||
      IsRegExp3(value3) ||
      IsString4(value3) ||
      IsSymbol4(value3) ||
      IsTemplateLiteral2(value3) ||
      IsThis2(value3) ||
      IsTuple2(value3) ||
      IsUndefined4(value3) ||
      IsUnion2(value3) ||
      IsUint8Array4(value3) ||
      IsUnknown2(value3) ||
      IsUnsafe2(value3) ||
      IsVoid2(value3) ||
      IsKind2(value3))
  );
}

class TypeGuardUnknownTypeError extends TypeBoxError {}
var KnownTypes = [
  'Any',
  'Array',
  'AsyncIterator',
  'BigInt',
  'Boolean',
  'Constructor',
  'Date',
  'Enum',
  'Function',
  'Integer',
  'Intersect',
  'Iterator',
  'Literal',
  'MappedKey',
  'MappedResult',
  'Not',
  'Null',
  'Number',
  'Object',
  'Promise',
  'Record',
  'Ref',
  'RegExp',
  'String',
  'Symbol',
  'TemplateLiteral',
  'This',
  'Tuple',
  'Undefined',
  'Union',
  'Uint8Array',
  'Unknown',
  'Void',
];
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-check.mjs
function IntoBooleanResult(result) {
  return result === ExtendsResult.False ? result : ExtendsResult.True;
}
function Throw(message) {
  throw new ExtendsResolverError(message);
}
function IsStructuralRight(right) {
  return (
    exports_type2.IsNever(right) ||
    exports_type2.IsIntersect(right) ||
    exports_type2.IsUnion(right) ||
    exports_type2.IsUnknown(right) ||
    exports_type2.IsAny(right)
  );
}
function StructuralRight(left, right) {
  return exports_type2.IsNever(right)
    ? FromNeverRight(left, right)
    : exports_type2.IsIntersect(right)
      ? FromIntersectRight(left, right)
      : exports_type2.IsUnion(right)
        ? FromUnionRight(left, right)
        : exports_type2.IsUnknown(right)
          ? FromUnknownRight(left, right)
          : exports_type2.IsAny(right)
            ? FromAnyRight(left, right)
            : Throw('StructuralRight');
}
function FromAnyRight(left, right) {
  return ExtendsResult.True;
}
function FromAny2(left, right) {
  return exports_type2.IsIntersect(right)
    ? FromIntersectRight(left, right)
    : exports_type2.IsUnion(right) &&
        right.anyOf.some(
          (schema) =>
            exports_type2.IsAny(schema) || exports_type2.IsUnknown(schema)
        )
      ? ExtendsResult.True
      : exports_type2.IsUnion(right)
        ? ExtendsResult.Union
        : exports_type2.IsUnknown(right)
          ? ExtendsResult.True
          : exports_type2.IsAny(right)
            ? ExtendsResult.True
            : ExtendsResult.Union;
}
function FromArrayRight(left, right) {
  return exports_type2.IsUnknown(left)
    ? ExtendsResult.False
    : exports_type2.IsAny(left)
      ? ExtendsResult.Union
      : exports_type2.IsNever(left)
        ? ExtendsResult.True
        : ExtendsResult.False;
}
function FromArray4(left, right) {
  return exports_type2.IsObject(right) && IsObjectArrayLike(right)
    ? ExtendsResult.True
    : IsStructuralRight(right)
      ? StructuralRight(left, right)
      : !exports_type2.IsArray(right)
        ? ExtendsResult.False
        : IntoBooleanResult(Visit5(left.items, right.items));
}
function FromAsyncIterator2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : !exports_type2.IsAsyncIterator(right)
      ? ExtendsResult.False
      : IntoBooleanResult(Visit5(left.items, right.items));
}
function FromBigInt2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : exports_type2.IsRecord(right)
        ? FromRecordRight(left, right)
        : exports_type2.IsBigInt(right)
          ? ExtendsResult.True
          : ExtendsResult.False;
}
function FromBooleanRight(left, right) {
  return exports_type2.IsLiteralBoolean(left)
    ? ExtendsResult.True
    : exports_type2.IsBoolean(left)
      ? ExtendsResult.True
      : ExtendsResult.False;
}
function FromBoolean2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : exports_type2.IsRecord(right)
        ? FromRecordRight(left, right)
        : exports_type2.IsBoolean(right)
          ? ExtendsResult.True
          : ExtendsResult.False;
}
function FromConstructor2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : !exports_type2.IsConstructor(right)
        ? ExtendsResult.False
        : left.parameters.length > right.parameters.length
          ? ExtendsResult.False
          : !left.parameters.every(
                (schema, index) =>
                  IntoBooleanResult(Visit5(right.parameters[index], schema)) ===
                  ExtendsResult.True
              )
            ? ExtendsResult.False
            : IntoBooleanResult(Visit5(left.returns, right.returns));
}
function FromDate2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : exports_type2.IsRecord(right)
        ? FromRecordRight(left, right)
        : exports_type2.IsDate(right)
          ? ExtendsResult.True
          : ExtendsResult.False;
}
function FromFunction2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : !exports_type2.IsFunction(right)
        ? ExtendsResult.False
        : left.parameters.length > right.parameters.length
          ? ExtendsResult.False
          : !left.parameters.every(
                (schema, index) =>
                  IntoBooleanResult(Visit5(right.parameters[index], schema)) ===
                  ExtendsResult.True
              )
            ? ExtendsResult.False
            : IntoBooleanResult(Visit5(left.returns, right.returns));
}
function FromIntegerRight(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsNumber(left.const)
    ? ExtendsResult.True
    : exports_type2.IsNumber(left) || exports_type2.IsInteger(left)
      ? ExtendsResult.True
      : ExtendsResult.False;
}
function FromInteger2(left, right) {
  return exports_type2.IsInteger(right) || exports_type2.IsNumber(right)
    ? ExtendsResult.True
    : IsStructuralRight(right)
      ? StructuralRight(left, right)
      : exports_type2.IsObject(right)
        ? FromObjectRight(left, right)
        : exports_type2.IsRecord(right)
          ? FromRecordRight(left, right)
          : ExtendsResult.False;
}
function FromIntersectRight(left, right) {
  return right.allOf.every(
    (schema) => Visit5(left, schema) === ExtendsResult.True
  )
    ? ExtendsResult.True
    : ExtendsResult.False;
}
function FromIntersect4(left, right) {
  return left.allOf.some(
    (schema) => Visit5(schema, right) === ExtendsResult.True
  )
    ? ExtendsResult.True
    : ExtendsResult.False;
}
function FromIterator2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : !exports_type2.IsIterator(right)
      ? ExtendsResult.False
      : IntoBooleanResult(Visit5(left.items, right.items));
}
function FromLiteral3(left, right) {
  return exports_type2.IsLiteral(right) && right.const === left.const
    ? ExtendsResult.True
    : IsStructuralRight(right)
      ? StructuralRight(left, right)
      : exports_type2.IsObject(right)
        ? FromObjectRight(left, right)
        : exports_type2.IsRecord(right)
          ? FromRecordRight(left, right)
          : exports_type2.IsString(right)
            ? FromStringRight(left, right)
            : exports_type2.IsNumber(right)
              ? FromNumberRight(left, right)
              : exports_type2.IsInteger(right)
                ? FromIntegerRight(left, right)
                : exports_type2.IsBoolean(right)
                  ? FromBooleanRight(left, right)
                  : ExtendsResult.False;
}
function FromNeverRight(left, right) {
  return ExtendsResult.False;
}
function FromNever2(left, right) {
  return ExtendsResult.True;
}
function UnwrapTNot(schema) {
  let [current, depth] = [schema, 0];
  while (true) {
    if (!exports_type2.IsNot(current)) break;
    current = current.not;
    depth += 1;
  }
  return depth % 2 === 0 ? current : Unknown();
}
function FromNot2(left, right) {
  return exports_type2.IsNot(left)
    ? Visit5(UnwrapTNot(left), right)
    : exports_type2.IsNot(right)
      ? Visit5(left, UnwrapTNot(right))
      : Throw('Invalid fallthrough for Not');
}
function FromNull2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : exports_type2.IsRecord(right)
        ? FromRecordRight(left, right)
        : exports_type2.IsNull(right)
          ? ExtendsResult.True
          : ExtendsResult.False;
}
function FromNumberRight(left, right) {
  return exports_type2.IsLiteralNumber(left)
    ? ExtendsResult.True
    : exports_type2.IsNumber(left) || exports_type2.IsInteger(left)
      ? ExtendsResult.True
      : ExtendsResult.False;
}
function FromNumber2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : exports_type2.IsRecord(right)
        ? FromRecordRight(left, right)
        : exports_type2.IsInteger(right) || exports_type2.IsNumber(right)
          ? ExtendsResult.True
          : ExtendsResult.False;
}
function IsObjectPropertyCount(schema, count) {
  return Object.getOwnPropertyNames(schema.properties).length === count;
}
function IsObjectStringLike(schema) {
  return IsObjectArrayLike(schema);
}
function IsObjectSymbolLike(schema) {
  return (
    IsObjectPropertyCount(schema, 0) ||
    (IsObjectPropertyCount(schema, 1) &&
      'description' in schema.properties &&
      exports_type2.IsUnion(schema.properties.description) &&
      schema.properties.description.anyOf.length === 2 &&
      ((exports_type2.IsString(schema.properties.description.anyOf[0]) &&
        exports_type2.IsUndefined(schema.properties.description.anyOf[1])) ||
        (exports_type2.IsString(schema.properties.description.anyOf[1]) &&
          exports_type2.IsUndefined(schema.properties.description.anyOf[0]))))
  );
}
function IsObjectNumberLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectBooleanLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectBigIntLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectDateLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectUint8ArrayLike(schema) {
  return IsObjectArrayLike(schema);
}
function IsObjectFunctionLike(schema) {
  const length = Number2();
  return (
    IsObjectPropertyCount(schema, 0) ||
    (IsObjectPropertyCount(schema, 1) &&
      'length' in schema.properties &&
      IntoBooleanResult(Visit5(schema.properties['length'], length)) ===
        ExtendsResult.True)
  );
}
function IsObjectConstructorLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectArrayLike(schema) {
  const length = Number2();
  return (
    IsObjectPropertyCount(schema, 0) ||
    (IsObjectPropertyCount(schema, 1) &&
      'length' in schema.properties &&
      IntoBooleanResult(Visit5(schema.properties['length'], length)) ===
        ExtendsResult.True)
  );
}
function IsObjectPromiseLike(schema) {
  const then = Function2([Any()], Any());
  return (
    IsObjectPropertyCount(schema, 0) ||
    (IsObjectPropertyCount(schema, 1) &&
      'then' in schema.properties &&
      IntoBooleanResult(Visit5(schema.properties['then'], then)) ===
        ExtendsResult.True)
  );
}
function Property(left, right) {
  return Visit5(left, right) === ExtendsResult.False
    ? ExtendsResult.False
    : exports_type2.IsOptional(left) && !exports_type2.IsOptional(right)
      ? ExtendsResult.False
      : ExtendsResult.True;
}
function FromObjectRight(left, right) {
  return exports_type2.IsUnknown(left)
    ? ExtendsResult.False
    : exports_type2.IsAny(left)
      ? ExtendsResult.Union
      : exports_type2.IsNever(left) ||
          (exports_type2.IsLiteralString(left) && IsObjectStringLike(right)) ||
          (exports_type2.IsLiteralNumber(left) && IsObjectNumberLike(right)) ||
          (exports_type2.IsLiteralBoolean(left) &&
            IsObjectBooleanLike(right)) ||
          (exports_type2.IsSymbol(left) && IsObjectSymbolLike(right)) ||
          (exports_type2.IsBigInt(left) && IsObjectBigIntLike(right)) ||
          (exports_type2.IsString(left) && IsObjectStringLike(right)) ||
          (exports_type2.IsSymbol(left) && IsObjectSymbolLike(right)) ||
          (exports_type2.IsNumber(left) && IsObjectNumberLike(right)) ||
          (exports_type2.IsInteger(left) && IsObjectNumberLike(right)) ||
          (exports_type2.IsBoolean(left) && IsObjectBooleanLike(right)) ||
          (exports_type2.IsUint8Array(left) && IsObjectUint8ArrayLike(right)) ||
          (exports_type2.IsDate(left) && IsObjectDateLike(right)) ||
          (exports_type2.IsConstructor(left) &&
            IsObjectConstructorLike(right)) ||
          (exports_type2.IsFunction(left) && IsObjectFunctionLike(right))
        ? ExtendsResult.True
        : exports_type2.IsRecord(left) &&
            exports_type2.IsString(RecordKey(left))
          ? (() => {
              return right[Hint] === 'Record'
                ? ExtendsResult.True
                : ExtendsResult.False;
            })()
          : exports_type2.IsRecord(left) &&
              exports_type2.IsNumber(RecordKey(left))
            ? (() => {
                return IsObjectPropertyCount(right, 0)
                  ? ExtendsResult.True
                  : ExtendsResult.False;
              })()
            : ExtendsResult.False;
}
function FromObject2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsRecord(right)
      ? FromRecordRight(left, right)
      : !exports_type2.IsObject(right)
        ? ExtendsResult.False
        : (() => {
            for (const key of Object.getOwnPropertyNames(right.properties)) {
              if (
                !(key in left.properties) &&
                !exports_type2.IsOptional(right.properties[key])
              ) {
                return ExtendsResult.False;
              }
              if (exports_type2.IsOptional(right.properties[key])) {
                return ExtendsResult.True;
              }
              if (
                Property(left.properties[key], right.properties[key]) ===
                ExtendsResult.False
              ) {
                return ExtendsResult.False;
              }
            }
            return ExtendsResult.True;
          })();
}
function FromPromise2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right) && IsObjectPromiseLike(right)
      ? ExtendsResult.True
      : !exports_type2.IsPromise(right)
        ? ExtendsResult.False
        : IntoBooleanResult(Visit5(left.item, right.item));
}
function RecordKey(schema) {
  return PatternNumberExact in schema.patternProperties
    ? Number2()
    : PatternStringExact in schema.patternProperties
      ? String2()
      : Throw('Unknown record key pattern');
}
function RecordValue(schema) {
  return PatternNumberExact in schema.patternProperties
    ? schema.patternProperties[PatternNumberExact]
    : PatternStringExact in schema.patternProperties
      ? schema.patternProperties[PatternStringExact]
      : Throw('Unable to get record value schema');
}
function FromRecordRight(left, right) {
  const [Key, Value] = [RecordKey(right), RecordValue(right)];
  return exports_type2.IsLiteralString(left) &&
    exports_type2.IsNumber(Key) &&
    IntoBooleanResult(Visit5(left, Value)) === ExtendsResult.True
    ? ExtendsResult.True
    : exports_type2.IsUint8Array(left) && exports_type2.IsNumber(Key)
      ? Visit5(left, Value)
      : exports_type2.IsString(left) && exports_type2.IsNumber(Key)
        ? Visit5(left, Value)
        : exports_type2.IsArray(left) && exports_type2.IsNumber(Key)
          ? Visit5(left, Value)
          : exports_type2.IsObject(left)
            ? (() => {
                for (const key of Object.getOwnPropertyNames(left.properties)) {
                  if (
                    Property(Value, left.properties[key]) ===
                    ExtendsResult.False
                  ) {
                    return ExtendsResult.False;
                  }
                }
                return ExtendsResult.True;
              })()
            : ExtendsResult.False;
}
function FromRecord2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : !exports_type2.IsRecord(right)
        ? ExtendsResult.False
        : Visit5(RecordValue(left), RecordValue(right));
}
function FromRegExp2(left, right) {
  const L = exports_type2.IsRegExp(left) ? String2() : left;
  const R = exports_type2.IsRegExp(right) ? String2() : right;
  return Visit5(L, R);
}
function FromStringRight(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsString(left.const)
    ? ExtendsResult.True
    : exports_type2.IsString(left)
      ? ExtendsResult.True
      : ExtendsResult.False;
}
function FromString2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : exports_type2.IsRecord(right)
        ? FromRecordRight(left, right)
        : exports_type2.IsString(right)
          ? ExtendsResult.True
          : ExtendsResult.False;
}
function FromSymbol2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : exports_type2.IsRecord(right)
        ? FromRecordRight(left, right)
        : exports_type2.IsSymbol(right)
          ? ExtendsResult.True
          : ExtendsResult.False;
}
function FromTemplateLiteral3(left, right) {
  return exports_type2.IsTemplateLiteral(left)
    ? Visit5(TemplateLiteralToUnion(left), right)
    : exports_type2.IsTemplateLiteral(right)
      ? Visit5(left, TemplateLiteralToUnion(right))
      : Throw('Invalid fallthrough for TemplateLiteral');
}
function IsArrayOfTuple(left, right) {
  return (
    exports_type2.IsArray(right) &&
    left.items !== undefined &&
    left.items.every(
      (schema) => Visit5(schema, right.items) === ExtendsResult.True
    )
  );
}
function FromTupleRight(left, right) {
  return exports_type2.IsNever(left)
    ? ExtendsResult.True
    : exports_type2.IsUnknown(left)
      ? ExtendsResult.False
      : exports_type2.IsAny(left)
        ? ExtendsResult.Union
        : ExtendsResult.False;
}
function FromTuple4(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right) && IsObjectArrayLike(right)
      ? ExtendsResult.True
      : exports_type2.IsArray(right) && IsArrayOfTuple(left, right)
        ? ExtendsResult.True
        : !exports_type2.IsTuple(right)
          ? ExtendsResult.False
          : (exports_value.IsUndefined(left.items) &&
                !exports_value.IsUndefined(right.items)) ||
              (!exports_value.IsUndefined(left.items) &&
                exports_value.IsUndefined(right.items))
            ? ExtendsResult.False
            : exports_value.IsUndefined(left.items) &&
                !exports_value.IsUndefined(right.items)
              ? ExtendsResult.True
              : left.items.every(
                    (schema, index) =>
                      Visit5(schema, right.items[index]) === ExtendsResult.True
                  )
                ? ExtendsResult.True
                : ExtendsResult.False;
}
function FromUint8Array2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : exports_type2.IsRecord(right)
        ? FromRecordRight(left, right)
        : exports_type2.IsUint8Array(right)
          ? ExtendsResult.True
          : ExtendsResult.False;
}
function FromUndefined2(left, right) {
  return IsStructuralRight(right)
    ? StructuralRight(left, right)
    : exports_type2.IsObject(right)
      ? FromObjectRight(left, right)
      : exports_type2.IsRecord(right)
        ? FromRecordRight(left, right)
        : exports_type2.IsVoid(right)
          ? FromVoidRight(left, right)
          : exports_type2.IsUndefined(right)
            ? ExtendsResult.True
            : ExtendsResult.False;
}
function FromUnionRight(left, right) {
  return right.anyOf.some(
    (schema) => Visit5(left, schema) === ExtendsResult.True
  )
    ? ExtendsResult.True
    : ExtendsResult.False;
}
function FromUnion6(left, right) {
  return left.anyOf.every(
    (schema) => Visit5(schema, right) === ExtendsResult.True
  )
    ? ExtendsResult.True
    : ExtendsResult.False;
}
function FromUnknownRight(left, right) {
  return ExtendsResult.True;
}
function FromUnknown2(left, right) {
  return exports_type2.IsNever(right)
    ? FromNeverRight(left, right)
    : exports_type2.IsIntersect(right)
      ? FromIntersectRight(left, right)
      : exports_type2.IsUnion(right)
        ? FromUnionRight(left, right)
        : exports_type2.IsAny(right)
          ? FromAnyRight(left, right)
          : exports_type2.IsString(right)
            ? FromStringRight(left, right)
            : exports_type2.IsNumber(right)
              ? FromNumberRight(left, right)
              : exports_type2.IsInteger(right)
                ? FromIntegerRight(left, right)
                : exports_type2.IsBoolean(right)
                  ? FromBooleanRight(left, right)
                  : exports_type2.IsArray(right)
                    ? FromArrayRight(left, right)
                    : exports_type2.IsTuple(right)
                      ? FromTupleRight(left, right)
                      : exports_type2.IsObject(right)
                        ? FromObjectRight(left, right)
                        : exports_type2.IsUnknown(right)
                          ? ExtendsResult.True
                          : ExtendsResult.False;
}
function FromVoidRight(left, right) {
  return exports_type2.IsUndefined(left)
    ? ExtendsResult.True
    : exports_type2.IsUndefined(left)
      ? ExtendsResult.True
      : ExtendsResult.False;
}
function FromVoid2(left, right) {
  return exports_type2.IsIntersect(right)
    ? FromIntersectRight(left, right)
    : exports_type2.IsUnion(right)
      ? FromUnionRight(left, right)
      : exports_type2.IsUnknown(right)
        ? FromUnknownRight(left, right)
        : exports_type2.IsAny(right)
          ? FromAnyRight(left, right)
          : exports_type2.IsObject(right)
            ? FromObjectRight(left, right)
            : exports_type2.IsVoid(right)
              ? ExtendsResult.True
              : ExtendsResult.False;
}
function Visit5(left, right) {
  return exports_type2.IsTemplateLiteral(left) ||
    exports_type2.IsTemplateLiteral(right)
    ? FromTemplateLiteral3(left, right)
    : exports_type2.IsRegExp(left) || exports_type2.IsRegExp(right)
      ? FromRegExp2(left, right)
      : exports_type2.IsNot(left) || exports_type2.IsNot(right)
        ? FromNot2(left, right)
        : exports_type2.IsAny(left)
          ? FromAny2(left, right)
          : exports_type2.IsArray(left)
            ? FromArray4(left, right)
            : exports_type2.IsBigInt(left)
              ? FromBigInt2(left, right)
              : exports_type2.IsBoolean(left)
                ? FromBoolean2(left, right)
                : exports_type2.IsAsyncIterator(left)
                  ? FromAsyncIterator2(left, right)
                  : exports_type2.IsConstructor(left)
                    ? FromConstructor2(left, right)
                    : exports_type2.IsDate(left)
                      ? FromDate2(left, right)
                      : exports_type2.IsFunction(left)
                        ? FromFunction2(left, right)
                        : exports_type2.IsInteger(left)
                          ? FromInteger2(left, right)
                          : exports_type2.IsIntersect(left)
                            ? FromIntersect4(left, right)
                            : exports_type2.IsIterator(left)
                              ? FromIterator2(left, right)
                              : exports_type2.IsLiteral(left)
                                ? FromLiteral3(left, right)
                                : exports_type2.IsNever(left)
                                  ? FromNever2(left, right)
                                  : exports_type2.IsNull(left)
                                    ? FromNull2(left, right)
                                    : exports_type2.IsNumber(left)
                                      ? FromNumber2(left, right)
                                      : exports_type2.IsObject(left)
                                        ? FromObject2(left, right)
                                        : exports_type2.IsRecord(left)
                                          ? FromRecord2(left, right)
                                          : exports_type2.IsString(left)
                                            ? FromString2(left, right)
                                            : exports_type2.IsSymbol(left)
                                              ? FromSymbol2(left, right)
                                              : exports_type2.IsTuple(left)
                                                ? FromTuple4(left, right)
                                                : exports_type2.IsPromise(left)
                                                  ? FromPromise2(left, right)
                                                  : exports_type2.IsUint8Array(
                                                        left
                                                      )
                                                    ? FromUint8Array2(
                                                        left,
                                                        right
                                                      )
                                                    : exports_type2.IsUndefined(
                                                          left
                                                        )
                                                      ? FromUndefined2(
                                                          left,
                                                          right
                                                        )
                                                      : exports_type2.IsUnion(
                                                            left
                                                          )
                                                        ? FromUnion6(
                                                            left,
                                                            right
                                                          )
                                                        : exports_type2.IsUnknown(
                                                              left
                                                            )
                                                          ? FromUnknown2(
                                                              left,
                                                              right
                                                            )
                                                          : exports_type2.IsVoid(
                                                                left
                                                              )
                                                            ? FromVoid2(
                                                                left,
                                                                right
                                                              )
                                                            : Throw(
                                                                `Unknown left type operand '${left[Kind]}'`
                                                              );
}
function ExtendsCheck(left, right) {
  return Visit5(left, right);
}

class ExtendsResolverError extends TypeBoxError {}
var ExtendsResult;
(function (ExtendsResult2) {
  ExtendsResult2[(ExtendsResult2['Union'] = 0)] = 'Union';
  ExtendsResult2[(ExtendsResult2['True'] = 1)] = 'True';
  ExtendsResult2[(ExtendsResult2['False'] = 2)] = 'False';
})(ExtendsResult || (ExtendsResult = {}));
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-result.mjs
function FromProperties7(P, Right, True, False, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extends(P[K2], Right, True, False, options);
  return Acc;
}
function FromMappedResult6(Left, Right, True, False, options) {
  return FromProperties7(Left.properties, Right, True, False, options);
}
function ExtendsFromMappedResult(Left, Right, True, False, options) {
  const P = FromMappedResult6(Left, Right, True, False, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends.mjs
function ExtendsResolve(left, right, trueType, falseType) {
  const R = ExtendsCheck(left, right);
  return R === ExtendsResult.Union
    ? Union([trueType, falseType])
    : R === ExtendsResult.True
      ? trueType
      : falseType;
}
function Extends(L, R, T, F, options = {}) {
  return IsMappedResult(L)
    ? ExtendsFromMappedResult(L, R, T, F, options)
    : IsMappedKey(L)
      ? CloneType(ExtendsFromMappedKey(L, R, T, F, options))
      : CloneType(ExtendsResolve(L, R, T, F), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-key.mjs
function FromPropertyKey(K, U, L, R, options) {
  return {
    [K]: Extends(Literal(K), U, L, R, options),
  };
}
function FromPropertyKeys(K, U, L, R, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey(LK, U, L, R, options) };
  }, {});
}
function FromMappedKey2(K, U, L, R, options) {
  return FromPropertyKeys(K.keys, U, L, R, options);
}
function ExtendsFromMappedKey(T, U, L, R, options) {
  const P = FromMappedKey2(T, U, L, R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/value/check/check.mjs
function IsAnyOrUnknown(schema) {
  return schema[Kind] === 'Any' || schema[Kind] === 'Unknown';
}
function IsDefined2(value3) {
  return value3 !== undefined;
}
function FromAny3(schema, references, value3) {
  return true;
}
function FromArray5(schema, references, value3) {
  if (!IsArray(value3)) return false;
  if (IsDefined2(schema.minItems) && !(value3.length >= schema.minItems)) {
    return false;
  }
  if (IsDefined2(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    return false;
  }
  if (!value3.every((value4) => Visit6(schema.items, references, value4))) {
    return false;
  }
  if (
    schema.uniqueItems === true &&
    !(function () {
      const set2 = new Set();
      for (const element of value3) {
        const hashed = Hash(element);
        if (set2.has(hashed)) {
          return false;
        } else {
          set2.add(hashed);
        }
      }
      return true;
    })()
  ) {
    return false;
  }
  if (
    !(
      IsDefined2(schema.contains) ||
      IsNumber(schema.minContains) ||
      IsNumber(schema.maxContains)
    )
  ) {
    return true;
  }
  const containsSchema = IsDefined2(schema.contains)
    ? schema.contains
    : Never();
  const containsCount = value3.reduce(
    (acc, value4) =>
      Visit6(containsSchema, references, value4) ? acc + 1 : acc,
    0
  );
  if (containsCount === 0) {
    return false;
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    return false;
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    return false;
  }
  return true;
}
function FromAsyncIterator3(schema, references, value3) {
  return IsAsyncIterator(value3);
}
function FromBigInt3(schema, references, value3) {
  if (!IsBigInt(value3)) return false;
  if (
    IsDefined2(schema.exclusiveMaximum) &&
    !(value3 < schema.exclusiveMaximum)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.exclusiveMinimum) &&
    !(value3 > schema.exclusiveMinimum)
  ) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (
    IsDefined2(schema.multipleOf) &&
    !(value3 % schema.multipleOf === BigInt(0))
  ) {
    return false;
  }
  return true;
}
function FromBoolean3(schema, references, value3) {
  return IsBoolean(value3);
}
function FromConstructor3(schema, references, value3) {
  return Visit6(schema.returns, references, value3.prototype);
}
function FromDate3(schema, references, value3) {
  if (!IsDate(value3)) return false;
  if (
    IsDefined2(schema.exclusiveMaximumTimestamp) &&
    !(value3.getTime() < schema.exclusiveMaximumTimestamp)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.exclusiveMinimumTimestamp) &&
    !(value3.getTime() > schema.exclusiveMinimumTimestamp)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.maximumTimestamp) &&
    !(value3.getTime() <= schema.maximumTimestamp)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.minimumTimestamp) &&
    !(value3.getTime() >= schema.minimumTimestamp)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.multipleOfTimestamp) &&
    !(value3.getTime() % schema.multipleOfTimestamp === 0)
  ) {
    return false;
  }
  return true;
}
function FromFunction3(schema, references, value3) {
  return IsFunction(value3);
}
function FromInteger3(schema, references, value3) {
  if (!IsInteger(value3)) {
    return false;
  }
  if (
    IsDefined2(schema.exclusiveMaximum) &&
    !(value3 < schema.exclusiveMaximum)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.exclusiveMinimum) &&
    !(value3 > schema.exclusiveMinimum)
  ) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
}
function FromIntersect5(schema, references, value3) {
  const check1 = schema.allOf.every((schema2) =>
    Visit6(schema2, references, value3)
  );
  if (schema.unevaluatedProperties === false) {
    const keyPattern = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every((key) =>
      keyPattern.test(key)
    );
    return check1 && check2;
  } else if (IsSchema2(schema.unevaluatedProperties)) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every(
      (key) =>
        keyCheck.test(key) ||
        Visit6(schema.unevaluatedProperties, references, value3[key])
    );
    return check1 && check2;
  } else {
    return check1;
  }
}
function FromIterator3(schema, references, value3) {
  return IsIterator(value3);
}
function FromLiteral4(schema, references, value3) {
  return value3 === schema.const;
}
function FromNever3(schema, references, value3) {
  return false;
}
function FromNot3(schema, references, value3) {
  return !Visit6(schema.not, references, value3);
}
function FromNull3(schema, references, value3) {
  return IsNull(value3);
}
function FromNumber3(schema, references, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3)) return false;
  if (
    IsDefined2(schema.exclusiveMaximum) &&
    !(value3 < schema.exclusiveMaximum)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.exclusiveMinimum) &&
    !(value3 > schema.exclusiveMinimum)
  ) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
}
function FromObject3(schema, references, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3)) return false;
  if (
    IsDefined2(schema.minProperties) &&
    !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.maxProperties) &&
    !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)
  ) {
    return false;
  }
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      if (!Visit6(property, references, value3[knownKey])) {
        return false;
      }
      if (
        (ExtendsUndefinedCheck(property) || IsAnyOrUnknown(property)) &&
        !(knownKey in value3)
      ) {
        return false;
      }
    } else {
      if (
        TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey) &&
        !Visit6(property, references, value3[knownKey])
      ) {
        return false;
      }
    }
  }
  if (schema.additionalProperties === false) {
    const valueKeys = Object.getOwnPropertyNames(value3);
    if (
      schema.required &&
      schema.required.length === knownKeys.length &&
      valueKeys.length === knownKeys.length
    ) {
      return true;
    } else {
      return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
    }
  } else if (typeof schema.additionalProperties === 'object') {
    const valueKeys = Object.getOwnPropertyNames(value3);
    return valueKeys.every(
      (key) =>
        knownKeys.includes(key) ||
        Visit6(schema.additionalProperties, references, value3[key])
    );
  } else {
    return true;
  }
}
function FromPromise3(schema, references, value3) {
  return IsPromise(value3);
}
function FromRecord3(schema, references, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3)) {
    return false;
  }
  if (
    IsDefined2(schema.minProperties) &&
    !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.maxProperties) &&
    !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)
  ) {
    return false;
  }
  const [patternKey, patternSchema] = Object.entries(
    schema.patternProperties
  )[0];
  const regex = new RegExp(patternKey);
  const check1 = Object.entries(value3).every(([key, value4]) => {
    return regex.test(key) ? Visit6(patternSchema, references, value4) : true;
  });
  const check2 =
    typeof schema.additionalProperties === 'object'
      ? Object.entries(value3).every(([key, value4]) => {
          return !regex.test(key)
            ? Visit6(schema.additionalProperties, references, value4)
            : true;
        })
      : true;
  const check3 =
    schema.additionalProperties === false
      ? Object.getOwnPropertyNames(value3).every((key) => {
          return regex.test(key);
        })
      : true;
  return check1 && check2 && check3;
}
function FromRef2(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
}
function FromRegExp3(schema, references, value3) {
  const regex = new RegExp(schema.source, schema.flags);
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength)) return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength)) return false;
  }
  return regex.test(value3);
}
function FromString3(schema, references, value3) {
  if (!IsString(value3)) {
    return false;
  }
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength)) return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength)) return false;
  }
  if (IsDefined2(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3)) return false;
  }
  if (IsDefined2(schema.format)) {
    if (!exports_format.Has(schema.format)) return false;
    const func = exports_format.Get(schema.format);
    return func(value3);
  }
  return true;
}
function FromSymbol3(schema, references, value3) {
  return IsSymbol(value3);
}
function FromTemplateLiteral4(schema, references, value3) {
  return IsString(value3) && new RegExp(schema.pattern).test(value3);
}
function FromThis2(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
}
function FromTuple5(schema, references, value3) {
  if (!IsArray(value3)) {
    return false;
  }
  if (schema.items === undefined && !(value3.length === 0)) {
    return false;
  }
  if (!(value3.length === schema.maxItems)) {
    return false;
  }
  if (!schema.items) {
    return true;
  }
  for (let i = 0; i < schema.items.length; i++) {
    if (!Visit6(schema.items[i], references, value3[i])) return false;
  }
  return true;
}
function FromUndefined3(schema, references, value3) {
  return IsUndefined(value3);
}
function FromUnion7(schema, references, value3) {
  return schema.anyOf.some((inner) => Visit6(inner, references, value3));
}
function FromUint8Array3(schema, references, value3) {
  if (!IsUint8Array(value3)) {
    return false;
  }
  if (
    IsDefined2(schema.maxByteLength) &&
    !(value3.length <= schema.maxByteLength)
  ) {
    return false;
  }
  if (
    IsDefined2(schema.minByteLength) &&
    !(value3.length >= schema.minByteLength)
  ) {
    return false;
  }
  return true;
}
function FromUnknown3(schema, references, value3) {
  return true;
}
function FromVoid3(schema, references, value3) {
  return TypeSystemPolicy.IsVoidLike(value3);
}
function FromKind2(schema, references, value3) {
  if (!exports_type.Has(schema[Kind])) return false;
  const func = exports_type.Get(schema[Kind]);
  return func(schema, value3);
}
function Visit6(schema, references, value3) {
  const references_ = IsDefined2(schema.$id)
    ? [...references, schema]
    : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case 'Any':
      return FromAny3(schema_, references_, value3);
    case 'Array':
      return FromArray5(schema_, references_, value3);
    case 'AsyncIterator':
      return FromAsyncIterator3(schema_, references_, value3);
    case 'BigInt':
      return FromBigInt3(schema_, references_, value3);
    case 'Boolean':
      return FromBoolean3(schema_, references_, value3);
    case 'Constructor':
      return FromConstructor3(schema_, references_, value3);
    case 'Date':
      return FromDate3(schema_, references_, value3);
    case 'Function':
      return FromFunction3(schema_, references_, value3);
    case 'Integer':
      return FromInteger3(schema_, references_, value3);
    case 'Intersect':
      return FromIntersect5(schema_, references_, value3);
    case 'Iterator':
      return FromIterator3(schema_, references_, value3);
    case 'Literal':
      return FromLiteral4(schema_, references_, value3);
    case 'Never':
      return FromNever3(schema_, references_, value3);
    case 'Not':
      return FromNot3(schema_, references_, value3);
    case 'Null':
      return FromNull3(schema_, references_, value3);
    case 'Number':
      return FromNumber3(schema_, references_, value3);
    case 'Object':
      return FromObject3(schema_, references_, value3);
    case 'Promise':
      return FromPromise3(schema_, references_, value3);
    case 'Record':
      return FromRecord3(schema_, references_, value3);
    case 'Ref':
      return FromRef2(schema_, references_, value3);
    case 'RegExp':
      return FromRegExp3(schema_, references_, value3);
    case 'String':
      return FromString3(schema_, references_, value3);
    case 'Symbol':
      return FromSymbol3(schema_, references_, value3);
    case 'TemplateLiteral':
      return FromTemplateLiteral4(schema_, references_, value3);
    case 'This':
      return FromThis2(schema_, references_, value3);
    case 'Tuple':
      return FromTuple5(schema_, references_, value3);
    case 'Undefined':
      return FromUndefined3(schema_, references_, value3);
    case 'Union':
      return FromUnion7(schema_, references_, value3);
    case 'Uint8Array':
      return FromUint8Array3(schema_, references_, value3);
    case 'Unknown':
      return FromUnknown3(schema_, references_, value3);
    case 'Void':
      return FromVoid3(schema_, references_, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCheckUnknownTypeError(schema_);
      return FromKind2(schema_, references_, value3);
  }
}
function Check(...args) {
  return args.length === 3
    ? Visit6(args[0], args[1], args[2])
    : Visit6(args[0], [], args[1]);
}

class ValueCheckUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super(`Unknown type`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/clone/clone.mjs
function ObjectType3(value3) {
  const Acc = {};
  for (const key of Object.getOwnPropertyNames(value3)) {
    Acc[key] = Clone2(value3[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value3)) {
    Acc[key] = Clone2(value3[key]);
  }
  return Acc;
}
function ArrayType3(value3) {
  return value3.map((element) => Clone2(element));
}
function TypedArrayType(value3) {
  return value3.slice();
}
function DateType3(value3) {
  return new Date(value3.toISOString());
}
function ValueType(value3) {
  return value3;
}
function Clone2(value3) {
  if (IsArray(value3)) return ArrayType3(value3);
  if (IsDate(value3)) return DateType3(value3);
  if (IsStandardObject(value3)) return ObjectType3(value3);
  if (IsTypedArray(value3)) return TypedArrayType(value3);
  if (IsValueType(value3)) return ValueType(value3);
  throw new Error('ValueClone: Unable to clone value');
}
// node_modules/@sinclair/typebox/build/esm/value/create/create.mjs
function FromDefault(value3) {
  return typeof value3 === 'function' ? value3 : Clone2(value3);
}
function FromAny4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
}
function FromArray6(schema, references) {
  if (schema.uniqueItems === true && !HasPropertyKey(schema, 'default')) {
    throw new ValueCreateError(
      schema,
      'Array with the uniqueItems constraint requires a default value'
    );
  } else if ('contains' in schema && !HasPropertyKey(schema, 'default')) {
    throw new ValueCreateError(
      schema,
      'Array with the contains constraint requires a default value'
    );
  } else if ('default' in schema) {
    return FromDefault(schema.default);
  } else if (schema.minItems !== undefined) {
    return Array.from({ length: schema.minItems }).map((item) => {
      return Visit7(schema.items, references);
    });
  } else {
    return [];
  }
}
function FromAsyncIterator4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return (async function* () {})();
  }
}
function FromBigInt4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return BigInt(0);
  }
}
function FromBoolean4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return false;
  }
}
function FromConstructor4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    const value3 = Visit7(schema.returns, references);
    if (typeof value3 === 'object' && !Array.isArray(value3)) {
      return class {
        constructor() {
          for (const [key, val] of Object.entries(value3)) {
            const self = this;
            self[key] = val;
          }
        }
      };
    } else {
      return class {};
    }
  }
}
function FromDate4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else if (schema.minimumTimestamp !== undefined) {
    return new Date(schema.minimumTimestamp);
  } else {
    return new Date();
  }
}
function FromFunction4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return () => Visit7(schema.returns, references);
  }
}
function FromInteger4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
}
function FromIntersect6(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    const value3 = schema.allOf.reduce((acc, schema2) => {
      const next = Visit7(schema2, references);
      return typeof next === 'object' ? { ...acc, ...next } : next;
    }, {});
    if (!Check(schema, references, value3))
      throw new ValueCreateError(
        schema,
        'Intersect produced invalid value. Consider using a default value.'
      );
    return value3;
  }
}
function FromIterator4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return (function* () {})();
  }
}
function FromLiteral5(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return schema.const;
  }
}
function FromNever4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(
      schema,
      'Never types cannot be created. Consider using a default value.'
    );
  }
}
function FromNot4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, 'Not types must have a default value');
  }
}
function FromNull4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return null;
  }
}
function FromNumber4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
}
function FromObject4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    const required = new Set(schema.required);
    const Acc = {};
    for (const [key, subschema] of Object.entries(schema.properties)) {
      if (!required.has(key)) continue;
      Acc[key] = Visit7(subschema, references);
    }
    return Acc;
  }
}
function FromPromise4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return Promise.resolve(Visit7(schema.item, references));
  }
}
function FromRecord4(schema, references) {
  const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else if (
    !(keyPattern === PatternStringExact || keyPattern === PatternNumberExact)
  ) {
    const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split('|');
    const Acc = {};
    for (const key of propertyKeys) Acc[key] = Visit7(valueSchema, references);
    return Acc;
  } else {
    return {};
  }
}
function FromRef3(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
}
function FromRegExp4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(
      schema,
      'RegExp types cannot be created. Consider using a default value.'
    );
  }
}
function FromString4(schema, references) {
  if (schema.pattern !== undefined) {
    if (!HasPropertyKey(schema, 'default')) {
      throw new ValueCreateError(
        schema,
        'String types with patterns must specify a default value'
      );
    } else {
      return FromDefault(schema.default);
    }
  } else if (schema.format !== undefined) {
    if (!HasPropertyKey(schema, 'default')) {
      throw new ValueCreateError(
        schema,
        'String types with formats must specify a default value'
      );
    } else {
      return FromDefault(schema.default);
    }
  } else {
    if (HasPropertyKey(schema, 'default')) {
      return FromDefault(schema.default);
    } else if (schema.minLength !== undefined) {
      return Array.from({ length: schema.minLength })
        .map(() => ' ')
        .join('');
    } else {
      return '';
    }
  }
}
function FromSymbol4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else if ('value' in schema) {
    return Symbol.for(schema.value);
  } else {
    return Symbol();
  }
}
function FromTemplateLiteral5(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  }
  if (!IsTemplateLiteralFinite(schema))
    throw new ValueCreateError(
      schema,
      'Can only create template literals that produce a finite variants. Consider using a default value.'
    );
  const generated = TemplateLiteralGenerate(schema);
  return generated[0];
}
function FromThis3(schema, references) {
  if (recursiveDepth++ > recursiveMaxDepth)
    throw new ValueCreateError(
      schema,
      'Cannot create recursive type as it appears possibly infinite. Consider using a default.'
    );
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
}
function FromTuple6(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  }
  if (schema.items === undefined) {
    return [];
  } else {
    return Array.from({ length: schema.minItems }).map((_, index) =>
      Visit7(schema.items[index], references)
    );
  }
}
function FromUndefined4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return;
  }
}
function FromUnion8(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else if (schema.anyOf.length === 0) {
    throw new Error(
      'ValueCreate.Union: Cannot create Union with zero variants'
    );
  } else {
    return Visit7(schema.anyOf[0], references);
  }
}
function FromUint8Array4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else if (schema.minByteLength !== undefined) {
    return new Uint8Array(schema.minByteLength);
  } else {
    return new Uint8Array(0);
  }
}
function FromUnknown4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
}
function FromVoid4(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    return;
  }
}
function FromKind3(schema, references) {
  if (HasPropertyKey(schema, 'default')) {
    return FromDefault(schema.default);
  } else {
    throw new Error('User defined types must specify a default value');
  }
}
function Visit7(schema, references) {
  const references_ = IsString(schema.$id)
    ? [...references, schema]
    : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case 'Any':
      return FromAny4(schema_, references_);
    case 'Array':
      return FromArray6(schema_, references_);
    case 'AsyncIterator':
      return FromAsyncIterator4(schema_, references_);
    case 'BigInt':
      return FromBigInt4(schema_, references_);
    case 'Boolean':
      return FromBoolean4(schema_, references_);
    case 'Constructor':
      return FromConstructor4(schema_, references_);
    case 'Date':
      return FromDate4(schema_, references_);
    case 'Function':
      return FromFunction4(schema_, references_);
    case 'Integer':
      return FromInteger4(schema_, references_);
    case 'Intersect':
      return FromIntersect6(schema_, references_);
    case 'Iterator':
      return FromIterator4(schema_, references_);
    case 'Literal':
      return FromLiteral5(schema_, references_);
    case 'Never':
      return FromNever4(schema_, references_);
    case 'Not':
      return FromNot4(schema_, references_);
    case 'Null':
      return FromNull4(schema_, references_);
    case 'Number':
      return FromNumber4(schema_, references_);
    case 'Object':
      return FromObject4(schema_, references_);
    case 'Promise':
      return FromPromise4(schema_, references_);
    case 'Record':
      return FromRecord4(schema_, references_);
    case 'Ref':
      return FromRef3(schema_, references_);
    case 'RegExp':
      return FromRegExp4(schema_, references_);
    case 'String':
      return FromString4(schema_, references_);
    case 'Symbol':
      return FromSymbol4(schema_, references_);
    case 'TemplateLiteral':
      return FromTemplateLiteral5(schema_, references_);
    case 'This':
      return FromThis3(schema_, references_);
    case 'Tuple':
      return FromTuple6(schema_, references_);
    case 'Undefined':
      return FromUndefined4(schema_, references_);
    case 'Union':
      return FromUnion8(schema_, references_);
    case 'Uint8Array':
      return FromUint8Array4(schema_, references_);
    case 'Unknown':
      return FromUnknown4(schema_, references_);
    case 'Void':
      return FromVoid4(schema_, references_);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCreateError(schema_, 'Unknown type');
      return FromKind3(schema_, references_);
  }
}
function Create2(...args) {
  recursiveDepth = 0;
  return args.length === 2 ? Visit7(args[0], args[1]) : Visit7(args[0], []);
}

class ValueCreateError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
var recursiveMaxDepth = 512;
var recursiveDepth = 0;
// node_modules/@sinclair/typebox/build/esm/value/cast/cast.mjs
function ScoreUnion(schema, references, value3) {
  if (
    schema[Kind] === 'Object' &&
    typeof value3 === 'object' &&
    !IsNull(value3)
  ) {
    const object3 = schema;
    const keys = Object.getOwnPropertyNames(value3);
    const entries = Object.entries(object3.properties);
    const [point, max] = [1 / entries.length, entries.length];
    return entries.reduce((acc, [key, schema2]) => {
      const literal7 =
        schema2[Kind] === 'Literal' && schema2.const === value3[key] ? max : 0;
      const checks = Check(schema2, references, value3[key]) ? point : 0;
      const exists = keys.includes(key) ? point : 0;
      return acc + (literal7 + checks + exists);
    }, 0);
  } else {
    return Check(schema, references, value3) ? 1 : 0;
  }
}
function SelectUnion(union9, references, value3) {
  const schemas = union9.anyOf.map((schema) => Deref(schema, references));
  let [select, best] = [schemas[0], 0];
  for (const schema of schemas) {
    const score = ScoreUnion(schema, references, value3);
    if (score > best) {
      select = schema;
      best = score;
    }
  }
  return select;
}
function CastUnion(union9, references, value3) {
  if ('default' in union9) {
    return typeof value3 === 'function'
      ? union9.default
      : Clone2(union9.default);
  } else {
    const schema = SelectUnion(union9, references, value3);
    return Cast(schema, references, value3);
  }
}
function DefaultClone(schema, references, value3) {
  return Check(schema, references, value3)
    ? Clone2(value3)
    : Create2(schema, references);
}
function Default(schema, references, value3) {
  return Check(schema, references, value3)
    ? value3
    : Create2(schema, references);
}
function FromArray7(schema, references, value3) {
  if (Check(schema, references, value3)) return Clone2(value3);
  const created = IsArray(value3)
    ? Clone2(value3)
    : Create2(schema, references);
  const minimum =
    IsNumber(schema.minItems) && created.length < schema.minItems
      ? [
          ...created,
          ...Array.from(
            { length: schema.minItems - created.length },
            () => null
          ),
        ]
      : created;
  const maximum =
    IsNumber(schema.maxItems) && minimum.length > schema.maxItems
      ? minimum.slice(0, schema.maxItems)
      : minimum;
  const casted = maximum.map((value4) =>
    Visit8(schema.items, references, value4)
  );
  if (schema.uniqueItems !== true) return casted;
  const unique = [...new Set(casted)];
  if (!Check(schema, references, unique))
    throw new ValueCastError(
      schema,
      'Array cast produced invalid data due to uniqueItems constraint'
    );
  return unique;
}
function FromConstructor5(schema, references, value3) {
  if (Check(schema, references, value3)) return Create2(schema, references);
  const required = new Set(schema.returns.required || []);
  const result = function () {};
  for (const [key, property] of Object.entries(schema.returns.properties)) {
    if (!required.has(key) && value3.prototype[key] === undefined) continue;
    result.prototype[key] = Visit8(property, references, value3.prototype[key]);
  }
  return result;
}
function FromIntersect7(schema, references, value3) {
  const created = Create2(schema, references);
  const mapped9 =
    IsStandardObject(created) && IsStandardObject(value3)
      ? { ...created, ...value3 }
      : value3;
  return Check(schema, references, mapped9)
    ? mapped9
    : Create2(schema, references);
}
function FromNever5(schema, references, value3) {
  throw new ValueCastError(schema, 'Never types cannot be cast');
}
function FromObject5(schema, references, value3) {
  if (Check(schema, references, value3)) return value3;
  if (value3 === null || typeof value3 !== 'object')
    return Create2(schema, references);
  const required = new Set(schema.required || []);
  const result = {};
  for (const [key, property] of Object.entries(schema.properties)) {
    if (!required.has(key) && value3[key] === undefined) continue;
    result[key] = Visit8(property, references, value3[key]);
  }
  if (typeof schema.additionalProperties === 'object') {
    const propertyNames = Object.getOwnPropertyNames(schema.properties);
    for (const propertyName of Object.getOwnPropertyNames(value3)) {
      if (propertyNames.includes(propertyName)) continue;
      result[propertyName] = Visit8(
        schema.additionalProperties,
        references,
        value3[propertyName]
      );
    }
  }
  return result;
}
function FromRecord5(schema, references, value3) {
  if (Check(schema, references, value3)) return Clone2(value3);
  if (
    value3 === null ||
    typeof value3 !== 'object' ||
    Array.isArray(value3) ||
    value3 instanceof Date
  )
    return Create2(schema, references);
  const subschemaPropertyName = Object.getOwnPropertyNames(
    schema.patternProperties
  )[0];
  const subschema = schema.patternProperties[subschemaPropertyName];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit8(subschema, references, propValue);
  }
  return result;
}
function FromRef4(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
}
function FromThis4(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
}
function FromTuple7(schema, references, value3) {
  if (Check(schema, references, value3)) return Clone2(value3);
  if (!IsArray(value3)) return Create2(schema, references);
  if (schema.items === undefined) return [];
  return schema.items.map((schema2, index) =>
    Visit8(schema2, references, value3[index])
  );
}
function FromUnion9(schema, references, value3) {
  return Check(schema, references, value3)
    ? Clone2(value3)
    : CastUnion(schema, references, value3);
}
function Visit8(schema, references, value3) {
  const references_ = IsString(schema.$id)
    ? [...references, schema]
    : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case 'Array':
      return FromArray7(schema_, references_, value3);
    case 'Constructor':
      return FromConstructor5(schema_, references_, value3);
    case 'Intersect':
      return FromIntersect7(schema_, references_, value3);
    case 'Never':
      return FromNever5(schema_, references_, value3);
    case 'Object':
      return FromObject5(schema_, references_, value3);
    case 'Record':
      return FromRecord5(schema_, references_, value3);
    case 'Ref':
      return FromRef4(schema_, references_, value3);
    case 'This':
      return FromThis4(schema_, references_, value3);
    case 'Tuple':
      return FromTuple7(schema_, references_, value3);
    case 'Union':
      return FromUnion9(schema_, references_, value3);
    case 'Date':
    case 'Symbol':
    case 'Uint8Array':
      return DefaultClone(schema, references, value3);
    default:
      return Default(schema_, references_, value3);
  }
}
function Cast(...args) {
  return args.length === 3
    ? Visit8(args[0], args[1], args[2])
    : Visit8(args[0], [], args[1]);
}

class ValueCastError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/clean/clean.mjs
function IsCheckable(schema) {
  return IsSchema2(schema) && schema[Kind] !== 'Unsafe';
}
function FromArray8(schema, references, value3) {
  if (!IsArray(value3)) return value3;
  return value3.map((value4) => Visit9(schema.items, references, value4));
}
function FromIntersect8(schema, references, value3) {
  const unevaluatedProperties = schema.unevaluatedProperties;
  const intersections = schema.allOf.map((schema2) =>
    Visit9(schema2, references, Clone2(value3))
  );
  const composite = intersections.reduce(
    (acc, value4) => (IsObject(value4) ? { ...acc, ...value4 } : value4),
    {}
  );
  if (
    !IsObject(value3) ||
    !IsObject(composite) ||
    !IsSchema2(unevaluatedProperties)
  )
    return composite;
  const knownkeys = KeyOfPropertyKeys(schema);
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (knownkeys.includes(key)) continue;
    if (Check(unevaluatedProperties, references, value3[key])) {
      composite[key] = Visit9(unevaluatedProperties, references, value3[key]);
    }
  }
  return composite;
}
function FromObject6(schema, references, value3) {
  if (!IsObject(value3) || IsArray(value3)) return value3;
  const additionalProperties = schema.additionalProperties;
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (key in schema.properties) {
      value3[key] = Visit9(schema.properties[key], references, value3[key]);
      continue;
    }
    if (
      IsSchema2(additionalProperties) &&
      Check(additionalProperties, references, value3[key])
    ) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
}
function FromRecord6(schema, references, value3) {
  if (!IsObject(value3)) return value3;
  const additionalProperties = schema.additionalProperties;
  const propertyKeys = Object.getOwnPropertyNames(value3);
  const [propertyKey, propertySchema] = Object.entries(
    schema.patternProperties
  )[0];
  const propertyKeyTest = new RegExp(propertyKey);
  for (const key of propertyKeys) {
    if (propertyKeyTest.test(key)) {
      value3[key] = Visit9(propertySchema, references, value3[key]);
      continue;
    }
    if (
      IsSchema2(additionalProperties) &&
      Check(additionalProperties, references, value3[key])
    ) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
}
function FromRef5(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
}
function FromThis5(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
}
function FromTuple8(schema, references, value3) {
  if (!IsArray(value3)) return value3;
  if (IsUndefined(schema.items)) return [];
  const length = Math.min(value3.length, schema.items.length);
  for (let i = 0; i < length; i++) {
    value3[i] = Visit9(schema.items[i], references, value3[i]);
  }
  return value3.length > length ? value3.slice(0, length) : value3;
}
function FromUnion10(schema, references, value3) {
  for (const inner of schema.anyOf) {
    if (IsCheckable(inner) && Check(inner, references, value3)) {
      return Visit9(inner, references, value3);
    }
  }
  return value3;
}
function Visit9(schema, references, value3) {
  const references_ = IsString(schema.$id)
    ? [...references, schema]
    : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case 'Array':
      return FromArray8(schema_, references_, value3);
    case 'Intersect':
      return FromIntersect8(schema_, references_, value3);
    case 'Object':
      return FromObject6(schema_, references_, value3);
    case 'Record':
      return FromRecord6(schema_, references_, value3);
    case 'Ref':
      return FromRef5(schema_, references_, value3);
    case 'This':
      return FromThis5(schema_, references_, value3);
    case 'Tuple':
      return FromTuple8(schema_, references_, value3);
    case 'Union':
      return FromUnion10(schema_, references_, value3);
    default:
      return value3;
  }
}
function Clean(...args) {
  return args.length === 3
    ? Visit9(args[0], args[1], args[2])
    : Visit9(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/convert/convert.mjs
function IsStringNumeric(value3) {
  return IsString(value3) && !isNaN(value3) && !isNaN(parseFloat(value3));
}
function IsValueToString(value3) {
  return IsBigInt(value3) || IsBoolean(value3) || IsNumber(value3);
}
function IsValueTrue(value3) {
  return (
    value3 === true ||
    (IsNumber(value3) && value3 === 1) ||
    (IsBigInt(value3) && value3 === BigInt('1')) ||
    (IsString(value3) && (value3.toLowerCase() === 'true' || value3 === '1'))
  );
}
function IsValueFalse(value3) {
  return (
    value3 === false ||
    (IsNumber(value3) && (value3 === 0 || Object.is(value3, -0))) ||
    (IsBigInt(value3) && value3 === BigInt('0')) ||
    (IsString(value3) &&
      (value3.toLowerCase() === 'false' || value3 === '0' || value3 === '-0'))
  );
}
function IsTimeStringWithTimeZone(value3) {
  return (
    IsString(value3) &&
    /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(
      value3
    )
  );
}
function IsTimeStringWithoutTimeZone(value3) {
  return (
    IsString(value3) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value3)
  );
}
function IsDateTimeStringWithTimeZone(value3) {
  return (
    IsString(value3) &&
    /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(
      value3
    )
  );
}
function IsDateTimeStringWithoutTimeZone(value3) {
  return (
    IsString(value3) &&
    /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(
      value3
    )
  );
}
function IsDateString(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value3);
}
function TryConvertLiteralString(value3, target) {
  const conversion = TryConvertString(value3);
  return conversion === target ? conversion : value3;
}
function TryConvertLiteralNumber(value3, target) {
  const conversion = TryConvertNumber(value3);
  return conversion === target ? conversion : value3;
}
function TryConvertLiteralBoolean(value3, target) {
  const conversion = TryConvertBoolean(value3);
  return conversion === target ? conversion : value3;
}
function TryConvertLiteral(schema, value3) {
  return IsString(schema.const)
    ? TryConvertLiteralString(value3, schema.const)
    : IsNumber(schema.const)
      ? TryConvertLiteralNumber(value3, schema.const)
      : IsBoolean(schema.const)
        ? TryConvertLiteralBoolean(value3, schema.const)
        : Clone2(value3);
}
function TryConvertBoolean(value3) {
  return IsValueTrue(value3) ? true : IsValueFalse(value3) ? false : value3;
}
function TryConvertBigInt(value3) {
  return IsStringNumeric(value3)
    ? BigInt(parseInt(value3))
    : IsNumber(value3)
      ? BigInt(value3 | 0)
      : IsValueFalse(value3)
        ? BigInt(0)
        : IsValueTrue(value3)
          ? BigInt(1)
          : value3;
}
function TryConvertString(value3) {
  return IsValueToString(value3)
    ? value3.toString()
    : IsSymbol(value3) && value3.description !== undefined
      ? value3.description.toString()
      : value3;
}
function TryConvertNumber(value3) {
  return IsStringNumeric(value3)
    ? parseFloat(value3)
    : IsValueTrue(value3)
      ? 1
      : IsValueFalse(value3)
        ? 0
        : value3;
}
function TryConvertInteger(value3) {
  return IsStringNumeric(value3)
    ? parseInt(value3)
    : IsNumber(value3)
      ? value3 | 0
      : IsValueTrue(value3)
        ? 1
        : IsValueFalse(value3)
          ? 0
          : value3;
}
function TryConvertNull(value3) {
  return IsString(value3) && value3.toLowerCase() === 'null' ? null : value3;
}
function TryConvertUndefined(value3) {
  return IsString(value3) && value3 === 'undefined' ? undefined : value3;
}
function TryConvertDate(value3) {
  return IsDate(value3)
    ? value3
    : IsNumber(value3)
      ? new Date(value3)
      : IsValueTrue(value3)
        ? new Date(1)
        : IsValueFalse(value3)
          ? new Date(0)
          : IsStringNumeric(value3)
            ? new Date(parseInt(value3))
            : IsTimeStringWithoutTimeZone(value3)
              ? new Date(`1970-01-01T${value3}.000Z`)
              : IsTimeStringWithTimeZone(value3)
                ? new Date(`1970-01-01T${value3}`)
                : IsDateTimeStringWithoutTimeZone(value3)
                  ? new Date(`${value3}.000Z`)
                  : IsDateTimeStringWithTimeZone(value3)
                    ? new Date(value3)
                    : IsDateString(value3)
                      ? new Date(`${value3}T00:00:00.000Z`)
                      : value3;
}
function Default2(value3) {
  return value3;
}
function FromArray9(schema, references, value3) {
  const elements = IsArray(value3) ? value3 : [value3];
  return elements.map((element) => Visit10(schema.items, references, element));
}
function FromBigInt5(schema, references, value3) {
  return TryConvertBigInt(value3);
}
function FromBoolean5(schema, references, value3) {
  return TryConvertBoolean(value3);
}
function FromDate5(schema, references, value3) {
  return TryConvertDate(value3);
}
function FromInteger5(schema, references, value3) {
  return TryConvertInteger(value3);
}
function FromIntersect9(schema, references, value3) {
  return schema.allOf.reduce(
    (value4, schema2) => Visit10(schema2, references, value4),
    value3
  );
}
function FromLiteral6(schema, references, value3) {
  return TryConvertLiteral(schema, value3);
}
function FromNull5(schema, references, value3) {
  return TryConvertNull(value3);
}
function FromNumber5(schema, references, value3) {
  return TryConvertNumber(value3);
}
function FromObject7(schema, references, value3) {
  const isConvertable = IsObject(value3);
  if (!isConvertable) return value3;
  const result = {};
  for (const key of Object.keys(value3)) {
    result[key] = HasPropertyKey(schema.properties, key)
      ? Visit10(schema.properties[key], references, value3[key])
      : value3[key];
  }
  return result;
}
function FromRecord7(schema, references, value3) {
  const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[propertyKey];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit10(property, references, propValue);
  }
  return result;
}
function FromRef6(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
}
function FromString5(schema, references, value3) {
  return TryConvertString(value3);
}
function FromSymbol5(schema, references, value3) {
  return IsString(value3) || IsNumber(value3) ? Symbol(value3) : value3;
}
function FromThis6(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
}
function FromTuple9(schema, references, value3) {
  const isConvertable = IsArray(value3) && !IsUndefined(schema.items);
  if (!isConvertable) return value3;
  return value3.map((value4, index) => {
    return index < schema.items.length
      ? Visit10(schema.items[index], references, value4)
      : value4;
  });
}
function FromUndefined5(schema, references, value3) {
  return TryConvertUndefined(value3);
}
function FromUnion11(schema, references, value3) {
  for (const subschema of schema.anyOf) {
    const converted = Visit10(subschema, references, value3);
    if (!Check(subschema, references, converted)) continue;
    return converted;
  }
  return value3;
}
function Visit10(schema, references, value3) {
  const references_ = IsString(schema.$id)
    ? [...references, schema]
    : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case 'Array':
      return FromArray9(schema_, references_, value3);
    case 'BigInt':
      return FromBigInt5(schema_, references_, value3);
    case 'Boolean':
      return FromBoolean5(schema_, references_, value3);
    case 'Date':
      return FromDate5(schema_, references_, value3);
    case 'Integer':
      return FromInteger5(schema_, references_, value3);
    case 'Intersect':
      return FromIntersect9(schema_, references_, value3);
    case 'Literal':
      return FromLiteral6(schema_, references_, value3);
    case 'Null':
      return FromNull5(schema_, references_, value3);
    case 'Number':
      return FromNumber5(schema_, references_, value3);
    case 'Object':
      return FromObject7(schema_, references_, value3);
    case 'Record':
      return FromRecord7(schema_, references_, value3);
    case 'Ref':
      return FromRef6(schema_, references_, value3);
    case 'String':
      return FromString5(schema_, references_, value3);
    case 'Symbol':
      return FromSymbol5(schema_, references_, value3);
    case 'This':
      return FromThis6(schema_, references_, value3);
    case 'Tuple':
      return FromTuple9(schema_, references_, value3);
    case 'Undefined':
      return FromUndefined5(schema_, references_, value3);
    case 'Union':
      return FromUnion11(schema_, references_, value3);
    default:
      return Default2(value3);
  }
}
function Convert(...args) {
  return args.length === 3
    ? Visit10(args[0], args[1], args[2])
    : Visit10(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/default/default.mjs
function ValueOrDefault(schema, value3) {
  return value3 === undefined && 'default' in schema
    ? Clone2(schema.default)
    : value3;
}
function IsCheckable2(schema) {
  return IsSchema2(schema) && schema[Kind] !== 'Unsafe';
}
function IsDefaultSchema(value3) {
  return IsSchema2(value3) && 'default' in value3;
}
function FromArray10(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted)) return defaulted;
  for (let i = 0; i < defaulted.length; i++) {
    defaulted[i] = Visit11(schema.items, references, defaulted[i]);
  }
  return defaulted;
}
function FromIntersect10(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  return schema.allOf.reduce((acc, schema2) => {
    const next = Visit11(schema2, references, defaulted);
    return IsObject(next) ? { ...acc, ...next } : next;
  }, {});
}
function FromObject8(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted)) return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const knownPropertyKeys = Object.getOwnPropertyNames(schema.properties);
  for (const key of knownPropertyKeys) {
    if (!IsDefaultSchema(schema.properties[key])) continue;
    defaulted[key] = Visit11(
      schema.properties[key],
      references,
      defaulted[key]
    );
  }
  if (!IsDefaultSchema(additionalPropertiesSchema)) return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKeys.includes(key)) continue;
    defaulted[key] = Visit11(
      additionalPropertiesSchema,
      references,
      defaulted[key]
    );
  }
  return defaulted;
}
function FromRecord8(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted)) return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const [propertyKeyPattern, propertySchema] = Object.entries(
    schema.patternProperties
  )[0];
  const knownPropertyKey = new RegExp(propertyKeyPattern);
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (!(knownPropertyKey.test(key) && IsDefaultSchema(propertySchema)))
      continue;
    defaulted[key] = Visit11(propertySchema, references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema)) return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKey.test(key)) continue;
    defaulted[key] = Visit11(
      additionalPropertiesSchema,
      references,
      defaulted[key]
    );
  }
  return defaulted;
}
function FromRef7(schema, references, value3) {
  return Visit11(
    Deref(schema, references),
    references,
    ValueOrDefault(schema, value3)
  );
}
function FromThis7(schema, references, value3) {
  return Visit11(Deref(schema, references), references, value3);
}
function FromTuple10(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted) || IsUndefined(schema.items)) return defaulted;
  const [items, max] = [
    schema.items,
    Math.max(schema.items.length, defaulted.length),
  ];
  for (let i = 0; i < max; i++) {
    if (i < items.length)
      defaulted[i] = Visit11(items[i], references, defaulted[i]);
  }
  return defaulted;
}
function FromUnion12(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  for (const inner of schema.anyOf) {
    const result = Visit11(inner, references, defaulted);
    if (IsCheckable2(inner) && Check(inner, result)) {
      return result;
    }
  }
  return defaulted;
}
function Visit11(schema, references, value3) {
  const references_ = IsString(schema.$id)
    ? [...references, schema]
    : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case 'Array':
      return FromArray10(schema_, references_, value3);
    case 'Intersect':
      return FromIntersect10(schema_, references_, value3);
    case 'Object':
      return FromObject8(schema_, references_, value3);
    case 'Record':
      return FromRecord8(schema_, references_, value3);
    case 'Ref':
      return FromRef7(schema_, references_, value3);
    case 'This':
      return FromThis7(schema_, references_, value3);
    case 'Tuple':
      return FromTuple10(schema_, references_, value3);
    case 'Union':
      return FromUnion12(schema_, references_, value3);
    default:
      return ValueOrDefault(schema_, value3);
  }
}
function Default3(...args) {
  return args.length === 3
    ? Visit11(args[0], args[1], args[2])
    : Visit11(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/pointer/pointer.mjs
var exports_pointer = {};
__export(exports_pointer, {
  ValuePointerRootSetError: () => ValuePointerRootSetError,
  ValuePointerRootDeleteError: () => ValuePointerRootDeleteError,
  Set: () => Set4,
  Has: () => Has3,
  Get: () => Get3,
  Format: () => Format,
  Delete: () => Delete3,
});
function Escape2(component) {
  return component.indexOf('~') === -1
    ? component
    : component.replace(/~1/g, '/').replace(/~0/g, '~');
}
function* Format(pointer) {
  if (pointer === '') return;
  let [start, end] = [0, 0];
  for (let i = 0; i < pointer.length; i++) {
    const char = pointer.charAt(i);
    if (char === '/') {
      if (i === 0) {
        start = i + 1;
      } else {
        end = i;
        yield Escape2(pointer.slice(start, end));
        start = i + 1;
      }
    } else {
      end = i;
    }
  }
  yield Escape2(pointer.slice(start));
}
function Set4(value3, pointer, update) {
  if (pointer === '')
    throw new ValuePointerRootSetError(value3, pointer, update);
  let [owner, next, key] = [null, value3, ''];
  for (const component of Format(pointer)) {
    if (next[component] === undefined) next[component] = {};
    owner = next;
    next = next[component];
    key = component;
  }
  owner[key] = update;
}
function Delete3(value3, pointer) {
  if (pointer === '') throw new ValuePointerRootDeleteError(value3, pointer);
  let [owner, next, key] = [null, value3, ''];
  for (const component of Format(pointer)) {
    if (next[component] === undefined || next[component] === null) return;
    owner = next;
    next = next[component];
    key = component;
  }
  if (Array.isArray(owner)) {
    const index = parseInt(key);
    owner.splice(index, 1);
  } else {
    delete owner[key];
  }
}
function Has3(value3, pointer) {
  if (pointer === '') return true;
  let [owner, next, key] = [null, value3, ''];
  for (const component of Format(pointer)) {
    if (next[component] === undefined) return false;
    owner = next;
    next = next[component];
    key = component;
  }
  return Object.getOwnPropertyNames(owner).includes(key);
}
function Get3(value3, pointer) {
  if (pointer === '') return value3;
  let current = value3;
  for (const component of Format(pointer)) {
    if (current[component] === undefined) return;
    current = current[component];
  }
  return current;
}

class ValuePointerRootSetError extends TypeBoxError {
  constructor(value3, path, update) {
    super('Cannot set root value');
    this.value = value3;
    this.path = path;
    this.update = update;
  }
}

class ValuePointerRootDeleteError extends TypeBoxError {
  constructor(value3, path) {
    super('Cannot delete root value');
    this.value = value3;
    this.path = path;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/delta/delta.mjs
function CreateUpdate(path, value3) {
  return { type: 'update', path, value: value3 };
}
function CreateInsert(path, value3) {
  return { type: 'insert', path, value: value3 };
}
function CreateDelete(path) {
  return { type: 'delete', path };
}
function* ObjectType4(path, current, next) {
  if (!IsStandardObject(next)) return yield CreateUpdate(path, next);
  const currentKeys = [
    ...globalThis.Object.keys(current),
    ...globalThis.Object.getOwnPropertySymbols(current),
  ];
  const nextKeys = [
    ...globalThis.Object.keys(next),
    ...globalThis.Object.getOwnPropertySymbols(next),
  ];
  for (const key of currentKeys) {
    if (IsSymbol(key)) throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && nextKeys.includes(key))
      yield CreateUpdate(`${path}/${globalThis.String(key)}`, undefined);
  }
  for (const key of nextKeys) {
    if (IsUndefined(current[key]) || IsUndefined(next[key])) continue;
    if (IsSymbol(key)) throw new ValueDeltaSymbolError(key);
    yield* Visit12(
      `${path}/${globalThis.String(key)}`,
      current[key],
      next[key]
    );
  }
  for (const key of nextKeys) {
    if (IsSymbol(key)) throw new ValueDeltaSymbolError(key);
    if (IsUndefined(current[key]))
      yield CreateInsert(`${path}/${globalThis.String(key)}`, next[key]);
  }
  for (const key of currentKeys.reverse()) {
    if (IsSymbol(key)) throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && !nextKeys.includes(key))
      yield CreateDelete(`${path}/${globalThis.String(key)}`);
  }
}
function* ArrayType4(path, current, next) {
  if (!IsArray(next)) return yield CreateUpdate(path, next);
  for (let i = 0; i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
  for (let i = 0; i < next.length; i++) {
    if (i < current.length) continue;
    yield CreateInsert(`${path}/${i}`, next[i]);
  }
  for (let i = current.length - 1; i >= 0; i--) {
    if (i < next.length) continue;
    yield CreateDelete(`${path}/${i}`);
  }
}
function* TypedArrayType2(path, current, next) {
  if (
    !IsTypedArray(next) ||
    current.length !== next.length ||
    globalThis.Object.getPrototypeOf(current).constructor.name !==
      globalThis.Object.getPrototypeOf(next).constructor.name
  )
    return yield CreateUpdate(path, next);
  for (let i = 0; i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
}
function* ValueType2(path, current, next) {
  if (current === next) return;
  yield CreateUpdate(path, next);
}
function* Visit12(path, current, next) {
  if (IsStandardObject(current)) return yield* ObjectType4(path, current, next);
  if (IsArray(current)) return yield* ArrayType4(path, current, next);
  if (IsTypedArray(current)) return yield* TypedArrayType2(path, current, next);
  if (IsValueType(current)) return yield* ValueType2(path, current, next);
  throw new ValueDeltaError(
    current,
    'Unable to create diff edits for unknown value'
  );
}
function Diff(current, next) {
  return [...Visit12('', current, next)];
}
function IsRootUpdate(edits) {
  return edits.length > 0 && edits[0].path === '' && edits[0].type === 'update';
}
function IsIdentity(edits) {
  return edits.length === 0;
}
function Patch(current, edits) {
  if (IsRootUpdate(edits)) {
    return Clone2(edits[0].value);
  }
  if (IsIdentity(edits)) {
    return Clone2(current);
  }
  const clone8 = Clone2(current);
  for (const edit of edits) {
    switch (edit.type) {
      case 'insert': {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case 'update': {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case 'delete': {
        exports_pointer.Delete(clone8, edit.path);
        break;
      }
    }
  }
  return clone8;
}
var Insert = Object2({
  type: Literal('insert'),
  path: String2(),
  value: Unknown(),
});
var Update = Object2({
  type: Literal('update'),
  path: String2(),
  value: Unknown(),
});
var Delete4 = Object2({
  type: Literal('delete'),
  path: String2(),
});
var Edit = Union([Insert, Update, Delete4]);

class ValueDeltaError extends TypeBoxError {
  constructor(value3, message) {
    super(message);
    this.value = value3;
  }
}

class ValueDeltaSymbolError extends ValueDeltaError {
  constructor(value3) {
    super(value3, 'Cannot diff objects with symbol keys');
    this.value = value3;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/equal/equal.mjs
function ObjectType5(left, right) {
  if (!IsStandardObject(right)) return false;
  const leftKeys = [
    ...Object.keys(left),
    ...Object.getOwnPropertySymbols(left),
  ];
  const rightKeys = [
    ...Object.keys(right),
    ...Object.getOwnPropertySymbols(right),
  ];
  if (leftKeys.length !== rightKeys.length) return false;
  return leftKeys.every((key) => Equal(left[key], right[key]));
}
function DateType4(left, right) {
  return IsDate(right) && left.getTime() === right.getTime();
}
function ArrayType5(left, right) {
  if (!IsArray(right) || left.length !== right.length) return false;
  return left.every((value3, index) => Equal(value3, right[index]));
}
function TypedArrayType3(left, right) {
  if (
    !IsTypedArray(right) ||
    left.length !== right.length ||
    Object.getPrototypeOf(left).constructor.name !==
      Object.getPrototypeOf(right).constructor.name
  )
    return false;
  return left.every((value3, index) => Equal(value3, right[index]));
}
function ValueType3(left, right) {
  return left === right;
}
function Equal(left, right) {
  if (IsStandardObject(left)) return ObjectType5(left, right);
  if (IsDate(left)) return DateType4(left, right);
  if (IsTypedArray(left)) return TypedArrayType3(left, right);
  if (IsArray(left)) return ArrayType5(left, right);
  if (IsValueType(left)) return ValueType3(left, right);
  throw new Error('ValueEquals: Unable to compare value');
}
// node_modules/@sinclair/typebox/build/esm/value/mutate/mutate.mjs
function ObjectType6(root, path, current, next) {
  if (!IsStandardObject(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    const currentKeys = Object.getOwnPropertyNames(current);
    const nextKeys = Object.getOwnPropertyNames(next);
    for (const currentKey of currentKeys) {
      if (!nextKeys.includes(currentKey)) {
        delete current[currentKey];
      }
    }
    for (const nextKey of nextKeys) {
      if (!currentKeys.includes(nextKey)) {
        current[nextKey] = null;
      }
    }
    for (const nextKey of nextKeys) {
      Visit13(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
    }
  }
}
function ArrayType6(root, path, current, next) {
  if (!IsArray(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    for (let index = 0; index < next.length; index++) {
      Visit13(root, `${path}/${index}`, current[index], next[index]);
    }
    current.splice(next.length);
  }
}
function TypedArrayType4(root, path, current, next) {
  if (IsTypedArray(current) && current.length === next.length) {
    for (let i = 0; i < current.length; i++) {
      current[i] = next[i];
    }
  } else {
    exports_pointer.Set(root, path, Clone2(next));
  }
}
function ValueType4(root, path, current, next) {
  if (current === next) return;
  exports_pointer.Set(root, path, next);
}
function Visit13(root, path, current, next) {
  if (IsArray(next)) return ArrayType6(root, path, current, next);
  if (IsTypedArray(next)) return TypedArrayType4(root, path, current, next);
  if (IsStandardObject(next)) return ObjectType6(root, path, current, next);
  if (IsValueType(next)) return ValueType4(root, path, current, next);
}
function IsNonMutableValue(value3) {
  return IsTypedArray(value3) || IsValueType(value3);
}
function IsMismatchedValue(current, next) {
  return (
    (IsStandardObject(current) && IsArray(next)) ||
    (IsArray(current) && IsStandardObject(next))
  );
}
function Mutate(current, next) {
  if (IsNonMutableValue(current) || IsNonMutableValue(next))
    throw new ValueMutateError(
      'Only object and array types can be mutated at the root level'
    );
  if (IsMismatchedValue(current, next))
    throw new ValueMutateError(
      'Cannot assign due type mismatch of assignable values'
    );
  Visit13(current, '', current, next);
}

class ValueMutateError extends TypeBoxError {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/decode.mjs
function Default4(schema, path, value3) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Decode(value3) : value3;
  } catch (error19) {
    throw new TransformDecodeError(schema, path, value3, error19);
  }
}
function FromArray11(schema, references, path, value3) {
  return IsArray(value3)
    ? Default4(
        schema,
        path,
        value3.map((value4, index) =>
          Visit14(schema.items, references, `${path}/${index}`, value4)
        )
      )
    : Default4(schema, path, value3);
}
function FromIntersect11(schema, references, path, value3) {
  if (!IsStandardObject(value3) || IsValueType(value3))
    return Default4(schema, path, value3);
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...value3 };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit14(
        knownSchema,
        references,
        `${path}/${knownKey}`,
        knownProperties[knownKey]
      );
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(
        unevaluatedProperties,
        `${path}/${key}`,
        unknownProperties[key]
      );
    }
  return Default4(schema, path, unknownProperties);
}
function FromNot5(schema, references, path, value3) {
  return Default4(schema, path, Visit14(schema.not, references, path, value3));
}
function FromObject9(schema, references, path, value3) {
  if (!IsStandardObject(value3)) return Default4(schema, path, value3);
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...value3 };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit14(
        schema.properties[key],
        references,
        `${path}/${key}`,
        knownProperties[key]
      );
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(
        additionalProperties,
        `${path}/${key}`,
        unknownProperties[key]
      );
    }
  return Default4(schema, path, unknownProperties);
}
function FromRecord9(schema, references, path, value3) {
  if (!IsStandardObject(value3)) return Default4(schema, path, value3);
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = { ...value3 };
  for (const key of Object.getOwnPropertyNames(value3))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit14(
        schema.patternProperties[pattern3],
        references,
        `${path}/${key}`,
        knownProperties[key]
      );
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      unknownProperties[key] = Default4(
        additionalProperties,
        `${path}/${key}`,
        unknownProperties[key]
      );
    }
  return Default4(schema, path, unknownProperties);
}
function FromRef8(schema, references, path, value3) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value3));
}
function FromThis8(schema, references, path, value3) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value3));
}
function FromTuple11(schema, references, path, value3) {
  return IsArray(value3) && IsArray(schema.items)
    ? Default4(
        schema,
        path,
        schema.items.map((schema2, index) =>
          Visit14(schema2, references, `${path}/${index}`, value3[index])
        )
      )
    : Default4(schema, path, value3);
}
function FromUnion13(schema, references, path, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3)) continue;
    const decoded = Visit14(subschema, references, path, value3);
    return Default4(schema, path, decoded);
  }
  return Default4(schema, path, value3);
}
function Visit14(schema, references, path, value3) {
  const references_ =
    typeof schema.$id === 'string' ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case 'Array':
      return FromArray11(schema_, references_, path, value3);
    case 'Intersect':
      return FromIntersect11(schema_, references_, path, value3);
    case 'Not':
      return FromNot5(schema_, references_, path, value3);
    case 'Object':
      return FromObject9(schema_, references_, path, value3);
    case 'Record':
      return FromRecord9(schema_, references_, path, value3);
    case 'Ref':
      return FromRef8(schema_, references_, path, value3);
    case 'Symbol':
      return Default4(schema_, path, value3);
    case 'This':
      return FromThis8(schema_, references_, path, value3);
    case 'Tuple':
      return FromTuple11(schema_, references_, path, value3);
    case 'Union':
      return FromUnion13(schema_, references_, path, value3);
    default:
      return Default4(schema_, path, value3);
  }
}
function TransformDecode(schema, references, value3) {
  return Visit14(schema, references, '', value3);
}

class TransformDecodeCheckError extends TypeBoxError {
  constructor(schema, value3, error19) {
    super(`Unable to decode value as it does not match the expected schema`);
    this.schema = schema;
    this.value = value3;
    this.error = error19;
  }
}

class TransformDecodeError extends TypeBoxError {
  constructor(schema, path, value3, error19) {
    super(error19 instanceof Error ? error19.message : 'Unknown error');
    this.schema = schema;
    this.path = path;
    this.value = value3;
    this.error = error19;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/encode.mjs
function Default5(schema, path, value3) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Encode(value3) : value3;
  } catch (error20) {
    throw new TransformEncodeError(schema, path, value3, error20);
  }
}
function FromArray12(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  return IsArray(defaulted)
    ? defaulted.map((value4, index) =>
        Visit15(schema.items, references, `${path}/${index}`, value4)
      )
    : defaulted;
}
function FromIntersect12(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(value3) || IsValueType(value3)) return defaulted;
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...defaulted };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit15(
        knownSchema,
        references,
        `${path}/${knownKey}`,
        knownProperties[knownKey]
      );
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(
        unevaluatedProperties,
        `${path}/${key}`,
        properties[key]
      );
    }
  return properties;
}
function FromNot6(schema, references, path, value3) {
  return Default5(schema.not, path, Default5(schema, path, value3));
}
function FromObject10(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(defaulted)) return defaulted;
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...defaulted };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit15(
        schema.properties[key],
        references,
        `${path}/${key}`,
        knownProperties[key]
      );
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return knownProperties;
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(
        additionalProperties,
        `${path}/${key}`,
        properties[key]
      );
    }
  return properties;
}
function FromRecord10(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(value3)) return defaulted;
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = { ...defaulted };
  for (const key of Object.getOwnPropertyNames(value3))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit15(
        schema.patternProperties[pattern3],
        references,
        `${path}/${key}`,
        knownProperties[key]
      );
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      properties[key] = Default5(
        additionalProperties,
        `${path}/${key}`,
        properties[key]
      );
    }
  return properties;
}
function FromRef9(schema, references, path, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value3);
  return Default5(schema, path, resolved);
}
function FromThis9(schema, references, path, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value3);
  return Default5(schema, path, resolved);
}
function FromTuple12(schema, references, path, value3) {
  const value1 = Default5(schema, path, value3);
  return IsArray(schema.items)
    ? schema.items.map((schema2, index) =>
        Visit15(schema2, references, `${path}/${index}`, value1[index])
      )
    : [];
}
function FromUnion14(schema, references, path, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3)) continue;
    const value1 = Visit15(subschema, references, path, value3);
    return Default5(schema, path, value1);
  }
  for (const subschema of schema.anyOf) {
    const value1 = Visit15(subschema, references, path, value3);
    if (!Check(schema, references, value1)) continue;
    return Default5(schema, path, value1);
  }
  return Default5(schema, path, value3);
}
function Visit15(schema, references, path, value3) {
  const references_ =
    typeof schema.$id === 'string' ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case 'Array':
      return FromArray12(schema_, references_, path, value3);
    case 'Intersect':
      return FromIntersect12(schema_, references_, path, value3);
    case 'Not':
      return FromNot6(schema_, references_, path, value3);
    case 'Object':
      return FromObject10(schema_, references_, path, value3);
    case 'Record':
      return FromRecord10(schema_, references_, path, value3);
    case 'Ref':
      return FromRef9(schema_, references_, path, value3);
    case 'This':
      return FromThis9(schema_, references_, path, value3);
    case 'Tuple':
      return FromTuple12(schema_, references_, path, value3);
    case 'Union':
      return FromUnion14(schema_, references_, path, value3);
    default:
      return Default5(schema_, path, value3);
  }
}
function TransformEncode(schema, references, value3) {
  return Visit15(schema, references, '', value3);
}

class TransformEncodeCheckError extends TypeBoxError {
  constructor(schema, value3, error20) {
    super(`The encoded value does not match the expected schema`);
    this.schema = schema;
    this.value = value3;
    this.error = error20;
  }
}

class TransformEncodeError extends TypeBoxError {
  constructor(schema, path, value3, error20) {
    super(`${error20 instanceof Error ? error20.message : 'Unknown error'}`);
    this.schema = schema;
    this.path = path;
    this.value = value3;
    this.error = error20;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/has.mjs
function FromArray13(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
function FromAsyncIterator5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
function FromConstructor6(schema, references) {
  return (
    IsTransform2(schema) ||
    Visit16(schema.returns, references) ||
    schema.parameters.some((schema2) => Visit16(schema2, references))
  );
}
function FromFunction5(schema, references) {
  return (
    IsTransform2(schema) ||
    Visit16(schema.returns, references) ||
    schema.parameters.some((schema2) => Visit16(schema2, references))
  );
}
function FromIntersect13(schema, references) {
  return (
    IsTransform2(schema) ||
    IsTransform2(schema.unevaluatedProperties) ||
    schema.allOf.some((schema2) => Visit16(schema2, references))
  );
}
function FromIterator5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
function FromNot7(schema, references) {
  return IsTransform2(schema) || Visit16(schema.not, references);
}
function FromObject11(schema, references) {
  return (
    IsTransform2(schema) ||
    Object.values(schema.properties).some((schema2) =>
      Visit16(schema2, references)
    ) ||
    (IsSchema2(schema.additionalProperties) &&
      Visit16(schema.additionalProperties, references))
  );
}
function FromPromise5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.item, references);
}
function FromRecord11(schema, references) {
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[pattern3];
  return (
    IsTransform2(schema) ||
    Visit16(property, references) ||
    (IsSchema2(schema.additionalProperties) &&
      IsTransform2(schema.additionalProperties))
  );
}
function FromRef10(schema, references) {
  if (IsTransform2(schema)) return true;
  return Visit16(Deref(schema, references), references);
}
function FromThis10(schema, references) {
  if (IsTransform2(schema)) return true;
  return Visit16(Deref(schema, references), references);
}
function FromTuple13(schema, references) {
  return (
    IsTransform2(schema) ||
    (!IsUndefined(schema.items) &&
      schema.items.some((schema2) => Visit16(schema2, references)))
  );
}
function FromUnion15(schema, references) {
  return (
    IsTransform2(schema) ||
    schema.anyOf.some((schema2) => Visit16(schema2, references))
  );
}
function Visit16(schema, references) {
  const references_ = IsString(schema.$id)
    ? [...references, schema]
    : references;
  const schema_ = schema;
  if (schema.$id && visited.has(schema.$id)) return false;
  if (schema.$id) visited.add(schema.$id);
  switch (schema[Kind]) {
    case 'Array':
      return FromArray13(schema_, references_);
    case 'AsyncIterator':
      return FromAsyncIterator5(schema_, references_);
    case 'Constructor':
      return FromConstructor6(schema_, references_);
    case 'Function':
      return FromFunction5(schema_, references_);
    case 'Intersect':
      return FromIntersect13(schema_, references_);
    case 'Iterator':
      return FromIterator5(schema_, references_);
    case 'Not':
      return FromNot7(schema_, references_);
    case 'Object':
      return FromObject11(schema_, references_);
    case 'Promise':
      return FromPromise5(schema_, references_);
    case 'Record':
      return FromRecord11(schema_, references_);
    case 'Ref':
      return FromRef10(schema_, references_);
    case 'This':
      return FromThis10(schema_, references_);
    case 'Tuple':
      return FromTuple13(schema_, references_);
    case 'Union':
      return FromUnion15(schema_, references_);
    default:
      return IsTransform2(schema);
  }
}
function HasTransform(schema, references) {
  visited.clear();
  return Visit16(schema, references);
}
var visited = new Set();
// node_modules/@sinclair/typebox/build/esm/value/value/value.mjs
var exports_value2 = {};
__export(exports_value2, {
  Patch: () => Patch2,
  Mutate: () => Mutate2,
  Hash: () => Hash2,
  Errors: () => Errors2,
  Equal: () => Equal2,
  Encode: () => Encode,
  Diff: () => Diff2,
  Default: () => Default6,
  Decode: () => Decode,
  Create: () => Create3,
  Convert: () => Convert2,
  Clone: () => Clone3,
  Clean: () => Clean2,
  Check: () => Check2,
  Cast: () => Cast2,
});
function Cast2(...args) {
  return Cast.apply(Cast, args);
}
function Create3(...args) {
  return Create2.apply(Create2, args);
}
function Check2(...args) {
  return Check.apply(Check, args);
}
function Clean2(...args) {
  return Clean.apply(Clean, args);
}
function Convert2(...args) {
  return Convert.apply(Convert, args);
}
function Clone3(value3) {
  return Clone2(value3);
}
function Decode(...args) {
  const [schema, references, value3] =
    args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  if (!Check2(schema, references, value3))
    throw new TransformDecodeCheckError(
      schema,
      value3,
      Errors2(schema, references, value3).First()
    );
  return HasTransform(schema, references)
    ? TransformDecode(schema, references, value3)
    : value3;
}
function Default6(...args) {
  return Default3.apply(Default3, args);
}
function Encode(...args) {
  const [schema, references, value3] =
    args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  const encoded = HasTransform(schema, references)
    ? TransformEncode(schema, references, value3)
    : value3;
  if (!Check2(schema, references, encoded))
    throw new TransformEncodeCheckError(
      schema,
      encoded,
      Errors2(schema, references, encoded).First()
    );
  return encoded;
}
function Errors2(...args) {
  return Errors.apply(Errors, args);
}
function Equal2(left, right) {
  return Equal(left, right);
}
function Diff2(current, next) {
  return Diff(current, next);
}
function Hash2(value3) {
  return Hash(value3);
}
function Patch2(current, edits) {
  return Patch(current, edits);
}
function Mutate2(current, next) {
  Mutate(current, next);
}
// node_modules/@sinclair/typebox/build/esm/type/awaited/awaited.mjs
function FromRest4(T) {
  return T.map((L) => AwaitedResolve(L));
}
function FromIntersect14(T) {
  return Intersect(FromRest4(T));
}
function FromUnion16(T) {
  return Union(FromRest4(T));
}
function FromPromise6(T) {
  return AwaitedResolve(T);
}
function AwaitedResolve(T) {
  return IsIntersect(T)
    ? FromIntersect14(T.allOf)
    : IsUnion(T)
      ? FromUnion16(T.anyOf)
      : IsPromise2(T)
        ? FromPromise6(T.item)
        : T;
}
function Awaited(T, options = {}) {
  return CloneType(AwaitedResolve(T), options);
}
// node_modules/@sinclair/typebox/build/esm/type/composite/composite.mjs
function CompositeKeys(T) {
  const Acc = [];
  for (const L of T) Acc.push(...KeyOfPropertyKeys(L));
  return SetDistinct(Acc);
}
function FilterNever(T) {
  return T.filter((L) => !IsNever(L));
}
function CompositeProperty(T, K) {
  const Acc = [];
  for (const L of T) Acc.push(...IndexFromPropertyKeys(L, [K]));
  return FilterNever(Acc);
}
function CompositeProperties(T, K) {
  const Acc = {};
  for (const L of K) {
    Acc[L] = IntersectEvaluated(CompositeProperty(T, L));
  }
  return Acc;
}
function Composite(T, options = {}) {
  const K = CompositeKeys(T);
  const P = CompositeProperties(T, K);
  const R = Object2(P, options);
  return R;
}
// node_modules/@sinclair/typebox/build/esm/type/date/date.mjs
function Date2(options = {}) {
  return {
    ...options,
    [Kind]: 'Date',
    type: 'Date',
  };
}
// node_modules/@sinclair/typebox/build/esm/type/null/null.mjs
function Null(options = {}) {
  return {
    ...options,
    [Kind]: 'Null',
    type: 'null',
  };
}
// node_modules/@sinclair/typebox/build/esm/type/symbol/symbol.mjs
function Symbol2(options) {
  return { ...options, [Kind]: 'Symbol', type: 'symbol' };
}
// node_modules/@sinclair/typebox/build/esm/type/undefined/undefined.mjs
function Undefined(options = {}) {
  return { ...options, [Kind]: 'Undefined', type: 'undefined' };
}
// node_modules/@sinclair/typebox/build/esm/type/uint8array/uint8array.mjs
function Uint8Array2(options = {}) {
  return { ...options, [Kind]: 'Uint8Array', type: 'Uint8Array' };
}
// node_modules/@sinclair/typebox/build/esm/type/const/const.mjs
function FromArray14(T) {
  return T.map((L) => FromValue(L, false));
}
function FromProperties8(value5) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(value5))
    Acc[K] = Readonly(FromValue(value5[K], false));
  return Acc;
}
function ConditionalReadonly(T, root) {
  return root === true ? T : Readonly(T);
}
function FromValue(value5, root) {
  return IsAsyncIterator2(value5)
    ? ConditionalReadonly(Any(), root)
    : IsIterator2(value5)
      ? ConditionalReadonly(Any(), root)
      : IsArray2(value5)
        ? Readonly(Tuple(FromArray14(value5)))
        : IsUint8Array2(value5)
          ? Uint8Array2()
          : IsDate2(value5)
            ? Date2()
            : IsObject2(value5)
              ? ConditionalReadonly(Object2(FromProperties8(value5)), root)
              : IsFunction2(value5)
                ? ConditionalReadonly(Function2([], Unknown()), root)
                : IsUndefined2(value5)
                  ? Undefined()
                  : IsNull2(value5)
                    ? Null()
                    : IsSymbol2(value5)
                      ? Symbol2()
                      : IsBigInt2(value5)
                        ? BigInt2()
                        : IsNumber2(value5)
                          ? Literal(value5)
                          : IsBoolean2(value5)
                            ? Literal(value5)
                            : IsString2(value5)
                              ? Literal(value5)
                              : Object2({});
}
function Const(T, options = {}) {
  return CloneType(FromValue(T, true), options);
}
// node_modules/@sinclair/typebox/build/esm/type/constructor-parameters/constructor-parameters.mjs
function ConstructorParameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/deref/deref.mjs
function FromRest5(schema, references) {
  return schema.map((schema2) => Deref2(schema2, references));
}
function FromProperties9(properties, references) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(properties)) {
    Acc[K] = Deref2(properties[K], references);
  }
  return Acc;
}
function FromConstructor7(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
}
function FromFunction6(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
}
function FromIntersect15(schema, references) {
  schema.allOf = FromRest5(schema.allOf, references);
  return schema;
}
function FromUnion17(schema, references) {
  schema.anyOf = FromRest5(schema.anyOf, references);
  return schema;
}
function FromTuple14(schema, references) {
  if (IsUndefined2(schema.items)) return schema;
  schema.items = FromRest5(schema.items, references);
  return schema;
}
function FromArray15(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
function FromObject12(schema, references) {
  schema.properties = FromProperties9(schema.properties, references);
  return schema;
}
function FromPromise7(schema, references) {
  schema.item = Deref2(schema.item, references);
  return schema;
}
function FromAsyncIterator6(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
function FromIterator6(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
function FromRef11(schema, references) {
  const target = references.find((remote) => remote.$id === schema.$ref);
  if (target === undefined)
    throw Error(`Unable to dereference schema with \$id ${schema.$ref}`);
  const discard8 = Discard(target, ['$id']);
  return Deref2(discard8, references);
}
function DerefResolve(schema, references) {
  return IsConstructor(schema)
    ? FromConstructor7(schema, references)
    : IsFunction3(schema)
      ? FromFunction6(schema, references)
      : IsIntersect(schema)
        ? FromIntersect15(schema, references)
        : IsUnion(schema)
          ? FromUnion17(schema, references)
          : IsTuple(schema)
            ? FromTuple14(schema, references)
            : IsArray3(schema)
              ? FromArray15(schema, references)
              : IsObject3(schema)
                ? FromObject12(schema, references)
                : IsPromise2(schema)
                  ? FromPromise7(schema, references)
                  : IsAsyncIterator3(schema)
                    ? FromAsyncIterator6(schema, references)
                    : IsIterator3(schema)
                      ? FromIterator6(schema, references)
                      : IsRef(schema)
                        ? FromRef11(schema, references)
                        : schema;
}
function Deref2(schema, references) {
  return DerefResolve(CloneType(schema), CloneRest(references));
}
// node_modules/@sinclair/typebox/build/esm/type/enum/enum.mjs
function Enum(item, options = {}) {
  if (IsUndefined2(item)) throw new Error('Enum undefined or empty');
  const values1 = globalThis.Object.getOwnPropertyNames(item)
    .filter((key) => isNaN(key))
    .map((key) => item[key]);
  const values2 = [...new Set(values1)];
  const anyOf = values2.map((value7) => Literal(value7));
  return Union(anyOf, { ...options, [Hint]: 'Enum' });
}
// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-template-literal.mjs
function ExcludeFromTemplateLiteral(L, R) {
  return Exclude(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude.mjs
function ExcludeRest(L, R) {
  const excluded = L.filter(
    (inner) => ExtendsCheck(inner, R) === ExtendsResult.False
  );
  return excluded.length === 1 ? excluded[0] : Union(excluded);
}
function Exclude(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExcludeFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExcludeFromMappedResult(L, R), options);
  return CloneType(
    IsUnion(L)
      ? ExcludeRest(L.anyOf, R)
      : ExtendsCheck(L, R) !== ExtendsResult.False
        ? Never()
        : L,
    options
  );
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-mapped-result.mjs
function FromProperties10(P, U) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Exclude(P[K2], U);
  return Acc;
}
function FromMappedResult7(R, T) {
  return FromProperties10(R.properties, T);
}
function ExcludeFromMappedResult(R, T) {
  const P = FromMappedResult7(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-template-literal.mjs
function ExtractFromTemplateLiteral(L, R) {
  return Extract(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract.mjs
function ExtractRest(L, R) {
  const extracted = L.filter(
    (inner) => ExtendsCheck(inner, R) !== ExtendsResult.False
  );
  return extracted.length === 1 ? extracted[0] : Union(extracted);
}
function Extract(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExtractFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExtractFromMappedResult(L, R), options);
  return CloneType(
    IsUnion(L)
      ? ExtractRest(L.anyOf, R)
      : ExtendsCheck(L, R) !== ExtendsResult.False
        ? L
        : Never(),
    options
  );
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-mapped-result.mjs
function FromProperties11(P, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extract(P[K2], T);
  return Acc;
}
function FromMappedResult8(R, T) {
  return FromProperties11(R.properties, T);
}
function ExtractFromMappedResult(R, T) {
  const P = FromMappedResult8(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/instance-type/instance-type.mjs
function InstanceType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/integer/integer.mjs
function Integer(options = {}) {
  return {
    ...options,
    [Kind]: 'Integer',
    type: 'integer',
  };
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic-from-mapped-key.mjs
function MappedIntrinsicPropertyKey(K, M, options) {
  return {
    [K]: Intrinsic(Literal(K), M, options),
  };
}
function MappedIntrinsicPropertyKeys(K, M, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIntrinsicPropertyKey(L, M, options) };
  }, {});
}
function MappedIntrinsicProperties(T, M, options) {
  return MappedIntrinsicPropertyKeys(T['keys'], M, options);
}
function IntrinsicFromMappedKey(T, M, options) {
  const P = MappedIntrinsicProperties(T, M, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic.mjs
function ApplyUncapitalize(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toLowerCase(), rest].join('');
}
function ApplyCapitalize(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toUpperCase(), rest].join('');
}
function ApplyUppercase(value7) {
  return value7.toUpperCase();
}
function ApplyLowercase(value7) {
  return value7.toLowerCase();
}
function FromTemplateLiteral6(schema, mode, options) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  const finite3 = IsTemplateLiteralExpressionFinite(expression);
  if (!finite3)
    return { ...schema, pattern: FromLiteralValue(schema.pattern, mode) };
  const strings = [...TemplateLiteralExpressionGenerate(expression)];
  const literals = strings.map((value7) => Literal(value7));
  const mapped12 = FromRest6(literals, mode);
  const union15 = Union(mapped12);
  return TemplateLiteral([union15], options);
}
function FromLiteralValue(value7, mode) {
  return typeof value7 === 'string'
    ? mode === 'Uncapitalize'
      ? ApplyUncapitalize(value7)
      : mode === 'Capitalize'
        ? ApplyCapitalize(value7)
        : mode === 'Uppercase'
          ? ApplyUppercase(value7)
          : mode === 'Lowercase'
            ? ApplyLowercase(value7)
            : value7
    : value7.toString();
}
function FromRest6(T, M) {
  return T.map((L) => Intrinsic(L, M));
}
function Intrinsic(schema, mode, options = {}) {
  return IsMappedKey(schema)
    ? IntrinsicFromMappedKey(schema, mode, options)
    : IsTemplateLiteral(schema)
      ? FromTemplateLiteral6(schema, mode, schema)
      : IsUnion(schema)
        ? Union(FromRest6(schema.anyOf, mode), options)
        : IsLiteral(schema)
          ? Literal(FromLiteralValue(schema.const, mode), options)
          : schema;
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/capitalize.mjs
function Capitalize(T, options = {}) {
  return Intrinsic(T, 'Capitalize', options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/lowercase.mjs
function Lowercase(T, options = {}) {
  return Intrinsic(T, 'Lowercase', options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uncapitalize.mjs
function Uncapitalize(T, options = {}) {
  return Intrinsic(T, 'Uncapitalize', options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uppercase.mjs
function Uppercase(T, options = {}) {
  return Intrinsic(T, 'Uppercase', options);
}
// node_modules/@sinclair/typebox/build/esm/type/not/not.mjs
function Not2(schema, options) {
  return {
    ...options,
    [Kind]: 'Not',
    not: CloneType(schema),
  };
}
// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-result.mjs
function FromProperties12(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Omit(P[K2], K, options);
  return Acc;
}
function FromMappedResult9(R, K, options) {
  return FromProperties12(R.properties, K, options);
}
function OmitFromMappedResult(R, K, options) {
  const P = FromMappedResult9(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit.mjs
function FromIntersect16(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
}
function FromUnion18(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
}
function FromProperty2(T, K) {
  const { [K]: _, ...R } = T;
  return R;
}
function FromProperties13(T, K) {
  return K.reduce((T2, K2) => FromProperty2(T2, K2), T);
}
function OmitResolve(T, K) {
  return IsIntersect(T)
    ? Intersect(FromIntersect16(T.allOf, K))
    : IsUnion(T)
      ? Union(FromUnion18(T.anyOf, K))
      : IsObject3(T)
        ? Object2(FromProperties13(T.properties, K))
        : Object2({});
}
function Omit(T, K, options = {}) {
  if (IsMappedKey(K)) return OmitFromMappedKey(T, K, options);
  if (IsMappedResult(T)) return OmitFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, '$id', 'required']);
  const R = CloneType(OmitResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-key.mjs
function FromPropertyKey2(T, K, options) {
  return {
    [K]: Omit(T, [K], options),
  };
}
function FromPropertyKeys2(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey2(T, LK, options) };
  }, {});
}
function FromMappedKey3(T, K, options) {
  return FromPropertyKeys2(T, K.keys, options);
}
function OmitFromMappedKey(T, K, options) {
  const P = FromMappedKey3(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/parameters/parameters.mjs
function Parameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/partial/partial.mjs
function FromRest7(T) {
  return T.map((L) => PartialResolve(L));
}
function FromProperties14(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Optional(T[K]);
  return Acc;
}
function PartialResolve(T) {
  return IsIntersect(T)
    ? Intersect(FromRest7(T.allOf))
    : IsUnion(T)
      ? Union(FromRest7(T.anyOf))
      : IsObject3(T)
        ? Object2(FromProperties14(T.properties))
        : Object2({});
}
function Partial(T, options = {}) {
  if (IsMappedResult(T)) return PartialFromMappedResult(T, options);
  const D = Discard(T, [TransformKind, '$id', 'required']);
  const R = CloneType(PartialResolve(T), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/partial/partial-from-mapped-result.mjs
function FromProperties15(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Partial(K[K2], options);
  return Acc;
}
function FromMappedResult10(R, options) {
  return FromProperties15(R.properties, options);
}
function PartialFromMappedResult(R, options) {
  const P = FromMappedResult10(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-result.mjs
function FromProperties16(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Pick(P[K2], K, options);
  return Acc;
}
function FromMappedResult11(R, K, options) {
  return FromProperties16(R.properties, K, options);
}
function PickFromMappedResult(R, K, options) {
  const P = FromMappedResult11(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick.mjs
function FromIntersect17(T, K) {
  return T.map((T2) => PickResolve(T2, K));
}
function FromUnion19(T, K) {
  return T.map((T2) => PickResolve(T2, K));
}
function FromProperties17(T, K) {
  const Acc = {};
  for (const K2 of K) if (K2 in T) Acc[K2] = T[K2];
  return Acc;
}
function PickResolve(T, K) {
  return IsIntersect(T)
    ? Intersect(FromIntersect17(T.allOf, K))
    : IsUnion(T)
      ? Union(FromUnion19(T.anyOf, K))
      : IsObject3(T)
        ? Object2(FromProperties17(T.properties, K))
        : Object2({});
}
function Pick(T, K, options = {}) {
  if (IsMappedKey(K)) return PickFromMappedKey(T, K, options);
  if (IsMappedResult(T)) return PickFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, '$id', 'required']);
  const R = CloneType(PickResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-key.mjs
function FromPropertyKey3(T, K, options) {
  return {
    [K]: Pick(T, [K], options),
  };
}
function FromPropertyKeys3(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey3(T, LK, options) };
  }, {});
}
function FromMappedKey4(T, K, options) {
  return FromPropertyKeys3(T, K.keys, options);
}
function PickFromMappedKey(T, K, options) {
  const P = FromMappedKey4(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/readonly-optional/readonly-optional.mjs
function ReadonlyOptional(schema) {
  return Readonly(Optional(schema));
}
// node_modules/@sinclair/typebox/build/esm/type/record/record.mjs
function RecordCreateFromPattern(pattern3, T, options) {
  return {
    ...options,
    [Kind]: 'Record',
    type: 'object',
    patternProperties: { [pattern3]: CloneType(T) },
  };
}
function RecordCreateFromKeys(K, T, options) {
  const Acc = {};
  for (const K2 of K) Acc[K2] = CloneType(T);
  return Object2(Acc, { ...options, [Hint]: 'Record' });
}
function FromTemplateLiteralKey(K, T, options) {
  return IsTemplateLiteralFinite(K)
    ? RecordCreateFromKeys(IndexPropertyKeys(K), T, options)
    : RecordCreateFromPattern(K.pattern, T, options);
}
function FromUnionKey(K, T, options) {
  return RecordCreateFromKeys(IndexPropertyKeys(Union(K)), T, options);
}
function FromLiteralKey(K, T, options) {
  return RecordCreateFromKeys([K.toString()], T, options);
}
function FromRegExpKey(K, T, options) {
  return RecordCreateFromPattern(K.source, T, options);
}
function FromStringKey(K, T, options) {
  const pattern3 = IsUndefined2(K.pattern) ? PatternStringExact : K.pattern;
  return RecordCreateFromPattern(pattern3, T, options);
}
function FromIntegerKey(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
}
function FromNumberKey(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
}
function Record(K, T, options = {}) {
  return IsUnion(K)
    ? FromUnionKey(K.anyOf, T, options)
    : IsTemplateLiteral(K)
      ? FromTemplateLiteralKey(K, T, options)
      : IsLiteral(K)
        ? FromLiteralKey(K.const, T, options)
        : IsInteger2(K)
          ? FromIntegerKey(K, T, options)
          : IsNumber3(K)
            ? FromNumberKey(K, T, options)
            : IsRegExp2(K)
              ? FromRegExpKey(K, T, options)
              : IsString3(K)
                ? FromStringKey(K, T, options)
                : Never(options);
}
// node_modules/@sinclair/typebox/build/esm/type/recursive/recursive.mjs
function Recursive(callback, options = {}) {
  if (IsUndefined2(options.$id)) options.$id = `T${Ordinal++}`;
  const thisType = callback({ [Kind]: 'This', $ref: `${options.$id}` });
  thisType.$id = options.$id;
  return CloneType({ ...options, [Hint]: 'Recursive', ...thisType });
}
var Ordinal = 0;
// node_modules/@sinclair/typebox/build/esm/type/ref/ref.mjs
function Ref(unresolved, options = {}) {
  if (IsString2(unresolved))
    return { ...options, [Kind]: 'Ref', $ref: unresolved };
  if (IsUndefined2(unresolved.$id))
    throw new Error('Reference target type must specify an $id');
  return {
    ...options,
    [Kind]: 'Ref',
    $ref: unresolved.$id,
  };
}
// node_modules/@sinclair/typebox/build/esm/type/regexp/regexp.mjs
function RegExp2(unresolved, options = {}) {
  const expr = IsString2(unresolved)
    ? new globalThis.RegExp(unresolved)
    : unresolved;
  return {
    ...options,
    [Kind]: 'RegExp',
    type: 'RegExp',
    source: expr.source,
    flags: expr.flags,
  };
}
// node_modules/@sinclair/typebox/build/esm/type/required/required.mjs
function FromRest8(T) {
  return T.map((L) => RequiredResolve(L));
}
function FromProperties18(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Discard(T[K], [OptionalKind]);
  return Acc;
}
function RequiredResolve(T) {
  return IsIntersect(T)
    ? Intersect(FromRest8(T.allOf))
    : IsUnion(T)
      ? Union(FromRest8(T.anyOf))
      : IsObject3(T)
        ? Object2(FromProperties18(T.properties))
        : Object2({});
}
function Required(T, options = {}) {
  if (IsMappedResult(T)) {
    return RequiredFromMappedResult(T, options);
  } else {
    const D = Discard(T, [TransformKind, '$id', 'required']);
    const R = CloneType(RequiredResolve(T), options);
    return { ...D, ...R };
  }
}

// node_modules/@sinclair/typebox/build/esm/type/required/required-from-mapped-result.mjs
function FromProperties19(P, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Required(P[K2], options);
  return Acc;
}
function FromMappedResult12(R, options) {
  return FromProperties19(R.properties, options);
}
function RequiredFromMappedResult(R, options) {
  const P = FromMappedResult12(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/rest/rest.mjs
function RestResolve(T) {
  return IsIntersect(T)
    ? CloneRest(T.allOf)
    : IsUnion(T)
      ? CloneRest(T.anyOf)
      : IsTuple(T)
        ? CloneRest(T.items ?? [])
        : [];
}
function Rest(T) {
  return CloneRest(RestResolve(T));
}
// node_modules/@sinclair/typebox/build/esm/type/return-type/return-type.mjs
function ReturnType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/strict/strict.mjs
function Strict(schema2) {
  return JSON.parse(JSON.stringify(schema2));
}
// node_modules/@sinclair/typebox/build/esm/type/transform/transform.mjs
function Transform(schema2) {
  return new TransformDecodeBuilder(schema2);
}

class TransformDecodeBuilder {
  constructor(schema2) {
    this.schema = schema2;
  }
  Decode(decode2) {
    return new TransformEncodeBuilder(this.schema, decode2);
  }
}

class TransformEncodeBuilder {
  constructor(schema2, decode2) {
    this.schema = schema2;
    this.decode = decode2;
  }
  EncodeTransform(encode2, schema2) {
    const Encode2 = (value11) =>
      schema2[TransformKind].Encode(encode2(value11));
    const Decode2 = (value11) =>
      this.decode(schema2[TransformKind].Decode(value11));
    const Codec = { Encode: Encode2, Decode: Decode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  EncodeSchema(encode2, schema2) {
    const Codec = { Decode: this.decode, Encode: encode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  Encode(encode2) {
    const schema2 = CloneType(this.schema);
    return IsTransform(schema2)
      ? this.EncodeTransform(encode2, schema2)
      : this.EncodeSchema(encode2, schema2);
  }
}
// node_modules/@sinclair/typebox/build/esm/type/void/void.mjs
function Void(options = {}) {
  return {
    ...options,
    [Kind]: 'Void',
    type: 'void',
  };
}
// node_modules/@sinclair/typebox/build/esm/type/type/type.mjs
var exports_type3 = {};
__export(exports_type3, {
  Void: () => Void,
  Uppercase: () => Uppercase,
  Unsafe: () => Unsafe,
  Unknown: () => Unknown,
  Union: () => Union,
  Undefined: () => Undefined,
  Uncapitalize: () => Uncapitalize,
  Uint8Array: () => Uint8Array2,
  Tuple: () => Tuple,
  Transform: () => Transform,
  TemplateLiteral: () => TemplateLiteral,
  Symbol: () => Symbol2,
  String: () => String2,
  Strict: () => Strict,
  ReturnType: () => ReturnType,
  Rest: () => Rest,
  Required: () => Required,
  RegExp: () => RegExp2,
  Ref: () => Ref,
  Recursive: () => Recursive,
  Record: () => Record,
  ReadonlyOptional: () => ReadonlyOptional,
  Readonly: () => Readonly,
  Promise: () => Promise2,
  Pick: () => Pick,
  Partial: () => Partial,
  Parameters: () => Parameters,
  Optional: () => Optional,
  Omit: () => Omit,
  Object: () => Object2,
  Number: () => Number2,
  Null: () => Null,
  Not: () => Not2,
  Never: () => Never,
  Mapped: () => Mapped,
  Lowercase: () => Lowercase,
  Literal: () => Literal,
  KeyOf: () => KeyOf,
  Iterator: () => Iterator,
  Intersect: () => Intersect,
  Integer: () => Integer,
  InstanceType: () => InstanceType,
  Index: () => Index,
  Function: () => Function2,
  Extract: () => Extract,
  Extends: () => Extends,
  Exclude: () => Exclude,
  Enum: () => Enum,
  Deref: () => Deref2,
  Date: () => Date2,
  ConstructorParameters: () => ConstructorParameters,
  Constructor: () => Constructor,
  Const: () => Const,
  Composite: () => Composite,
  Capitalize: () => Capitalize,
  Boolean: () => Boolean,
  BigInt: () => BigInt2,
  Awaited: () => Awaited,
  AsyncIterator: () => AsyncIterator,
  Array: () => Array2,
  Any: () => Any,
});

// node_modules/@sinclair/typebox/build/esm/type/type/index.mjs
var Type = exports_type3;
// node_modules/@sinclair/typebox/build/esm/compiler/compiler.mjs
class TypeCheck {
  constructor(schema3, references, checkFunc, code) {
    this.schema = schema3;
    this.references = references;
    this.checkFunc = checkFunc;
    this.code = code;
    this.hasTransform = HasTransform(schema3, references);
  }
  Code() {
    return this.code;
  }
  Errors(value11) {
    return Errors(this.schema, this.references, value11);
  }
  Check(value11) {
    return this.checkFunc(value11);
  }
  Decode(value11) {
    if (!this.checkFunc(value11))
      throw new TransformDecodeCheckError(
        this.schema,
        value11,
        this.Errors(value11).First()
      );
    return this.hasTransform
      ? TransformDecode(this.schema, this.references, value11)
      : value11;
  }
  Encode(value11) {
    const encoded = this.hasTransform
      ? TransformEncode(this.schema, this.references, value11)
      : value11;
    if (!this.checkFunc(encoded))
      throw new TransformEncodeCheckError(
        this.schema,
        value11,
        this.Errors(value11).First()
      );
    return encoded;
  }
}
var Character;
(function (Character2) {
  function DollarSign(code) {
    return code === 36;
  }
  Character2.DollarSign = DollarSign;
  function IsUnderscore(code) {
    return code === 95;
  }
  Character2.IsUnderscore = IsUnderscore;
  function IsAlpha(code) {
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
  }
  Character2.IsAlpha = IsAlpha;
  function IsNumeric(code) {
    return code >= 48 && code <= 57;
  }
  Character2.IsNumeric = IsNumeric;
})(Character || (Character = {}));
var MemberExpression;
(function (MemberExpression2) {
  function IsFirstCharacterNumeric(value11) {
    if (value11.length === 0) return false;
    return Character.IsNumeric(value11.charCodeAt(0));
  }
  function IsAccessor(value11) {
    if (IsFirstCharacterNumeric(value11)) return false;
    for (let i = 0; i < value11.length; i++) {
      const code = value11.charCodeAt(i);
      const check11 =
        Character.IsAlpha(code) ||
        Character.IsNumeric(code) ||
        Character.DollarSign(code) ||
        Character.IsUnderscore(code);
      if (!check11) return false;
    }
    return true;
  }
  function EscapeHyphen(key) {
    return key.replace(/'/g, "\\'");
  }
  function Encode2(object13, key) {
    return IsAccessor(key)
      ? `${object13}.${key}`
      : `${object13}['${EscapeHyphen(key)}']`;
  }
  MemberExpression2.Encode = Encode2;
})(MemberExpression || (MemberExpression = {}));
var Identifier;
(function (Identifier2) {
  function Encode2($id) {
    const buffer = [];
    for (let i = 0; i < $id.length; i++) {
      const code = $id.charCodeAt(i);
      if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
        buffer.push($id.charAt(i));
      } else {
        buffer.push(`_${code}_`);
      }
    }
    return buffer.join('').replace(/__/g, '_');
  }
  Identifier2.Encode = Encode2;
})(Identifier || (Identifier = {}));
var LiteralString;
(function (LiteralString2) {
  function Escape3(content) {
    return content.replace(/'/g, "\\'");
  }
  LiteralString2.Escape = Escape3;
})(LiteralString || (LiteralString = {}));

class TypeCompilerUnknownTypeError extends TypeBoxError {
  constructor(schema3) {
    super('Unknown type');
    this.schema = schema3;
  }
}

class TypeCompilerTypeGuardError extends TypeBoxError {
  constructor(schema3) {
    super('Preflight validation check failed to guard for the given schema');
    this.schema = schema3;
  }
}
var Policy;
(function (Policy2) {
  function IsExactOptionalProperty(value11, key, expression) {
    return TypeSystemPolicy.ExactOptionalPropertyTypes
      ? `('${key}' in ${value11} ? ${expression} : true)`
      : `(${MemberExpression.Encode(value11, key)} !== undefined ? ${expression} : true)`;
  }
  Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject
      ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}))`
      : `(typeof ${value11} === 'object' && ${value11} !== null)`;
  }
  Policy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject
      ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}) && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))`
      : `(typeof ${value11} === 'object' && ${value11} !== null && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))`;
  }
  Policy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value11) {
    return TypeSystemPolicy.AllowNaN
      ? `typeof ${value11} === 'number'`
      : `Number.isFinite(${value11})`;
  }
  Policy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value11) {
    return TypeSystemPolicy.AllowNullVoid
      ? `(${value11} === undefined || ${value11} === null)`
      : `${value11} === undefined`;
  }
  Policy2.IsVoidLike = IsVoidLike;
})(Policy || (Policy = {}));
var TypeCompiler;
(function (TypeCompiler2) {
  function IsAnyOrUnknown2(schema3) {
    return schema3[Kind] === 'Any' || schema3[Kind] === 'Unknown';
  }
  function* FromAny5(schema3, references, value11) {
    yield 'true';
  }
  function* FromArray16(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    const [parameter, accumulator] = [
      CreateParameter('value', 'any'),
      CreateParameter('acc', 'number'),
    ];
    if (IsNumber(schema3.maxItems))
      yield `${value11}.length <= ${schema3.maxItems}`;
    if (IsNumber(schema3.minItems))
      yield `${value11}.length >= ${schema3.minItems}`;
    const elementExpression = CreateExpression(
      schema3.items,
      references,
      'value'
    );
    yield `${value11}.every((${parameter}) => ${elementExpression})`;
    if (
      IsSchema2(schema3.contains) ||
      IsNumber(schema3.minContains) ||
      IsNumber(schema3.maxContains)
    ) {
      const containsSchema = IsSchema2(schema3.contains)
        ? schema3.contains
        : Never();
      const checkExpression = CreateExpression(
        containsSchema,
        references,
        'value'
      );
      const checkMinContains = IsNumber(schema3.minContains)
        ? [`(count >= ${schema3.minContains})`]
        : [];
      const checkMaxContains = IsNumber(schema3.maxContains)
        ? [`(count <= ${schema3.maxContains})`]
        : [];
      const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
      const check11 = [
        `(count > 0)`,
        ...checkMinContains,
        ...checkMaxContains,
      ].join(' && ');
      yield `((${parameter}) => { ${checkCount}; return ${check11}})(${value11})`;
    }
    if (schema3.uniqueItems === true) {
      const check11 = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
      const block = `const set = new Set(); for(const element of value) { ${check11} }`;
      yield `((${parameter}) => { ${block} )(${value11})`;
    }
  }
  function* FromAsyncIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.asyncIterator in ${value11})`;
  }
  function* FromBigInt6(schema3, references, value11) {
    yield `(typeof ${value11} === 'bigint')`;
    if (IsBigInt(schema3.exclusiveMaximum))
      yield `${value11} < BigInt(${schema3.exclusiveMaximum})`;
    if (IsBigInt(schema3.exclusiveMinimum))
      yield `${value11} > BigInt(${schema3.exclusiveMinimum})`;
    if (IsBigInt(schema3.maximum))
      yield `${value11} <= BigInt(${schema3.maximum})`;
    if (IsBigInt(schema3.minimum))
      yield `${value11} >= BigInt(${schema3.minimum})`;
    if (IsBigInt(schema3.multipleOf))
      yield `(${value11} % BigInt(${schema3.multipleOf})) === 0`;
  }
  function* FromBoolean6(schema3, references, value11) {
    yield `(typeof ${value11} === 'boolean')`;
  }
  function* FromConstructor8(schema3, references, value11) {
    yield* Visit17(schema3.returns, references, `${value11}.prototype`);
  }
  function* FromDate6(schema3, references, value11) {
    yield `(${value11} instanceof Date) && Number.isFinite(${value11}.getTime())`;
    if (IsNumber(schema3.exclusiveMaximumTimestamp))
      yield `${value11}.getTime() < ${schema3.exclusiveMaximumTimestamp}`;
    if (IsNumber(schema3.exclusiveMinimumTimestamp))
      yield `${value11}.getTime() > ${schema3.exclusiveMinimumTimestamp}`;
    if (IsNumber(schema3.maximumTimestamp))
      yield `${value11}.getTime() <= ${schema3.maximumTimestamp}`;
    if (IsNumber(schema3.minimumTimestamp))
      yield `${value11}.getTime() >= ${schema3.minimumTimestamp}`;
    if (IsNumber(schema3.multipleOfTimestamp))
      yield `(${value11}.getTime() % ${schema3.multipleOfTimestamp}) === 0`;
  }
  function* FromFunction7(schema3, references, value11) {
    yield `(typeof ${value11} === 'function')`;
  }
  function* FromInteger6(schema3, references, value11) {
    yield `Number.isInteger(${value11})`;
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum)) yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum)) yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromIntersect18(schema3, references, value11) {
    const check1 = schema3.allOf
      .map((schema4) => CreateExpression(schema4, references, value11))
      .join(' && ');
    if (schema3.unevaluatedProperties === false) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key))`;
      yield `(${check1} && ${check22})`;
    } else if (IsSchema2(schema3.unevaluatedProperties)) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema3.unevaluatedProperties, references, `${value11}[key]`)})`;
      yield `(${check1} && ${check22})`;
    } else {
      yield `(${check1})`;
    }
  }
  function* FromIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.iterator in ${value11})`;
  }
  function* FromLiteral7(schema3, references, value11) {
    if (
      typeof schema3.const === 'number' ||
      typeof schema3.const === 'boolean'
    ) {
      yield `(${value11} === ${schema3.const})`;
    } else {
      yield `(${value11} === '${LiteralString.Escape(schema3.const)}')`;
    }
  }
  function* FromNever6(schema3, references, value11) {
    yield `false`;
  }
  function* FromNot8(schema3, references, value11) {
    const expression = CreateExpression(schema3.not, references, value11);
    yield `(!${expression})`;
  }
  function* FromNull6(schema3, references, value11) {
    yield `(${value11} === null)`;
  }
  function* FromNumber6(schema3, references, value11) {
    yield Policy.IsNumberLike(value11);
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum)) yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum)) yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromObject13(schema3, references, value11) {
    yield Policy.IsObjectLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const knownKeys = Object.getOwnPropertyNames(schema3.properties);
    for (const knownKey of knownKeys) {
      const memberExpression = MemberExpression.Encode(value11, knownKey);
      const property = schema3.properties[knownKey];
      if (schema3.required && schema3.required.includes(knownKey)) {
        yield* Visit17(property, references, memberExpression);
        if (ExtendsUndefinedCheck(property) || IsAnyOrUnknown2(property))
          yield `('${knownKey}' in ${value11})`;
      } else {
        const expression = CreateExpression(
          property,
          references,
          memberExpression
        );
        yield Policy.IsExactOptionalProperty(value11, knownKey, expression);
      }
    }
    if (schema3.additionalProperties === false) {
      if (schema3.required && schema3.required.length === knownKeys.length) {
        yield `Object.getOwnPropertyNames(${value11}).length === ${knownKeys.length}`;
      } else {
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(', ')}]`;
        yield `Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key))`;
      }
    }
    if (typeof schema3.additionalProperties === 'object') {
      const expression = CreateExpression(
        schema3.additionalProperties,
        references,
        `${value11}[key]`
      );
      const keys = `[${knownKeys.map((key) => `'${key}'`).join(', ')}]`;
      yield `(Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key) || ${expression}))`;
    }
  }
  function* FromPromise8(schema3, references, value11) {
    yield `(typeof value === 'object' && typeof ${value11}.then === 'function')`;
  }
  function* FromRecord12(schema3, references, value11) {
    yield Policy.IsRecordLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const [patternKey, patternSchema] = Object.entries(
      schema3.patternProperties
    )[0];
    const variable = CreateVariable(`${new RegExp(patternKey)}`);
    const check1 = CreateExpression(patternSchema, references, 'value');
    const check22 = IsSchema2(schema3.additionalProperties)
      ? CreateExpression(schema3.additionalProperties, references, value11)
      : schema3.additionalProperties === false
        ? 'false'
        : 'true';
    const expression = `(${variable}.test(key) ? ${check1} : ${check22})`;
    yield `(Object.entries(${value11}).every(([key, value]) => ${expression}))`;
  }
  function* FromRef12(schema3, references, value11) {
    const target = Deref(schema3, references);
    if (state.functions.has(schema3.$ref))
      return yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
    yield* Visit17(target, references, value11);
  }
  function* FromRegExp5(schema3, references, value11) {
    const variable = CreateVariable(
      `${new RegExp(schema3.source, schema3.flags)};`
    );
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    yield `${variable}.test(${value11})`;
  }
  function* FromString6(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    if (schema3.pattern !== undefined) {
      const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
      yield `${variable}.test(${value11})`;
    }
    if (schema3.format !== undefined) {
      yield `format('${schema3.format}', ${value11})`;
    }
  }
  function* FromSymbol6(schema3, references, value11) {
    yield `(typeof ${value11} === 'symbol')`;
  }
  function* FromTemplateLiteral7(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
    yield `${variable}.test(${value11})`;
  }
  function* FromThis11(schema3, references, value11) {
    yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
  }
  function* FromTuple15(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    if (schema3.items === undefined) return yield `${value11}.length === 0`;
    yield `(${value11}.length === ${schema3.maxItems})`;
    for (let i = 0; i < schema3.items.length; i++) {
      const expression = CreateExpression(
        schema3.items[i],
        references,
        `${value11}[${i}]`
      );
      yield `${expression}`;
    }
  }
  function* FromUndefined6(schema3, references, value11) {
    yield `${value11} === undefined`;
  }
  function* FromUnion20(schema3, references, value11) {
    const expressions = schema3.anyOf.map((schema4) =>
      CreateExpression(schema4, references, value11)
    );
    yield `(${expressions.join(' || ')})`;
  }
  function* FromUint8Array5(schema3, references, value11) {
    yield `${value11} instanceof Uint8Array`;
    if (IsNumber(schema3.maxByteLength))
      yield `(${value11}.length <= ${schema3.maxByteLength})`;
    if (IsNumber(schema3.minByteLength))
      yield `(${value11}.length >= ${schema3.minByteLength})`;
  }
  function* FromUnknown5(schema3, references, value11) {
    yield 'true';
  }
  function* FromVoid5(schema3, references, value11) {
    yield Policy.IsVoidLike(value11);
  }
  function* FromKind4(schema3, references, value11) {
    const instance = state.instances.size;
    state.instances.set(instance, schema3);
    yield `kind('${schema3[Kind]}', ${instance}, ${value11})`;
  }
  function* Visit17(schema3, references, value11, useHoisting = true) {
    const references_ = IsString(schema3.$id)
      ? [...references, schema3]
      : references;
    const schema_ = schema3;
    if (useHoisting && IsString(schema3.$id)) {
      const functionName = CreateFunctionName(schema3.$id);
      if (state.functions.has(functionName)) {
        return yield `${functionName}(${value11})`;
      } else {
        const functionCode = CreateFunction(
          functionName,
          schema3,
          references,
          'value',
          false
        );
        state.functions.set(functionName, functionCode);
        return yield `${functionName}(${value11})`;
      }
    }
    switch (schema_[Kind]) {
      case 'Any':
        return yield* FromAny5(schema_, references_, value11);
      case 'Array':
        return yield* FromArray16(schema_, references_, value11);
      case 'AsyncIterator':
        return yield* FromAsyncIterator7(schema_, references_, value11);
      case 'BigInt':
        return yield* FromBigInt6(schema_, references_, value11);
      case 'Boolean':
        return yield* FromBoolean6(schema_, references_, value11);
      case 'Constructor':
        return yield* FromConstructor8(schema_, references_, value11);
      case 'Date':
        return yield* FromDate6(schema_, references_, value11);
      case 'Function':
        return yield* FromFunction7(schema_, references_, value11);
      case 'Integer':
        return yield* FromInteger6(schema_, references_, value11);
      case 'Intersect':
        return yield* FromIntersect18(schema_, references_, value11);
      case 'Iterator':
        return yield* FromIterator7(schema_, references_, value11);
      case 'Literal':
        return yield* FromLiteral7(schema_, references_, value11);
      case 'Never':
        return yield* FromNever6(schema_, references_, value11);
      case 'Not':
        return yield* FromNot8(schema_, references_, value11);
      case 'Null':
        return yield* FromNull6(schema_, references_, value11);
      case 'Number':
        return yield* FromNumber6(schema_, references_, value11);
      case 'Object':
        return yield* FromObject13(schema_, references_, value11);
      case 'Promise':
        return yield* FromPromise8(schema_, references_, value11);
      case 'Record':
        return yield* FromRecord12(schema_, references_, value11);
      case 'Ref':
        return yield* FromRef12(schema_, references_, value11);
      case 'RegExp':
        return yield* FromRegExp5(schema_, references_, value11);
      case 'String':
        return yield* FromString6(schema_, references_, value11);
      case 'Symbol':
        return yield* FromSymbol6(schema_, references_, value11);
      case 'TemplateLiteral':
        return yield* FromTemplateLiteral7(schema_, references_, value11);
      case 'This':
        return yield* FromThis11(schema_, references_, value11);
      case 'Tuple':
        return yield* FromTuple15(schema_, references_, value11);
      case 'Undefined':
        return yield* FromUndefined6(schema_, references_, value11);
      case 'Union':
        return yield* FromUnion20(schema_, references_, value11);
      case 'Uint8Array':
        return yield* FromUint8Array5(schema_, references_, value11);
      case 'Unknown':
        return yield* FromUnknown5(schema_, references_, value11);
      case 'Void':
        return yield* FromVoid5(schema_, references_, value11);
      default:
        if (!exports_type.Has(schema_[Kind]))
          throw new TypeCompilerUnknownTypeError(schema3);
        return yield* FromKind4(schema_, references_, value11);
    }
  }
  const state = {
    language: 'javascript',
    functions: new Map(),
    variables: new Map(),
    instances: new Map(),
  };
  function CreateExpression(schema3, references, value11, useHoisting = true) {
    return `(${[...Visit17(schema3, references, value11, useHoisting)].join(' && ')})`;
  }
  function CreateFunctionName($id) {
    return `check_${Identifier.Encode($id)}`;
  }
  function CreateVariable(expression) {
    const variableName = `local_${state.variables.size}`;
    state.variables.set(variableName, `const ${variableName} = ${expression}`);
    return variableName;
  }
  function CreateFunction(
    name,
    schema3,
    references,
    value11,
    useHoisting = true
  ) {
    const [newline, pad] = ['\n', (length) => ''.padStart(length, ' ')];
    const parameter = CreateParameter('value', 'any');
    const returns = CreateReturns('boolean');
    const expression = [...Visit17(schema3, references, value11, useHoisting)]
      .map((expression2) => `${pad(4)}${expression2}`)
      .join(` &&${newline}`);
    return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})\n}`;
  }
  function CreateParameter(name, type47) {
    const annotation = state.language === 'typescript' ? `: ${type47}` : '';
    return `${name}${annotation}`;
  }
  function CreateReturns(type47) {
    return state.language === 'typescript' ? `: ${type47}` : '';
  }
  function Build(schema3, references, options) {
    const functionCode = CreateFunction('check', schema3, references, 'value');
    const parameter = CreateParameter('value', 'any');
    const returns = CreateReturns('boolean');
    const functions = [...state.functions.values()];
    const variables = [...state.variables.values()];
    const checkFunction = IsString(schema3.$id)
      ? `return function check(${parameter})${returns} {\n  return ${CreateFunctionName(schema3.$id)}(value)\n}`
      : `return ${functionCode}`;
    return [...variables, ...functions, checkFunction].join('\n');
  }
  function Code(...args) {
    const defaults = { language: 'javascript' };
    const [schema3, references, options] =
      args.length === 2 && IsArray(args[1])
        ? [args[0], args[1], defaults]
        : args.length === 2 && !IsArray(args[1])
          ? [args[0], [], args[1]]
          : args.length === 3
            ? [args[0], args[1], args[2]]
            : args.length === 1
              ? [args[0], [], defaults]
              : [null, [], defaults];
    state.language = options.language;
    state.variables.clear();
    state.functions.clear();
    state.instances.clear();
    if (!IsSchema2(schema3)) throw new TypeCompilerTypeGuardError(schema3);
    for (const schema4 of references)
      if (!IsSchema2(schema4)) throw new TypeCompilerTypeGuardError(schema4);
    return Build(schema3, references, options);
  }
  TypeCompiler2.Code = Code;
  function Compile(schema3, references = []) {
    const generatedCode = Code(schema3, references, { language: 'javascript' });
    const compiledFunction = globalThis.Function(
      'kind',
      'format',
      'hash',
      generatedCode
    );
    const instances = new Map(state.instances);
    function typeRegistryFunction(kind28, instance, value11) {
      if (!exports_type.Has(kind28) || !instances.has(instance)) return false;
      const checkFunc = exports_type.Get(kind28);
      const schema4 = instances.get(instance);
      return checkFunc(schema4, value11);
    }
    function formatRegistryFunction(format, value11) {
      if (!exports_format.Has(format)) return false;
      const checkFunc = exports_format.Get(format);
      return checkFunc(value11);
    }
    function hashFunction(value11) {
      return Hash(value11);
    }
    const checkFunction = compiledFunction(
      typeRegistryFunction,
      formatRegistryFunction,
      hashFunction
    );
    return new TypeCheck(schema3, references, checkFunction, generatedCode);
  }
  TypeCompiler2.Compile = Compile;
})(TypeCompiler || (TypeCompiler = {}));
// node_modules/elysia/dist/bun/index.js
function k2($) {
  return $ % 4 === 0 && ($ % 100 !== 0 || $ % 400 === 0);
}
function p1($) {
  const W = v2.exec($);
  if (!W) return false;
  const X = +W[1],
    Z = +W[2],
    J = +W[3];
  return Z >= 1 && Z <= 12 && J >= 1 && J <= (Z === 2 && k2(X) ? 29 : u2[Z]);
}
function F1($) {
  return function W(X) {
    const Z = h2.exec(X);
    if (!Z) return false;
    const J = +Z[1],
      j = +Z[2],
      Q = +Z[3],
      Y = Z[4],
      K = Z[5] === '-' ? -1 : 1,
      B = +(Z[6] || 0),
      U = +(Z[7] || 0);
    if (B > 23 || U > 59 || ($ && !Y)) return false;
    if (J <= 23 && j <= 59 && Q < 60) return true;
    const w = j - U * K,
      F = J - B * K - (w < 0 ? 1 : 0);
    return (F === 23 || F === -1) && (w === 59 || w === -1) && Q < 61;
  };
}
function m1($) {
  const W = F1($);
  return function X(Z) {
    const J = Z.split(m2);
    return J.length === 2 && p1(J[0]) && W(J[1]);
  };
}
function p2($) {
  return d2.test($) && c2.test($);
}
function l2($) {
  return (d1.lastIndex = 0), d1.test($);
}
function t2($) {
  return Number.isInteger($) && $ <= n2 && $ >= i2;
}
function s2($) {
  return Number.isInteger($);
}
function c1() {
  return true;
}
function a2($) {
  if (r2.test($)) return false;
  try {
    return new RegExp($), true;
  } catch (W) {
    return false;
  }
}
function J3($, W) {
  if (typeof $ !== 'string')
    throw new TypeError('argument str must be a string');
  var X = {},
    Z = W || {},
    J = Z.decode || Q3,
    j = 0;
  while (j < $.length) {
    var Q = $.indexOf('=', j);
    if (Q === -1) break;
    var Y = $.indexOf(';', j);
    if (Y === -1) Y = $.length;
    else if (Y < Q) {
      j = $.lastIndexOf(';', Q - 1) + 1;
      continue;
    }
    var K = $.slice(j, Q).trim();
    if (X[K] === undefined) {
      var B = $.slice(Q + 1, Y).trim();
      if (B.charCodeAt(0) === 34) B = B.slice(1, -1);
      X[K] = B3(B, J);
    }
    j = Y + 1;
  }
  return X;
}
function j3($, W, X) {
  var Z = X || {},
    J = Z.encode || G3;
  if (typeof J !== 'function') throw new TypeError('option encode is invalid');
  if (!o0.test($)) throw new TypeError('argument name is invalid');
  var j = J(W);
  if (j && !o0.test(j)) throw new TypeError('argument val is invalid');
  var Q = $ + '=' + j;
  if (Z.maxAge != null) {
    var Y = Z.maxAge - 0;
    if (isNaN(Y) || !isFinite(Y))
      throw new TypeError('option maxAge is invalid');
    Q += '; Max-Age=' + Math.floor(Y);
  }
  if (Z.domain) {
    if (!o0.test(Z.domain)) throw new TypeError('option domain is invalid');
    Q += '; Domain=' + Z.domain;
  }
  if (Z.path) {
    if (!o0.test(Z.path)) throw new TypeError('option path is invalid');
    Q += '; Path=' + Z.path;
  }
  if (Z.expires) {
    var K = Z.expires;
    if (!Y3(K) || isNaN(K.valueOf()))
      throw new TypeError('option expires is invalid');
    Q += '; Expires=' + K.toUTCString();
  }
  if (Z.httpOnly) Q += '; HttpOnly';
  if (Z.secure) Q += '; Secure';
  if (Z.partitioned) Q += '; Partitioned';
  if (Z.priority) {
    var B =
      typeof Z.priority === 'string' ? Z.priority.toLowerCase() : Z.priority;
    switch (B) {
      case 'low':
        Q += '; Priority=Low';
        break;
      case 'medium':
        Q += '; Priority=Medium';
        break;
      case 'high':
        Q += '; Priority=High';
        break;
      default:
        throw new TypeError('option priority is invalid');
    }
  }
  if (Z.sameSite) {
    var U =
      typeof Z.sameSite === 'string' ? Z.sameSite.toLowerCase() : Z.sameSite;
    switch (U) {
      case true:
        Q += '; SameSite=Strict';
        break;
      case 'lax':
        Q += '; SameSite=Lax';
        break;
      case 'strict':
        Q += '; SameSite=Strict';
        break;
      case 'none':
        Q += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }
  return Q;
}
function Q3($) {
  return $.indexOf('%') !== -1 ? decodeURIComponent($) : $;
}
function G3($) {
  return encodeURIComponent($);
}
function Y3($) {
  return Z3.call($) === '[object Date]' || $ instanceof Date;
}
function B3($, W) {
  try {
    return W($);
  } catch (X) {
    return $;
  }
}
async function* m0($) {
  const W = $.body;
  if (!W) return;
  const X = W.getReader(),
    Z = new TextDecoder();
  try {
    while (true) {
      const { done: J, value: j } = await X.read();
      if (J) break;
      yield Z.decode(j);
    }
  } finally {
    X.releaseLock();
  }
}
function P3($) {
  let W = $;
  while (W.endsWith('=')) W = W.slice(0, -1);
  return W;
}
function B1($) {
  const W = {};
  if (typeof $ !== 'string') return W;
  let X = '',
    Z = '',
    J = -1,
    j = -1,
    Q = 0;
  const Y = $.length;
  for (let K = 0; K < Y; K++)
    switch ($.charCodeAt(K)) {
      case 38:
        const B = j > J;
        if (!B) j = K;
        if (((X = $.slice(J + 1, j)), B || X.length > 0)) {
          if (Q & 1) X = X.replace(y0, ' ');
          if (Q & 2) X = V0.default(X) || X;
          if (!W[X]) {
            if (B) {
              if (((Z = $.slice(j + 1, K)), Q & 4)) Z = Z.replace(y0, ' ');
              if (Q & 8) Z = V0.default(Z) || Z;
            }
            W[X] = Z;
          }
        }
        (X = ''), (Z = ''), (J = K), (j = K), (Q = 0);
        break;
      case 61:
        if (j <= J) j = K;
        else Q |= 8;
        break;
      case 43:
        if (j > J) Q |= 4;
        else Q |= 1;
        break;
      case 37:
        if (j > J) Q |= 8;
        else Q |= 2;
        break;
    }
  if (J < Y) {
    const K = j > J;
    if (((X = $.slice(J + 1, K ? j : Y)), K || X.length > 0)) {
      if (Q & 1) X = X.replace(y0, ' ');
      if (Q & 2) X = V0.default(X) || X;
      if (!W[X]) {
        if (K) {
          if (((Z = $.slice(j + 1, Y)), Q & 4)) Z = Z.replace(y0, ' ');
          if (Q & 8) Z = V0.default(Z) || Z;
        }
        W[X] = Z;
      }
    }
  }
  return W;
}
var C2 = Object.create;
var {
  getPrototypeOf: S2,
  defineProperty: f1,
  getOwnPropertyNames: L2,
} = Object;
var T2 = Object.prototype.hasOwnProperty;
var w1 = ($, W, X) => {
  X = $ != null ? C2(S2($)) : {};
  const Z =
    W || !$ || !$.__esModule
      ? f1(X, 'default', { value: $, enumerable: true })
      : X;
  for (let J of L2($))
    if (!T2.call(Z, J)) f1(Z, J, { get: () => $[J], enumerable: true });
  return Z;
};
var q2 = ($, W) => () => (W || $((W = { exports: {} }).exports, W), W.exports);
var e0 = q2((J8, o1) => {
  function U3($) {
    var W = $.indexOf('%');
    if (W === -1) return $;
    var X = $.length,
      Z = '',
      J = 0,
      j = 0,
      Q = W,
      Y = r1;
    while (W > -1 && W < X) {
      var K = a1($[W + 1], 4),
        B = a1($[W + 2], 0),
        U = K | B,
        w = P1[U];
      if (((Y = P1[256 + Y + w]), (j = (j << 6) | (U & P1[364 + w])), Y === r1))
        (Z += $.slice(J, Q)),
          (Z +=
            j <= 65535
              ? String.fromCharCode(j)
              : String.fromCharCode(55232 + (j >> 10), 56320 + (j & 1023))),
          (j = 0),
          (J = W + 3),
          (W = Q = $.indexOf('%', J));
      else if (Y === K3) return null;
      else {
        if (((W += 3), W < X && $.charCodeAt(W) === 37)) continue;
        return null;
      }
    }
    return Z + $.slice(J);
  }
  function a1($, W) {
    var X = w3[$];
    return X === undefined ? 255 : X << W;
  }
  var r1 = 12,
    K3 = 0,
    P1 = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4,
      4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0,
      24, 36, 48, 60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7,
    ],
    w3 = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15,
    };
  o1.exports = U3;
});
var q0 = ($, W) => {
  const X = W?.length ? {} : null;
  if (X) for (let Z of W) X[Z.part.charCodeAt(0)] = Z;
  return { part: $, store: null, inert: X, params: null, wildcardStore: null };
};
var y1 = ($, W) => ({ ...$, part: W });
var k1 = ($) => ({ name: $, store: null, inert: null });

class M0 {
  root = {};
  history = [];
  static regex = {
    static: /:.+?(?=\/|$)/,
    params: /:.+?(?=\/|$)/g,
    optionalParams: /:.+?\?(?=\/|$)/g,
  };
  add($, W, X, { ignoreError: Z = false, ignoreHistory: J = false } = {}) {
    if (typeof W !== 'string')
      throw new TypeError('Route path must be a string');
    if (W === '') W = '/';
    else if (W[0] !== '/') W = `/${W}`;
    const j = W[W.length - 1] === '*',
      Q = W.match(M0.regex.optionalParams);
    if (Q) {
      const w = W.replaceAll('?', '');
      this.add($, w, X, { ignoreError: Z });
      for (let F = 0; F < Q.length; F++) {
        let G = W.replace('/' + Q[F], '');
        this.add($, G, X, { ignoreError: true });
      }
      return X;
    }
    if (Q) W = W.replaceAll('?', '');
    if (this.history.find(([w, F, G]) => w === $ && F === W)) return X;
    if (j || (Q && W.charCodeAt(W.length - 1) === 63)) W = W.slice(0, -1);
    if (!J) this.history.push([$, W, X]);
    const Y = W.split(M0.regex.static),
      K = W.match(M0.regex.params) || [];
    if (Y[Y.length - 1] === '') Y.pop();
    let B;
    if (!this.root[$]) B = this.root[$] = q0('/');
    else B = this.root[$];
    let U = 0;
    for (let w = 0; w < Y.length; ++w) {
      let F = Y[w];
      if (w > 0) {
        const G = K[U++].slice(1);
        if (B.params === null) B.params = k1(G);
        else if (B.params.name !== G)
          if (Z) return X;
          else
            throw new Error(
              `Cannot create route "${W}" with parameter "${G}" because a route already exists with a different parameter name ("${B.params.name}") in the same location`
            );
        const z = B.params;
        if (z.inert === null) {
          B = z.inert = q0(F);
          continue;
        }
        B = z.inert;
      }
      for (let G = 0; ; ) {
        if (G === F.length) {
          if (G < B.part.length) {
            const z = y1(B, B.part.slice(G));
            Object.assign(B, q0(F, [z]));
          }
          break;
        }
        if (G === B.part.length) {
          if (B.inert === null) B.inert = {};
          const z = B.inert[F.charCodeAt(G)];
          if (z) {
            (B = z), (F = F.slice(G)), (G = 0);
            continue;
          }
          const D = q0(F.slice(G));
          (B.inert[F.charCodeAt(G)] = D), (B = D);
          break;
        }
        if (F[G] !== B.part[G]) {
          const z = y1(B, B.part.slice(G)),
            D = q0(F.slice(G));
          Object.assign(B, q0(B.part.slice(0, G), [z, D])), (B = D);
          break;
        }
        ++G;
      }
    }
    if (U < K.length) {
      const w = K[U].slice(1);
      if (B.params === null) B.params = k1(w);
      else if (B.params.name !== w)
        if (Z) return X;
        else
          throw new Error(
            `Cannot create route "${W}" with parameter "${w}" because a route already exists with a different parameter name ("${B.params.name}") in the same location`
          );
      if (B.params.store === null) B.params.store = X;
      return B.params.store;
    }
    if (j) {
      if (B.wildcardStore === null) B.wildcardStore = X;
      return B.wildcardStore;
    }
    if (B.store === null) B.store = X;
    return B.store;
  }
  find($, W) {
    const X = this.root[$];
    if (!X) return null;
    return _1(W, W.length, X, 0);
  }
}
var _1 = ($, W, X, Z) => {
  const J = X.part,
    j = J.length,
    Q = Z + j;
  if (j > 1) {
    if (Q > W) return null;
    if (j < 15) {
      for (let Y = 1, K = Z + 1; Y < j; ++Y, ++K)
        if (J.charCodeAt(Y) !== $.charCodeAt(K)) return null;
    } else if ($.slice(Z, Q) !== J) return null;
  }
  if (Q === W) {
    if (X.store !== null) return { store: X.store, params: {} };
    if (X.wildcardStore !== null)
      return { store: X.wildcardStore, params: { '*': '' } };
    return null;
  }
  if (X.inert !== null) {
    const Y = X.inert[$.charCodeAt(Q)];
    if (Y !== undefined) {
      const K = _1($, W, Y, Q);
      if (K !== null) return K;
    }
  }
  if (X.params !== null) {
    const { store: Y, name: K, inert: B } = X.params,
      U = $.indexOf('/', Q);
    if (U !== Q) {
      if (U === -1 || U >= W) {
        if (Y !== null) {
          const w = {};
          return (w[K] = $.substring(Q, W)), { store: Y, params: w };
        }
      } else if (B !== null) {
        const w = _1($, W, B, U);
        if (w !== null) return (w.params[K] = $.substring(Q, U)), w;
      }
    }
  }
  if (X.wildcardStore !== null)
    return { store: X.wildcardStore, params: { '*': $.substring(Q, W) } };
  return null;
};
var E0 = ($) => {
  const W =
      typeof $ === 'object'
        ? $.fn.toString()
        : typeof $ === 'string'
          ? $.toString()
          : $,
    X = W.indexOf(')');
  if (W.charCodeAt(X + 2) === 61 && W.charCodeAt(X + 5) !== 123) return true;
  return W.includes('return');
};
var E2 = ($) => {
  if ($.startsWith('async')) $ = $.slice(5);
  $ = $.trimStart();
  let W = -1;
  if ($.charCodeAt(0) === 40) {
    if (((W = $.indexOf('=>', $.indexOf(')'))), W !== -1)) {
      let J = W;
      while (J > 0) if ($.charCodeAt(--J) === 41) break;
      let j = $.slice(W + 2);
      if (j.charCodeAt(0) === 32) j = j.trimStart();
      return [$.slice(1, J), j, { isArrowReturn: j.charCodeAt(0) !== 123 }];
    }
  }
  if ($.startsWith('function')) {
    W = $.indexOf('(');
    const J = $.indexOf(')');
    return [$.slice(W + 1, J), $.slice(J + 2), { isArrowReturn: false }];
  }
  const X = $.indexOf('(');
  if (X !== -1) {
    const J = $.indexOf('\n', 2),
      j = $.slice(0, J),
      Q = j.lastIndexOf(')') + 1,
      Y = $.slice(J + 1);
    return [j.slice(X, Q), '{' + Y, { isArrowReturn: false }];
  }
  const Z = $.split('\n', 2);
  return [Z[0], Z[1], { isArrowReturn: false }];
};
var H2 = ($) => {
  const W = $.indexOf('{');
  if (W === -1) return [-1, 0];
  let X = W + 1,
    Z = 1;
  for (; X < $.length; X++) {
    const J = $.charCodeAt(X);
    if (J === 123) Z++;
    else if (J === 125) Z--;
    if (Z === 0) break;
  }
  if (Z !== 0) return [0, $.length];
  return [W, X + 1];
};
var R2 = ($) => {
  const W = $.lastIndexOf('}');
  if (W === -1) return [-1, 0];
  let X = W - 1,
    Z = 1;
  for (; X >= 0; X--) {
    const J = $.charCodeAt(X);
    if (J === 125) Z++;
    else if (J === 123) Z--;
    if (Z === 0) break;
  }
  if (Z !== 0) return [-1, 0];
  return [X, W + 1];
};
var v1 = ($) => {
  while (true) {
    const W = $.indexOf(':');
    if (W === -1) break;
    let X = $.indexOf(',', W);
    if (X === -1) X = $.indexOf('}', W) - 1;
    if (X === -2) X = $.length;
    $ = $.slice(0, W) + $.slice(X);
  }
  return $;
};
var u1 = ($) => {
  let W = false;
  if ($.charCodeAt(0) === 40) $ = $.slice(1, -1);
  if ($.charCodeAt(0) === 123) (W = true), ($ = $.slice(1, -1));
  $ = $.replace(/( |\t|\n)/g, '').trim();
  let X = [];
  while (true) {
    let [J, j] = H2($);
    if (J === -1) break;
    if ((X.push($.slice(0, J - 1)), $.charCodeAt(j) === 44)) j++;
    $ = $.slice(j);
  }
  if ((($ = v1($)), $)) X = X.concat($.split(','));
  const Z = [];
  for (let J of X) {
    if (J.indexOf(',') === -1) {
      Z.push(J);
      continue;
    }
    for (let j of J.split(',')) Z.push(j.trim());
  }
  return (X = Z), { hasParenthesis: W, parameters: X };
};
var b2 = ($, W) => {
  const { parameters: X, hasParenthesis: Z } = u1($);
  if (!W.query && X.includes('query')) W.query = true;
  if (!W.headers && X.includes('headers')) W.headers = true;
  if (!W.body && X.includes('body')) W.body = true;
  if (!W.cookie && X.includes('cookie')) W.cookie = true;
  if (!W.set && X.includes('set')) W.set = true;
  if (!W.server && X.includes('server')) W.server = true;
  if (Z) return `{ ${X.join(', ')} }`;
  return X.join(', ');
};
var x2 = ($, W, X) => {
  const Z = W.indexOf($ + '\n', X),
    J = W.indexOf($ + '\t', X),
    j = W.indexOf($ + ',', X),
    Q = W.indexOf($ + ';', X),
    Y = W.indexOf($ + ' ', X);
  return [Z, J, j, Q, Y].filter((K) => K > 0).sort((K, B) => K - B)[0] || -1;
};
var h1 = ($, W, X = 0) => {
  if (X > 5) return [];
  const Z = [];
  let J = W;
  while (true) {
    let j = x2(' = ' + $, J);
    if (j === -1) {
      const K = J.indexOf(' = ' + $);
      if (K + 3 + $.length !== J.length) break;
      j = K;
    }
    const Q = J.slice(0, j);
    let Y = Q.slice(Q.lastIndexOf(' ') + 1);
    if (Y === '}') {
      const [K, B] = R2(Q);
      Z.push(v1(J.slice(K, B))), (J = J.slice(j + 3 + $.length));
      continue;
    }
    while (Y.charCodeAt(0) === 44) Y = Y.slice(1);
    while (Y.charCodeAt(0) === 9) Y = Y.slice(1);
    if (!Y.includes('(')) Z.push(Y);
    J = J.slice(j + 3 + $.length);
  }
  for (let j of Z) {
    if (j.charCodeAt(0) === 123) continue;
    const Q = h1(j, W);
    if (Q.length > 0) Z.push(...Q);
  }
  return Z;
};
var g2 = ($) => {
  if (!$) return;
  if ($.charCodeAt(0) !== 123) return $;
  if ((($ = $.slice(2, -2)), !$.includes(','))) {
    if ($.includes('...')) return $.slice($.indexOf('...') + 3);
    return;
  }
  const X = $.indexOf('...');
  if (X === -1) return;
  return $.slice(X + 3).trimEnd();
};
var f2 = ($, W, X) => {
  const Z = (J, j) =>
    $.includes(j + '.' + J) ||
    $.includes(j + '["' + J + '"]') ||
    $.includes(j + "['" + J + "']");
  for (let J of W) {
    if (!J) continue;
    if (J.charCodeAt(0) === 123) {
      const j = u1(J).parameters;
      if (!X.query && j.includes('query')) X.query = true;
      if (!X.headers && j.includes('headers')) X.headers = true;
      if (!X.body && j.includes('body')) X.body = true;
      if (!X.cookie && j.includes('cookie')) X.cookie = true;
      if (!X.set && j.includes('set')) X.set = true;
      if (!X.query && j.includes('server')) X.server = true;
      continue;
    }
    if (!X.query && Z('query', J)) X.query = true;
    if ($.includes('return ' + J) || $.includes('return ' + J + '.query'))
      X.query = true;
    if (!X.headers && Z('headers', J)) X.headers = true;
    if (!X.body && Z('body', J)) X.body = true;
    if (!X.cookie && Z('cookie', J)) X.cookie = true;
    if (!X.set && Z('set', J)) X.set = true;
    if (!X.server && Z('server', J)) X.server = true;
    if (X.query && X.headers && X.body && X.cookie && X.set && X.server) break;
  }
  return W;
};
var y2 = ($, W, X) => {
  try {
    const Z = new RegExp(`(?:\\w)\\((?:.*)?${$}`, 'gs');
    Z.test(W);
    const J = W.charCodeAt(Z.lastIndex);
    if (J === 41 || J === 44)
      return (
        (X.query = true),
        (X.headers = true),
        (X.body = true),
        (X.cookie = true),
        (X.set = true),
        (X.server = true),
        true
      );
    return false;
  } catch (Z) {
    return (
      console.log(
        '[Sucrose] warning: unexpected isContextPassToFunction error, you may continue development as usual but please report the following to maintainers:'
      ),
      console.log('--- body ---'),
      console.log(W),
      console.log('--- context ---'),
      console.log($),
      true
    );
  }
};
var r0 = (
  $,
  W = {
    query: false,
    headers: false,
    body: false,
    cookie: false,
    set: false,
    server: false,
  }
) => {
  const X = [];
  if ($.handler && typeof $.handler === 'function') X.push($.handler);
  if ($.request?.length) X.push(...$.request);
  if ($.beforeHandle?.length) X.push(...$.beforeHandle);
  if ($.parse?.length) X.push(...$.parse);
  if ($.error?.length) X.push(...$.error);
  if ($.transform?.length) X.push(...$.transform);
  if ($.afterHandle?.length) X.push(...$.afterHandle);
  if ($.mapResponse?.length) X.push(...$.mapResponse);
  if ($.afterResponse?.length) X.push(...$.afterResponse);
  for (let Z of X) {
    if (!Z) continue;
    const J = 'fn' in Z ? Z.fn : Z,
      [j, Q, { isArrowReturn: Y }] = E2(J.toString()),
      K = b2(j, W),
      B = g2(K);
    if (B) {
      const U = h1(B, Q);
      if ((U.splice(0, -1, B), !y2(B, Q, W))) f2(Q, U, W);
      if (!W.query && Q.includes('return ' + B + '.query')) W.query = true;
    }
    if (W.query && W.headers && W.body && W.cookie && W.set && W.server) break;
  }
  return W;
};
var a0 = {
  date: p1,
  time: F1(true),
  'date-time': m1(true),
  'iso-time': F1(false),
  'iso-date-time': m1(false),
  duration:
    /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
  uri: p2,
  'uri-reference':
    /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
  'uri-template':
    /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
  url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
  email:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname:
    /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
  regex: a2,
  uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
  'json-pointer': /^(?:\/(?:[^~/]|~0|~1)*)*$/,
  'json-pointer-uri-fragment':
    /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
  'relative-json-pointer': /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
  byte: l2,
  int32: { type: 'number', validate: t2 },
  int64: { type: 'number', validate: s2 },
  float: { type: 'number', validate: c1 },
  double: { type: 'number', validate: c1 },
  password: true,
  binary: true,
};
var v2 = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var u2 = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var h2 = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
var m2 = /t|\s/i;
var d2 = /\/|:/;
var c2 =
  /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
var d1 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
var i2 = -2147483648;
var n2 = 2147483647;
var r2 = /[^\\]\\Z/;
var n1 =
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
var t1 =
  /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/;
var s1 =
  /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/;
var e2 = a0.date;
var $3 = a0['date-time'];
if (!exports_format.Has('date'))
  TypeSystem.Format('date', ($) => {
    const W = $.replace(/"/g, '');
    if (n1.test(W) || t1.test(W) || s1.test(W) || e2(W)) {
      const X = new Date(W);
      if (!Number.isNaN(X.getTime())) return true;
    }
    return false;
  });
if (!exports_format.Has('date-time'))
  TypeSystem.Format('date-time', ($) => {
    const W = $.replace(/"/g, '');
    if (n1.test(W) || t1.test(W) || s1.test(W) || $3(W)) {
      const X = new Date(W);
      if (!Number.isNaN(X.getTime())) return true;
    }
    return false;
  });
Object.entries(a0).forEach(($) => {
  const [W, X] = $;
  if (!exports_format.Has(W)) {
    if (X instanceof RegExp) TypeSystem.Format(W, (Z) => X.test(Z));
    else if (typeof X === 'function') TypeSystem.Format(W, X);
  }
});
var V = Object.assign({}, Type);
var i1 = ($) => {
  if (typeof $ === 'string')
    switch ($.slice(-1)) {
      case 'k':
        return +$.slice(0, $.length - 1) * 1024;
      case 'm':
        return +$.slice(0, $.length - 1) * 1048576;
      default:
        return +$;
    }
  return $;
};
var M1 = ($, W) => {
  if (!(W instanceof Blob)) return false;
  if ($.minSize && W.size < i1($.minSize)) return false;
  if ($.maxSize && W.size > i1($.maxSize)) return false;
  if ($.extension)
    if (typeof $.extension === 'string') {
      if (!W.type.startsWith($.extension)) return false;
    } else {
      for (let X = 0; X < $.extension.length; X++)
        if (W.type.startsWith($.extension[X])) return true;
      return false;
    }
  return true;
};
var W3 = exports_type.Get('Files') ?? TypeSystem.Type('File', M1);
var X3 =
  exports_type.Get('Files') ??
  TypeSystem.Type('Files', ($, W) => {
    if (!Array.isArray(W)) return M1($, W);
    if ($.minItems && W.length < $.minItems) return false;
    if ($.maxItems && W.length > $.maxItems) return false;
    for (let X = 0; X < W.length; X++) if (!M1($, W[X])) return false;
    return true;
  });
if (!exports_format.Has('numeric'))
  exports_format.Set('numeric', ($) => !!$ && !isNaN(+$));
if (!exports_format.Has('boolean'))
  exports_format.Set('boolean', ($) => $ === 'true' || $ === 'false');
if (!exports_format.Has('ObjectString'))
  exports_format.Set('ObjectString', ($) => {
    let W = $.charCodeAt(0);
    if (W === 9 || W === 10 || W === 32) W = $.trimStart().charCodeAt(0);
    if (W !== 123 && W !== 91) return false;
    try {
      return JSON.parse($), true;
    } catch {
      return false;
    }
  });
if (!exports_format.Has('ArrayString'))
  exports_format.Set('ArrayString', ($) => {
    let W = $.charCodeAt(0);
    if (W === 9 || W === 10 || W === 32) W = $.trimStart().charCodeAt(0);
    if (W !== 123 && W !== 91) return false;
    try {
      return JSON.parse($), true;
    } catch {
      return false;
    }
  });
exports_type.Set('UnionEnum', ($, W) => {
  return (
    (typeof W === 'number' || typeof W === 'string' || W === null) &&
    $.enum.includes(W)
  );
});
var X0 = {
  Numeric: ($) => {
    const W = Type.Number($);
    return V.Transform(
      V.Union([V.String({ format: 'numeric', default: 0 }), V.Number($)], $)
    )
      .Decode((X) => {
        const Z = +X;
        if (isNaN(Z)) return X;
        if ($ && !exports_value2.Check(W, Z)) throw new T('property', W, Z);
        return Z;
      })
      .Encode((X) => X);
  },
  Date: ($) => {
    const W = Type.Date($);
    return V.Transform(
      V.Union(
        [
          Type.Date($),
          V.String({ format: 'date', default: new Date().toISOString() }),
          V.String({ format: 'date-time', default: new Date().toISOString() }),
        ],
        $
      )
    )
      .Decode((X) => {
        if (X instanceof Date) return X;
        const Z = new Date(X);
        if (!exports_value2.Check(W, Z)) throw new T('property', W, Z);
        return Z;
      })
      .Encode((X) => {
        if (typeof X === 'string') return new Date(X);
        return X;
      });
  },
  BooleanString: ($) => {
    const W = Type.Boolean($);
    return V.Transform(
      V.Union(
        [V.String({ format: 'boolean', default: false }), V.Boolean($)],
        $
      )
    )
      .Decode((X) => {
        if (typeof X === 'string') return X === 'true';
        if ($ && !exports_value2.Check(W, X)) throw new T('property', W, X);
        return X;
      })
      .Encode((X) => X);
  },
  ObjectString: ($, W) => {
    const X = V.Object($, W),
      Z = JSON.stringify(exports_value2.Create(X));
    let J;
    try {
      J = TypeCompiler.Compile(X);
    } catch {}
    return V.Transform(
      V.Union([V.String({ format: 'ObjectString', default: Z }), X])
    )
      .Decode((j) => {
        if (typeof j === 'string') {
          if (j.charCodeAt(0) !== 123) throw new T('property', X, j);
          try {
            j = JSON.parse(j);
          } catch {
            throw new T('property', X, j);
          }
          if (J) {
            if (!J.Check(j)) throw new T('property', X, j);
            return J.Decode(j);
          }
          if (!exports_value2.Check(X, j)) throw new T('property', X, j);
          return exports_value2.Decode(X, j);
        }
        return j;
      })
      .Encode((j) => {
        if (typeof j === 'string')
          try {
            j = JSON.parse(j);
          } catch {
            throw new T('property', X, j);
          }
        if (!exports_value2.Check(X, j)) throw new T('property', X, j);
        return JSON.stringify(j);
      });
  },
  ArrayString: ($ = {}, W) => {
    const X = V.Array($, W),
      Z = JSON.stringify(exports_value2.Create(X));
    let J;
    try {
      J = TypeCompiler.Compile(X);
    } catch {}
    return V.Transform(
      V.Union([V.String({ format: 'ArrayString', default: Z }), X])
    )
      .Decode((j) => {
        if (typeof j === 'string') {
          if (j.charCodeAt(0) !== 91) throw new T('property', X, j);
          try {
            j = JSON.parse(j);
          } catch {
            throw new T('property', X, j);
          }
          if (J) {
            if (!J.Check(j)) throw new T('property', X, j);
            return J.Decode(j);
          }
          if (!exports_value2.Check(X, j)) throw new T('property', X, j);
          return exports_value2.Decode(X, j);
        }
        return j;
      })
      .Encode((j) => {
        if (typeof j === 'string')
          try {
            j = JSON.parse(j);
          } catch {
            throw new T('property', X, j);
          }
        if (!exports_value2.Check(X, j)) throw new T('property', X, j);
        return JSON.stringify(j);
      });
  },
  File: W3,
  Files: ($ = {}) =>
    V.Transform(X3($))
      .Decode((W) => {
        if (Array.isArray(W)) return W;
        return [W];
      })
      .Encode((W) => W),
  Nullable: ($) => V.Union([$, V.Null()]),
  MaybeEmpty: ($) => V.Union([$, V.Null(), V.Undefined()]),
  Cookie: (
    $,
    {
      domain: W,
      expires: X,
      httpOnly: Z,
      maxAge: J,
      path: j,
      priority: Q,
      sameSite: Y,
      secure: K,
      secrets: B,
      sign: U,
      ...w
    } = {}
  ) => {
    const F = V.Object($, w);
    return (
      (F.config = {
        domain: W,
        expires: X,
        httpOnly: Z,
        maxAge: J,
        path: j,
        priority: Q,
        sameSite: Y,
        secure: K,
        secrets: B,
        sign: U,
      }),
      F
    );
  },
  UnionEnum: ($, W = {}) => {
    const X = $.every((Z) => typeof Z === 'string')
      ? { type: 'string' }
      : $.every((Z) => typeof Z === 'number')
        ? { type: 'number' }
        : $.every((Z) => Z === null)
          ? { type: 'null' }
          : {};
    if ($.some((Z) => typeof Z === 'object' && Z !== null))
      throw new Error('This type does not support objects or arrays');
    return { default: $[0], ...W, [Kind]: 'UnionEnum', ...X, enum: $ };
  },
};
V.BooleanString = X0.BooleanString;
V.ObjectString = X0.ObjectString;
V.ArrayString = X0.ArrayString;
V.Numeric = X0.Numeric;
V.File = ($ = {}) =>
  X0.File({
    default: 'File',
    ...$,
    extension: $?.type,
    type: 'string',
    format: 'binary',
  });
V.Files = ($ = {}) =>
  X0.Files({
    ...$,
    elysiaMeta: 'Files',
    default: 'Files',
    extension: $?.type,
    type: 'array',
    items: { ...$, default: 'Files', type: 'string', format: 'binary' },
  });
V.Nullable = ($) => X0.Nullable($);
V.MaybeEmpty = X0.MaybeEmpty;
V.Cookie = X0.Cookie;
V.Date = X0.Date;
V.UnionEnum = X0.UnionEnum;
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var D1 = J3;
var N1 = j3;
var Z3 = Object.prototype.toString;
var o0 = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
var $2 = w1(e0(), 1);

class w0 {
  $;
  W;
  X;
  constructor($, W, X = {}) {
    this.name = $;
    this.jar = W;
    this.initial = X;
  }
  get cookie() {
    if (!(this.name in this.jar)) return this.initial;
    return this.jar[this.name];
  }
  set cookie($) {
    if (!(this.name in this.jar)) this.jar[this.name] = this.initial;
    this.jar[this.name] = $;
  }
  get value() {
    return this.cookie.value;
  }
  set value($) {
    if (!(this.name in this.jar)) this.jar[this.name] = this.initial;
    this.jar[this.name].value = $;
  }
  get expires() {
    return this.cookie.expires;
  }
  set expires($) {
    this.cookie.expires = $;
  }
  get maxAge() {
    return this.cookie.maxAge;
  }
  set maxAge($) {
    this.cookie.maxAge = $;
  }
  get domain() {
    return this.cookie.domain;
  }
  set domain($) {
    this.cookie.domain = $;
  }
  get path() {
    return this.cookie.path;
  }
  set path($) {
    this.cookie.path = $;
  }
  get secure() {
    return this.cookie.secure;
  }
  set secure($) {
    this.cookie.secure = $;
  }
  get httpOnly() {
    return this.cookie.httpOnly;
  }
  set httpOnly($) {
    this.cookie.httpOnly = $;
  }
  get sameSite() {
    return this.cookie.sameSite;
  }
  set sameSite($) {
    this.cookie.sameSite = $;
  }
  get priority() {
    return this.cookie.priority;
  }
  set priority($) {
    this.cookie.priority = $;
  }
  get partitioned() {
    return this.cookie.partitioned;
  }
  set partitioned($) {
    this.cookie.partitioned = $;
  }
  get secrets() {
    return this.cookie.secrets;
  }
  set secrets($) {
    this.cookie.secrets = $;
  }
  update($) {
    return (
      (this.cookie = Object.assign(
        this.cookie,
        typeof $ === 'function' ? $(this.cookie) : $
      )),
      this
    );
  }
  set($) {
    return (
      (this.cookie = Object.assign(
        { ...this.initial, value: this.value },
        typeof $ === 'function' ? $(this.cookie) : $
      )),
      this
    );
  }
  remove() {
    if (this.value === undefined) return;
    return this.set({ expires: new Date(0), maxAge: 0, value: '' }), this;
  }
  toString() {
    return typeof this.value === 'object'
      ? JSON.stringify(this.value)
      : (this.value?.toString() ?? '');
  }
}
var e1 = ($, W, X) => {
  if (!$.cookie) $.cookie = {};
  return new Proxy(W, {
    get(Z, J) {
      if (J in W) return new w0(J, $.cookie, Object.assign({}, X ?? {}, W[J]));
      return new w0(J, $.cookie, Object.assign({}, X));
    },
  });
};
var $1 = async ($, W, { secrets: X, sign: Z, ...J } = {}) => {
  if (!W) return e1($, {}, J);
  const j = typeof X === 'string';
  if (Z && Z !== true && !Array.isArray(Z)) Z = [Z];
  const Q = {},
    Y = D1(W);
  for (let [K, B] of Object.entries(Y)) {
    let U = $2.default(B);
    if (Z === true || Z?.includes(K)) {
      if (!X) throw new Error('No secret is provided to cookie plugin');
      if (j) {
        const w = await I1(U, X);
        if (w === false) throw new u0(K);
        U = w;
      } else {
        let w = true;
        for (let F = 0; F < X.length; F++) {
          const G = await I1(U, X[F]);
          if (G !== false) {
            (w = true), (U = G);
            break;
          }
        }
        if (!w) throw new u0(K);
      }
    }
    Q[K] = { value: U };
  }
  return e1($, Q, J);
};
var W2 = 'toJSON' in new Headers();
var n = ($) => {
  if (!$) return false;
  for (let W in $) return true;
  return false;
};
var h0 = ($, W) => {
  const X = $.size;
  if (
    (!W && X) ||
    (X &&
      W &&
      W.status !== 206 &&
      W.status !== 304 &&
      W.status !== 412 &&
      W.status !== 416)
  ) {
    if (W) {
      if (W.headers instanceof Headers) {
        if (W2) W.headers = W.headers.toJSON();
        else
          for (let [Z, J] of W.headers.entries())
            if (Z in W.headers) W.headers[Z] = J;
      }
      return new Response($, {
        status: W.status,
        headers: Object.assign(
          {
            'accept-ranges': 'bytes',
            'content-range': `bytes 0-${X - 1}/${X}`,
          },
          W.headers
        ),
      });
    }
    return new Response($, {
      headers: {
        'accept-ranges': 'bytes',
        'content-range': `bytes 0-${X - 1}/${X}`,
      },
    });
  }
  return new Response($);
};
var X2 = ($, W) => {
  if (!$) return $;
  $.delete('set-cookie');
  for (let X = 0; X < W.length; X++) {
    const Z = W[X].indexOf('=');
    $.append('set-cookie', `${W[X].slice(0, Z)}=${W[X].slice(Z + 1) || ''}`);
  }
  return $;
};
var Z2 = ($) => {
  if (!$ || !n($)) return;
  const W = [];
  for (let [X, Z] of Object.entries($)) {
    if (!X || !Z) continue;
    const J = Z.value;
    if (J === undefined || J === null) continue;
    W.push(N1(X, typeof J === 'object' ? JSON.stringify(J) : J + '', Z));
  }
  if (W.length === 0) return;
  if (W.length === 1) return W[0];
  return W;
};
var B0 = async ($, W, X) => {
  let Z = $.next();
  if (Z instanceof Promise) Z = await Z;
  if (Z.done) {
    if (W) return f(Z.value, W, X);
    return Z0(Z.value, X);
  }
  return new Response(
    new ReadableStream({
      async start(J) {
        let j = false;
        if (
          (X?.signal.addEventListener('abort', () => {
            j = true;
            try {
              J.close();
            } catch {}
          }),
          Z.value !== undefined && Z.value !== null)
        )
          if (typeof Z.value === 'object')
            try {
              J.enqueue(Buffer.from(JSON.stringify(Z.value)));
            } catch {
              J.enqueue(Buffer.from(Z.value.toString()));
            }
          else J.enqueue(Buffer.from(Z.value.toString()));
        for await (let Q of $) {
          if (j) break;
          if (Q === undefined || Q === null) continue;
          if (typeof Q === 'object')
            try {
              J.enqueue(Buffer.from(JSON.stringify(Q)));
            } catch {
              J.enqueue(Buffer.from(Q.toString()));
            }
          else J.enqueue(Buffer.from(Q.toString()));
          await new Promise((Y) => setTimeout(() => Y(), 0));
        }
        try {
          J.close();
        } catch {}
      },
    }),
    {
      ...W,
      headers: {
        'transfer-encoding': 'chunked',
        'content-type': 'text/event-stream; charset=utf-8',
        ...W?.headers,
      },
    }
  );
};
var f = ($, W, X) => {
  if (n(W.headers) || W.status !== 200 || W.redirect || W.cookie) {
    if (typeof W.status === 'string') W.status = _0[W.status];
    if (W.redirect) {
      if (
        ((W.headers.Location = W.redirect),
        !W.status || W.status < 300 || W.status >= 400)
      )
        W.status = 302;
    }
    if (W.cookie && n(W.cookie)) {
      const Z = Z2(W.cookie);
      if (Z) W.headers['set-cookie'] = Z;
    }
    if (W.headers['set-cookie'] && Array.isArray(W.headers['set-cookie']))
      W.headers = X2(new Headers(W.headers), W.headers['set-cookie']);
    switch ($?.constructor?.name) {
      case 'String':
        return new Response($, W);
      case 'Blob':
        return h0($, W);
      case 'Array':
        return Response.json($, W);
      case 'Object':
        const Z = $[c];
        if (Z) return (W.status = Z), f($.response, W, X);
        for (let j in Object.values($))
          switch (j?.constructor?.name) {
            case 'Blob':
            case 'File':
            case 'ArrayBuffer':
            case 'FileRef':
              return new Response(N0($));
            default:
              break;
          }
        return Response.json($, W);
      case 'ReadableStream':
        if (!W.headers['content-type']?.startsWith('text/event-stream'))
          W.headers['content-type'] = 'text/event-stream; charset=utf-8';
        return (
          X?.signal.addEventListener(
            'abort',
            {
              handleEvent() {
                if (!X?.signal.aborted) $.cancel(X);
              },
            },
            { once: true }
          ),
          new Response($, W)
        );
      case undefined:
        if (!$) return new Response('', W);
        return Response.json($, W);
      case 'Response':
        let J = false;
        if (W.headers instanceof Headers)
          for (let j of W.headers.keys())
            if (j === 'set-cookie') {
              if (J) continue;
              J = true;
              for (let Q of W.headers.getSetCookie())
                $.headers.append('set-cookie', Q);
            } else $.headers.append(j, W.headers?.get(j) ?? '');
        else for (let j in W.headers) $.headers.append(j, W.headers[j]);
        if ($.status !== W.status) W.status = $.status;
        if ($.headers.get('transfer-encoding') === 'chunked')
          return B0(m0($), W, X);
        return $;
      case 'Error':
        return K0($, W);
      case 'Promise':
        return $.then((j) => f(j, W));
      case 'Function':
        return f($(), W);
      case 'Number':
      case 'Boolean':
        return new Response($.toString(), W);
      case 'Cookie':
        if ($ instanceof w0) return new Response($.value, W);
        return new Response($?.toString(), W);
      case 'FormData':
        return new Response($, W);
      default:
        if ($ instanceof Response) {
          let j = false;
          if (W.headers instanceof Headers)
            for (let Q of W.headers.keys())
              if (Q === 'set-cookie') {
                if (j) continue;
                j = true;
                for (let Y of W.headers.getSetCookie())
                  $.headers.append('set-cookie', Y);
              } else $.headers.append(Q, W.headers?.get(Q) ?? '');
          else for (let Q in W.headers) $.headers.append(Q, W.headers[Q]);
          if (W2) W.headers = $.headers.toJSON();
          else
            for (let [Q, Y] of $.headers.entries())
              if (Q in W.headers) W.headers[Q] = Y;
          return $;
        }
        if ($ instanceof Promise) return $.then((j) => f(j, W));
        if ($ instanceof Error) return K0($, W);
        if (typeof $?.next === 'function') return B0($, W, X);
        if ('toResponse' in $) return f($.toResponse(), W);
        if ('charCodeAt' in $) {
          const j = $.charCodeAt(0);
          if (j === 123 || j === 91) {
            if (!W.headers['Content-Type'])
              W.headers['Content-Type'] = 'application/json';
            return new Response(JSON.stringify($), W);
          }
        }
        return new Response($, W);
    }
  } else
    switch ($?.constructor?.name) {
      case 'String':
        return new Response($);
      case 'Blob':
        return h0($, W);
      case 'Array':
        return Response.json($);
      case 'Object':
        const Z = $[c];
        if (Z) return (W.status = Z), f($.response, W, X);
        for (let J in Object.values($))
          switch (J?.constructor?.name) {
            case 'Blob':
            case 'File':
            case 'ArrayBuffer':
            case 'FileRef':
              return new Response(N0($), W);
            default:
              break;
          }
        return Response.json($, W);
      case 'ReadableStream':
        return (
          X?.signal.addEventListener(
            'abort',
            {
              handleEvent() {
                if (!X?.signal.aborted) $.cancel(X);
              },
            },
            { once: true }
          ),
          new Response($, {
            headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
          })
        );
      case undefined:
        if (!$) return new Response('');
        return new Response(JSON.stringify($), {
          headers: { 'content-type': 'application/json' },
        });
      case 'Response':
        if ($.headers.get('transfer-encoding') === 'chunked')
          return B0(m0($), W, X);
        return $;
      case 'Error':
        return K0($, W);
      case 'Promise':
        return $.then((J) => {
          const j = Z0(J, X);
          if (j !== undefined) return j;
          return new Response('');
        });
      case 'Function':
        return Z0($(), X);
      case 'Number':
      case 'Boolean':
        return new Response($.toString());
      case 'Cookie':
        if ($ instanceof w0) return new Response($.value, W);
        return new Response($?.toString(), W);
      case 'FormData':
        return new Response($, W);
      default:
        if ($ instanceof Response)
          return new Response($.body, {
            headers: { 'Content-Type': 'application/json' },
          });
        if ($ instanceof Promise) return $.then((J) => f(J, W));
        if ($ instanceof Error) return K0($, W);
        if (typeof $?.next === 'function') return B0($, W, X);
        if ('toResponse' in $) return f($.toResponse(), W);
        if ('charCodeAt' in $) {
          const J = $.charCodeAt(0);
          if (J === 123 || J === 91) {
            if (!W.headers['Content-Type'])
              W.headers['Content-Type'] = 'application/json';
            return new Response(JSON.stringify($), W);
          }
        }
        return new Response($);
    }
};
var v = ($, W, X) => {
  if ($ === undefined || $ === null) return;
  if (n(W.headers) || W.status !== 200 || W.redirect || W.cookie) {
    if (typeof W.status === 'string') W.status = _0[W.status];
    if (W.redirect) {
      if (
        ((W.headers.Location = W.redirect),
        !W.status || W.status < 300 || W.status >= 400)
      )
        W.status = 302;
    }
    if (W.cookie && n(W.cookie)) {
      const Z = Z2(W.cookie);
      if (Z) W.headers['set-cookie'] = Z;
    }
    if (W.headers['set-cookie'] && Array.isArray(W.headers['set-cookie']))
      W.headers = X2(new Headers(W.headers), W.headers['set-cookie']);
    switch ($?.constructor?.name) {
      case 'String':
        return new Response($, W);
      case 'Blob':
        return h0($, W);
      case 'Array':
        return Response.json($, W);
      case 'Object':
        const Z = $[c];
        if (Z) return (W.status = Z), v($.response, W, X);
        for (let j in Object.values($))
          switch (j?.constructor?.name) {
            case 'Blob':
            case 'File':
            case 'ArrayBuffer':
            case 'FileRef':
              return new Response(N0($), W);
            default:
              break;
          }
        return Response.json($, W);
      case 'ReadableStream':
        if (!W.headers['content-type']?.startsWith('text/event-stream'))
          W.headers['content-type'] = 'text/event-stream; charset=utf-8';
        return (
          X?.signal.addEventListener(
            'abort',
            {
              handleEvent() {
                if (!X?.signal.aborted) $.cancel(X);
              },
            },
            { once: true }
          ),
          new Response($, W)
        );
      case undefined:
        if (!$) return;
        return Response.json($, W);
      case 'Response':
        let J = false;
        if (W.headers instanceof Headers)
          for (let j of W.headers.keys())
            if (j === 'set-cookie') {
              if (J) continue;
              J = true;
              for (let Q of W.headers.getSetCookie())
                $.headers.append('set-cookie', Q);
            } else $.headers.append(j, W.headers?.get(j) ?? '');
        else for (let j in W.headers) $.headers.append(j, W.headers[j]);
        if ($.status !== W.status) W.status = $.status;
        if ($.headers.get('transfer-encoding') === 'chunked')
          return B0(m0($), W, X);
        return $;
      case 'Promise':
        return $.then((j) => {
          const Q = v(j, W);
          if (Q !== undefined) return Q;
        });
      case 'Error':
        return K0($, W);
      case 'Function':
        return v($(), W);
      case 'Number':
      case 'Boolean':
        return new Response($.toString(), W);
      case 'FormData':
        return new Response($);
      case 'Cookie':
        if ($ instanceof w0) return new Response($.value, W);
        return new Response($?.toString(), W);
      default:
        if ($ instanceof Response) {
          let j = false;
          if (W.headers instanceof Headers)
            for (let Q of W.headers.keys())
              if (Q === 'set-cookie') {
                if (j) continue;
                j = true;
                for (let Y of W.headers.getSetCookie())
                  $.headers.append('set-cookie', Y);
              } else $.headers.append(Q, W.headers?.get(Q) ?? '');
          else for (let Q in W.headers) $.headers.append(Q, W.headers[Q]);
          if ($.status !== W.status) W.status = $.status;
          return $;
        }
        if ($ instanceof Promise) return $.then((j) => v(j, W));
        if ($ instanceof Error) return K0($, W);
        if (typeof $?.next === 'function') return B0($, W, X);
        if ('toResponse' in $) return v($.toResponse(), W);
        if ('charCodeAt' in $) {
          const j = $.charCodeAt(0);
          if (j === 123 || j === 91) {
            if (!W.headers['Content-Type'])
              W.headers['Content-Type'] = 'application/json';
            return new Response(JSON.stringify($), W);
          }
        }
        return new Response($, W);
    }
  } else
    switch ($?.constructor?.name) {
      case 'String':
        return new Response($);
      case 'Blob':
        return h0($, W);
      case 'Array':
        return Response.json($);
      case 'Object':
        const Z = $[c];
        if (Z) return (W.status = Z), v($.response, W, X);
        for (let J in Object.values($))
          switch (J?.constructor?.name) {
            case 'Blob':
            case 'File':
            case 'ArrayBuffer':
            case 'FileRef':
              return new Response(N0($), W);
            default:
              break;
          }
        return Response.json($, W);
      case 'ReadableStream':
        return (
          X?.signal.addEventListener(
            'abort',
            {
              handleEvent() {
                if (!X?.signal.aborted) $.cancel(X);
              },
            },
            { once: true }
          ),
          new Response($, {
            headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
          })
        );
      case undefined:
        if (!$) return new Response('');
        return new Response(JSON.stringify($), {
          headers: { 'content-type': 'application/json' },
        });
      case 'Response':
        if ($.headers.get('transfer-encoding') === 'chunked') return B0(m0($));
        return $;
      case 'Promise':
        return $.then((J) => {
          const j = v(J, W);
          if (j !== undefined) return j;
        });
      case 'Error':
        return K0($, W);
      case 'Function':
        return Z0($(), X);
      case 'Number':
      case 'Boolean':
        return new Response($.toString());
      case 'Cookie':
        if ($ instanceof w0) return new Response($.value, W);
        return new Response($?.toString(), W);
      case 'FormData':
        return new Response($);
      default:
        if ($ instanceof Response)
          return new Response($.body, {
            headers: { 'Content-Type': 'application/json' },
          });
        if ($ instanceof Promise) return $.then((J) => v(J, W));
        if ($ instanceof Error) return K0($, W);
        if (typeof $?.next === 'function') return B0($, W, X);
        if ('toResponse' in $) return v($.toResponse(), W);
        if ('charCodeAt' in $) {
          const J = $.charCodeAt(0);
          if (J === 123 || J === 91) {
            if (!W.headers['Content-Type'])
              W.headers['Content-Type'] = 'application/json';
            return new Response(JSON.stringify($), W);
          }
        }
        return new Response($);
    }
};
var Z0 = ($, W) => {
  switch ($?.constructor?.name) {
    case 'String':
      return new Response($);
    case 'Blob':
      return h0($);
    case 'Array':
      return Response.json($);
    case 'Object':
      if ($[c]) return f($.response, { status: $[c], headers: {} });
      $: for (let X of Object.values($))
        switch (X?.constructor?.name) {
          case 'Blob':
          case 'File':
          case 'ArrayBuffer':
          case 'FileRef':
            return new Response(N0($));
          case 'Object':
            break $;
          default:
            break;
        }
      return Response.json($);
    case 'ReadableStream':
      return (
        W?.signal.addEventListener(
          'abort',
          {
            handleEvent() {
              if (!W?.signal.aborted) $.cancel(W);
            },
          },
          { once: true }
        ),
        new Response($, {
          headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
        })
      );
    case undefined:
      if (!$) return new Response('');
      return new Response(JSON.stringify($), {
        headers: { 'content-type': 'application/json' },
      });
    case 'Response':
      if ($.headers.get('transfer-encoding') === 'chunked') return B0(m0($));
      return $;
    case 'Error':
      return K0($);
    case 'Promise':
      return $.then((X) => Z0(X, W));
    case 'Function':
      return Z0($(), W);
    case 'Number':
    case 'Boolean':
      return new Response($.toString());
    case 'FormData':
      return new Response($);
    default:
      if ($ instanceof Response)
        return new Response($.body, {
          headers: { 'Content-Type': 'application/json' },
        });
      if ($ instanceof Promise) return $.then((X) => Z0(X, W));
      if ($ instanceof Error) return K0($);
      if (typeof $?.next === 'function') return B0($, undefined, W);
      if ('toResponse' in $) return Z0($.toResponse());
      if ('charCodeAt' in $) {
        const X = $.charCodeAt(0);
        if (X === 123 || X === 91)
          return new Response(JSON.stringify($), {
            headers: { 'Content-Type': 'application/json' },
          });
      }
      return new Response($);
  }
};
var K0 = ($, W) =>
  new Response(
    JSON.stringify({ name: $?.name, message: $?.message, cause: $?.cause }),
    {
      status: W?.status !== 200 ? (W?.status ?? 500) : 500,
      headers: W?.headers,
    }
  );
var J2 = ($, W, X = {}) => {
  if (typeof $ === 'function') return;
  const Z = f($, { headers: X });
  if (
    W.parse.length === 0 &&
    W.transform.length === 0 &&
    W.beforeHandle.length === 0 &&
    W.afterHandle.length === 0
  )
    return Z.clone.bind(Z);
};
var b0 = ($, W) => {
  const X = new URL($);
  return (X.pathname = W), X.toString();
};
var _3 = ($) =>
  (typeof $ === 'function' && /^\s*class\s+/.test($.toString())) ||
  ($.toString().startsWith('[object ') && $.toString() !== '[object Object]') ||
  n(Object.getPrototypeOf($));
var A1 = ($) => $ && typeof $ === 'object' && !Array.isArray($);
var p = ($, W, { skipKeys: X, override: Z = true } = {}) => {
  if (!A1($) || !A1(W)) return $;
  for (let [J, j] of Object.entries(W)) {
    if (X?.includes(J)) continue;
    if (!A1(j) || !(J in $) || _3(j)) {
      if (Z || !(J in $)) $[J] = j;
      continue;
    }
    $[J] = p($[J], j, { skipKeys: X, override: Z });
  }
  return $;
};
var F3 = ($, W) => {
  const { properties: X, ...Z } = $ ?? {},
    { properties: J, ...j } = W ?? {};
  return p(Z, j);
};
var x = ($ = [], W = []) => {
  if (!$) return [];
  if (!W) return $;
  const X = [],
    Z = [];
  if (!Array.isArray($)) $ = [$];
  if (!Array.isArray(W)) W = [W];
  for (let J of $) if ((X.push(J), J.checksum)) Z.push(J.checksum);
  for (let J of W) if (!Z.includes(J.checksum)) X.push(J);
  return X;
};
var M3 = [
  'start',
  'request',
  'parse',
  'transform',
  'resolve',
  'beforeHandle',
  'afterHandle',
  'mapResponse',
  'afterResponse',
  'trace',
  'error',
  'stop',
  'body',
  'headers',
  'params',
  'query',
  'response',
  'type',
  'detail',
];
var z3 = M3.reduce(($, W) => (($[W] = true), $), {});
var Y2 = ($, W) => {
  const X = (Z) => typeof Z === 'object' && Object.keys(Z).every(J1);
  if (X($) && X(W)) return { ...$, ...W };
  return W ?? $;
};
var x0 = ($, W) => {
  return {
    body: W?.body ?? $?.body,
    headers: W?.headers ?? $?.headers,
    params: W?.params ?? $?.params,
    query: W?.query ?? $?.query,
    cookie: W?.cookie ?? $?.cookie,
    response: Y2($?.response, W?.response),
  };
};
var i = ($, W) => {
  return {
    ...$,
    ...W,
    body: W?.body ?? $?.body,
    headers: W?.headers ?? $?.headers,
    params: W?.params ?? $?.params,
    query: W?.query ?? $?.query,
    cookie: W?.cookie ?? $?.cookie,
    response: Y2($?.response, W?.response),
    type: $?.type || W?.type,
    detail: p(W?.detail ?? {}, $?.detail ?? {}),
    parse: x($?.parse, W?.parse),
    transform: x($?.transform, W?.transform),
    beforeHandle: x($?.beforeHandle, W?.beforeHandle),
    afterHandle: x($?.afterHandle, W?.afterHandle),
    mapResponse: x($?.mapResponse, W?.mapResponse),
    afterResponse: x($?.afterResponse, W?.afterResponse),
    trace: x($?.trace, W?.trace),
    error: x($?.error, W?.error),
  };
};
var B2 = ($, W, X = true) => {
  if (!Array.isArray(W)) return m($, W, X);
  for (let Z of W) $ = m($, Z, X);
  return $;
};
var m = ($, W, X = true) => {
  if (!$) return $;
  if (W.untilObjectFound && !X && $.type === 'object') return $;
  const Z = W.from[Kind];
  if ($.oneOf) {
    for (let Q = 0; Q < $.oneOf.length; Q++) $.oneOf[Q] = m($.oneOf[Q], W, X);
    return $;
  }
  if ($.anyOf) {
    for (let Q = 0; Q < $.anyOf.length; Q++) $.anyOf[Q] = m($.anyOf[Q], W, X);
    return $;
  }
  if ($.allOf) {
    for (let Q = 0; Q < $.allOf.length; Q++) $.allOf[Q] = m($.allOf[Q], W, X);
    return $;
  }
  if ($.not) {
    for (let Q = 0; Q < $.not.length; Q++) $.not[Q] = m($.not[Q], W, X);
    return $;
  }
  const J = X && !!W.excludeRoot;
  if ($[Kind] === Z) {
    const {
        anyOf: Q,
        oneOf: Y,
        allOf: K,
        not: B,
        properties: U,
        items: w,
        ...F
      } = $,
      G = W.to();
    let z;
    const D = (M) => {
      if (U && M.type === 'object') {
        const I = {};
        for (let [O, H] of Object.entries(U)) I[O] = m(H, W, false);
        return { ...F, ...M, properties: I };
      }
      if (w && M.type === 'array') return { ...F, ...M, items: m(w, W, false) };
      const N = { ...F, ...M };
      if (
        (delete N.required,
        U &&
          M.type === 'string' &&
          M.format === 'ObjectString' &&
          M.default === '{}')
      )
        (z = V.ObjectString(U, F)),
          (N.default = JSON.stringify(exports_value2.Create(V.Object(U)))),
          (N.properties = U);
      if (
        w &&
        M.type === 'string' &&
        M.format === 'ArrayString' &&
        M.default === '[]'
      )
        (z = V.ArrayString(w, F)),
          (N.default = JSON.stringify(exports_value2.Create(V.Array(w)))),
          (N.items = w);
      return N;
    };
    if (J) {
      if (U) {
        const M = {};
        for (let [N, I] of Object.entries(U)) M[N] = m(I, W, false);
        return { ...F, properties: M };
      } else if (w?.map) return { ...F, items: w.map((M) => m(M, W, false)) };
      return F;
    }
    if (G.anyOf)
      for (let M = 0; M < G.anyOf.length; M++) G.anyOf[M] = D(G.anyOf[M]);
    else if (G.oneOf)
      for (let M = 0; M < G.oneOf.length; M++) G.oneOf[M] = D(G.oneOf[M]);
    else if (G.allOf)
      for (let M = 0; M < G.allOf.length; M++) G.allOf[M] = D(G.allOf[M]);
    else if (G.not)
      for (let M = 0; M < G.not.length; M++) G.not[M] = D(G.not[M]);
    if (z) G[TransformKind] = z[TransformKind];
    if (G.anyOf || G.oneOf || G.allOf || G.not) return G;
    if (U) {
      const M = {};
      for (let [N, I] of Object.entries(U)) M[N] = m(I, W, false);
      return { ...F, ...G, properties: M };
    } else if (w?.map)
      return { ...F, ...G, items: w.map((M) => m(M, W, false)) };
    return { ...F, ...G };
  }
  const j = $?.properties;
  if (j)
    for (let [Q, Y] of Object.entries(j))
      switch (Y[Kind]) {
        case Z:
          const { anyOf: K, oneOf: B, allOf: U, not: w, type: F, ...G } = Y,
            z = W.to();
          if (z.anyOf)
            for (let D = 0; D < z.anyOf.length; D++)
              z.anyOf[D] = { ...G, ...z.anyOf[D] };
          else if (z.oneOf)
            for (let D = 0; D < z.oneOf.length; D++)
              z.oneOf[D] = { ...G, ...z.oneOf[D] };
          else if (z.allOf)
            for (let D = 0; D < z.allOf.length; D++)
              z.allOf[D] = { ...G, ...z.allOf[D] };
          else if (z.not)
            for (let D = 0; D < z.not.length; D++)
              z.not[D] = { ...G, ...z.not[D] };
          j[Q] = { ...G, ...m(G, W, false) };
          break;
        case 'Object':
        case 'Union':
          j[Q] = m(Y, W, false);
          break;
        default:
          if (Y.items)
            for (let D = 0; D < Y.items.length; D++)
              Y.items[D] = m(Y.items[D], W, false);
          else if (Y.anyOf || Y.oneOf || Y.allOf || Y.not)
            j[Q] = m(Y, W, false);
          break;
      }
  return $;
};
var d = (
  $,
  {
    models: W = {},
    dynamic: X = false,
    normalize: Z = false,
    additionalProperties: J = false,
    coerce: j = false,
    additionalCoerce: Q = [],
  } = {}
) => {
  if (!$) return;
  if (typeof $ === 'string' && !($ in W)) return;
  let Y = typeof $ === 'string' ? W[$] : $;
  if (j)
    Y = B2(Y, [
      { from: V.Number(), to: () => V.Numeric(), untilObjectFound: true },
      {
        from: V.Boolean(),
        to: () => V.BooleanString(),
        untilObjectFound: true,
      },
      ...(Array.isArray(Q) ? Q : [Q]),
    ]);
  if (Y.type === 'object' && 'additionalProperties' in Y === false)
    Y.additionalProperties = J;
  const K = (U) => exports_value2.Clean(Y, U);
  if (X) {
    const U = {
      schema: Y,
      references: '',
      checkFunc: () => {},
      code: '',
      Check: (w) => exports_value2.Check(Y, w),
      Errors: (w) => exports_value2.Errors(Y, w),
      Code: () => '',
      Clean: K,
      Decode: (w) => exports_value2.Decode(Y, w),
      Encode: (w) => exports_value2.Encode(Y, w),
    };
    if (Z && Y.additionalProperties === false) U.Clean = K;
    if (Y.config) {
      if (((U.config = Y.config), U?.schema?.config)) delete U.schema.config;
    }
    return (
      (U.parse = (w) => {
        try {
          return U.Decode(w);
        } catch (F) {
          throw [...U.Errors(w)].map(o);
        }
      }),
      (U.safeParse = (w) => {
        try {
          return { success: true, data: U.Decode(w), error: null };
        } catch (F) {
          const G = [...B.Errors(w)].map(o);
          return {
            success: false,
            data: null,
            error: G[0]?.summary,
            errors: G,
          };
        }
      }),
      U
    );
  }
  const B = TypeCompiler.Compile(Y, Object.values(W));
  if (((B.Clean = K), Y.config)) {
    if (((B.config = Y.config), B?.schema?.config)) delete B.schema.config;
  }
  return (
    (B.parse = (U) => {
      try {
        return B.Decode(U);
      } catch (w) {
        throw [...B.Errors(U)].map(o);
      }
    }),
    (B.safeParse = (U) => {
      try {
        return { success: true, data: B.Decode(U), error: null };
      } catch (w) {
        const F = [...B.Errors(U)].map(o);
        return { success: false, data: null, error: F[0]?.summary, errors: F };
      }
    }),
    B
  );
};
var W1 = (
  $,
  {
    models: W = {},
    dynamic: X = false,
    normalize: Z = false,
    additionalProperties: J = false,
  }
) => {
  if (!$) return;
  if (typeof $ === 'string' && !($ in W)) return;
  const j = typeof $ === 'string' ? W[$] : $,
    Q = (K, B) => {
      const U = (F) => {
        if (!F || typeof F !== 'object') return exports_value2.Clean(K, F);
        if (Array.isArray(F)) F = exports_value2.Clean(K, F);
        else F = exports_value2.Clean(K, F);
        return F;
      };
      if (X)
        return {
          schema: K,
          references: '',
          checkFunc: () => {},
          code: '',
          Check: (F) => exports_value2.Check(K, F),
          Errors: (F) => exports_value2.Errors(K, F),
          Code: () => '',
          Decode: (F) => exports_value2.Decode(K, F),
          Encode: (F) => exports_value2.Encode(K, F),
        };
      const w = TypeCompiler.Compile(K, B);
      if (Z && K.additionalProperties === false) w.Clean = U;
      return w;
    };
  if (Kind in j) {
    if ('additionalProperties' in j === false) j.additionalProperties = J;
    return { 200: Q(j, Object.values(W)) };
  }
  const Y = {};
  return (
    Object.keys(j).forEach((K) => {
      const B = j[+K];
      if (typeof B === 'string') {
        if (B in W) {
          const U = W[B];
          U.type === 'object' && 'additionalProperties' in U,
            (Y[+K] = Kind in U ? Q(U, Object.values(W)) : U);
        }
        return;
      }
      if (B.type === 'object' && 'additionalProperties' in B === false)
        B.additionalProperties = J;
      Y[+K] = Kind in B ? Q(B, Object.values(W)) : B;
    }),
    Y
  );
};
var D3 = typeof Bun !== 'undefined';
var N3 = D3 && typeof Bun.hash === 'function';
var P0 = ($) => {
  if (N3) return Bun.hash($);
  let W = 9;
  for (let X = 0; X < $.length; )
    W = Math.imul(W ^ $.charCodeAt(X++), 387420489);
  return (W = W ^ (W >>> 9));
};
var O1;
var D0 = () => {
  if (!O1)
    O1 = [
      { from: V.Object({}), to: () => V.ObjectString({}), excludeRoot: true },
      { from: V.Array(V.Any()), to: () => V.ArrayString(V.Any()) },
    ];
  return O1;
};
var X1 = ({
  validator: $,
  defaultConfig: W = {},
  config: X,
  dynamic: Z,
  models: J,
}) => {
  let j = d($, {
    dynamic: Z,
    models: J,
    additionalProperties: true,
    coerce: true,
    additionalCoerce: D0(),
  });
  if (n(W))
    if (j) j.config = F3(j.config, X);
    else
      (j = d(V.Cookie({}), {
        dynamic: Z,
        models: J,
        additionalProperties: true,
      })),
        (j.config = W);
  return j;
};
var J0 = ($, W) => {
  if (!W) return;
  if (!Array.isArray(W)) {
    const Z = W;
    if ($ && !Z.checksum) Z.checksum = $;
    if (Z.scope === 'scoped') Z.scope = 'local';
    return Z;
  }
  const X = [...W];
  for (let Z of X) {
    if ($ && !Z.checksum) Z.checksum = $;
    if (Z.scope === 'scoped') Z.scope = 'local';
  }
  return X;
};
var V1 = ($, W, X) => {
  return {
    start: x($.start, J0(X, W?.start)),
    request: x($.request, J0(X, W?.request)),
    parse: x($.parse, J0(X, W?.parse)),
    transform: x($.transform, J0(X, W?.transform)),
    beforeHandle: x($.beforeHandle, J0(X, W?.beforeHandle)),
    afterHandle: x($.afterHandle, J0(X, W?.afterHandle)),
    mapResponse: x($.mapResponse, J0(X, W?.mapResponse)),
    afterResponse: x($.afterResponse, J0(X, W?.afterResponse)),
    trace: x($.trace, J0(X, W?.trace)),
    error: x($.error, J0(X, W?.error)),
    stop: x($.stop, J0(X, W?.stop)),
  };
};
var K2 = ($, W, { skipIfHasType: X = false } = {}) => {
  if (!$) return $;
  if (!Array.isArray($)) {
    if (X) $.scope ??= W;
    else $.scope = W;
    return $;
  }
  for (let Z of $)
    if (X) Z.scope ??= W;
    else Z.scope = W;
  return $;
};
var z0 = ($) => {
  if (!$) return $;
  if (!Array.isArray($))
    switch ($.scope) {
      case 'global':
      case 'scoped':
        return { ...$ };
      default:
        return { fn: $ };
    }
  const W = [];
  for (let X of $)
    switch (X.scope) {
      case 'global':
      case 'scoped':
        W.push({ ...X });
        break;
    }
  return W;
};
var C1 = ($) => {
  return {
    ...$,
    type: $?.type,
    detail: $?.detail,
    parse: z0($?.parse),
    transform: z0($?.transform),
    beforeHandle: z0($?.beforeHandle),
    afterHandle: z0($?.afterHandle),
    mapResponse: z0($?.mapResponse),
    afterResponse: z0($?.afterResponse),
    error: z0($?.error),
    trace: z0($?.trace),
  };
};
var _0 = {
  Continue: 100,
  'Switching Protocols': 101,
  Processing: 102,
  'Early Hints': 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  'Non-Authoritative Information': 203,
  'No Content': 204,
  'Reset Content': 205,
  'Partial Content': 206,
  'Multi-Status': 207,
  'Already Reported': 208,
  'Multiple Choices': 300,
  'Moved Permanently': 301,
  Found: 302,
  'See Other': 303,
  'Not Modified': 304,
  'Temporary Redirect': 307,
  'Permanent Redirect': 308,
  'Bad Request': 400,
  Unauthorized: 401,
  'Payment Required': 402,
  Forbidden: 403,
  'Not Found': 404,
  'Method Not Allowed': 405,
  'Not Acceptable': 406,
  'Proxy Authentication Required': 407,
  'Request Timeout': 408,
  Conflict: 409,
  Gone: 410,
  'Length Required': 411,
  'Precondition Failed': 412,
  'Payload Too Large': 413,
  'URI Too Long': 414,
  'Unsupported Media Type': 415,
  'Range Not Satisfiable': 416,
  'Expectation Failed': 417,
  "I'm a teapot": 418,
  'Misdirected Request': 421,
  'Unprocessable Content': 422,
  Locked: 423,
  'Failed Dependency': 424,
  'Too Early': 425,
  'Upgrade Required': 426,
  'Precondition Required': 428,
  'Too Many Requests': 429,
  'Request Header Fields Too Large': 431,
  'Unavailable For Legal Reasons': 451,
  'Internal Server Error': 500,
  'Not Implemented': 501,
  'Bad Gateway': 502,
  'Service Unavailable': 503,
  'Gateway Timeout': 504,
  'HTTP Version Not Supported': 505,
  'Variant Also Negotiates': 506,
  'Insufficient Storage': 507,
  'Loop Detected': 508,
  'Not Extended': 510,
  'Network Authentication Required': 511,
};
var Z1 = Object.fromEntries(Object.entries(_0).map(([$, W]) => [W, $]));
var Q2 = new TextEncoder();
var g0 = async ($, W) => {
  if (typeof $ !== 'string')
    throw new TypeError('Cookie value must be provided as a string.');
  if (W === null) throw new TypeError('Secret key must be provided.');
  const X = await crypto.subtle.importKey(
      'raw',
      Q2.encode(W),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    ),
    Z = await crypto.subtle.sign('HMAC', X, Q2.encode($));
  return $ + '.' + P3(Buffer.from(Z).toString('base64'));
};
var I1 = async ($, W) => {
  if (typeof $ !== 'string')
    throw new TypeError('Signed cookie string must be provided.');
  if (W === null) throw new TypeError('Secret key must be provided.');
  const X = $.slice(0, $.lastIndexOf('.'));
  return (await g0(X, W)) === $ ? X : false;
};
var U2 = ($, W) => {
  if (!$ || typeof $ !== 'object' || !W) return;
  for (let [X, Z] of Object.entries(W)) {
    if (X in z3 || !(X in $)) continue;
    const J = $[X];
    if (typeof J === 'function') J(Z), delete W[X];
  }
};
var w2 =
  ({ globalHook: $, localHook: W }) =>
  (X) =>
  (Z, J) => {
    if (typeof Z === 'function') Z = { fn: Z };
    if ('fn' in Z || Array.isArray(Z)) {
      if (!W[X]) W[X] = [];
      if (typeof W[X] === 'function') W[X] = [W[X]];
      if (Array.isArray(Z)) W[X] = W[X].concat(Z);
      else W[X].push(Z);
      return;
    }
    const { insert: j = 'after', stack: Q = 'local' } = Z;
    if (typeof J === 'function') J = { fn: J };
    if (Q === 'global')
      if (!Array.isArray(J))
        if (j === 'before') $[X].unshift(J);
        else $[X].push(J);
      else if (j === 'before') $[X] = J.concat($[X]);
      else $[X] = $[X].concat(J);
    else {
      if (!W[X]) W[X] = [];
      if (typeof W[X] === 'function') W[X] = [W[X]];
      if (!Array.isArray(J))
        if (j === 'before') W[X].unshift(J);
        else W[X].push(J);
      else if (j === 'before') W[X] = J.concat(W[X]);
      else W[X] = W[X].concat(J);
    }
  };
var I3 = ($) => {
  if (typeof $ === 'number') return $;
  if ($.length < 16) {
    if ($.trim().length === 0) return null;
    const W = Number($);
    if (Number.isNaN(W)) return null;
    return W;
  }
  if ($.length === 16) {
    if ($.trim().length === 0) return null;
    const W = Number($);
    if (Number.isNaN(W) || W.toString() !== $) return null;
    return W;
  }
  return null;
};
var J1 = ($) => I3($) !== null;

class S1 {
  $;
  root = null;
  promises = [];
  constructor($ = console.error) {
    this.onError = $;
  }
  get size() {
    return this.promises.length;
  }
  add($) {
    return this.promises.push($), (this.root ||= this.drain()), $;
  }
  async drain() {
    while (this.promises.length > 0) {
      try {
        await this.promises[0];
      } catch ($) {
        this.onError($);
      }
      this.promises.shift();
    }
    this.root = null;
  }
  then($, W) {
    return (this.root ?? Promise.resolve()).then($, W);
  }
}
var t = ($) => {
  if (!$) return $;
  if (!Array.isArray($)) {
    if (typeof $ === 'function') return { fn: $ };
    else if ('fn' in $) return $;
  }
  const W = [];
  for (let X of $)
    if (typeof X === 'function') W.push({ fn: X });
    else if ('fn' in X) W.push(X);
  return W;
};
var _2 = ($) => {
  return {
    ...$,
    start: t($?.start),
    request: t($?.request),
    parse: t($?.parse),
    transform: t($?.transform),
    beforeHandle: t($?.beforeHandle),
    afterHandle: t($?.afterHandle),
    mapResponse: t($?.mapResponse),
    afterResponse: t($?.afterResponse),
    trace: t($?.trace),
    error: t($?.error),
    stop: t($?.stop),
  };
};
var L1 = ($) => {
  return {
    ...$,
    start: $.start?.map((W) => W.fn),
    request: $.request?.map((W) => W.fn),
    parse: $.parse?.map((W) => W.fn),
    transform: $.transform?.map((W) => W.fn),
    beforeHandle: $.beforeHandle?.map((W) => W.fn),
    afterHandle: $.afterHandle?.map((W) => W.fn),
    afterResponse: $.afterResponse?.map((W) => W.fn),
    mapResponse: $.mapResponse?.map((W) => W.fn),
    trace: $.trace?.map((W) => W.fn),
    error: $.error?.map((W) => W.fn),
    stop: $.stop?.map((W) => W.fn),
  };
};
var d0 = ($) => ({
  body: $.body,
  cookie: $.cookie,
  headers: $.headers,
  query: $.query,
  set: $.set,
  server: $.server,
});
var c0 = ($, W = 302) => Response.redirect($, W);
var A3 = Symbol('ElysiaFormData');
var I0 = Symbol('ElysiaRequestId');
var N0 = ($) => {
  const W = new FormData();
  for (let [X, Z] of Object.entries($)) {
    if (Array.isArray(Z)) {
      for (let J of Z) {
        if (Z instanceof File) W.append(X, Z, Z.name);
        W.append(X, J);
      }
      continue;
    }
    if (Z instanceof File) W.append(X, Z, Z.name);
    W.append(X, Z);
  }
  return W;
};
var j1 = () => crypto.getRandomValues(new Uint32Array(1))[0];
var Q1 = ($) => {
  const W = [];
  for (let X = 0; X < $.length; X++) {
    const Z = $[X];
    if (Z.checksum) {
      if (W.includes(Z.checksum)) $.splice(X, 1), X--;
      W.push(Z.checksum);
    }
  }
  return $;
};
var u = ($, W = 'scoped') => {
  if (W === 'scoped') {
    for (let X of $)
      if ('scope' in X && X.scope === 'local') X.scope = 'scoped';
    return;
  }
  for (let X of $) if ('scope' in X) X.scope = 'global';
};
var F2 =
  typeof Bun !== 'undefined'
    ? Bun.env
    : typeof process !== 'undefined'
      ? process?.env
      : undefined;
var A0 = Symbol('ElysiaErrorCode');
var c = Symbol('ElysiaResponse');
var l0 = (F2?.NODE_ENV ?? F2?.ENV) === 'production';
var T1 = ($, W) => {
  const X = W ?? ($ in Z1 ? Z1[$] : $);
  return {
    [c]: _0[$] ?? $,
    response: X,
    _type: undefined,
    error: new Error(X),
  };
};

class G1 extends Error {
  code = 'INTERNAL_SERVER_ERROR';
  status = 500;
  constructor($) {
    super($ ?? 'INTERNAL_SERVER_ERROR');
  }
}

class O0 extends Error {
  code = 'NOT_FOUND';
  status = 404;
  constructor($) {
    super($ ?? 'NOT_FOUND');
  }
}

class Y1 extends Error {
  code = 'PARSE';
  status = 400;
  constructor() {
    super('Failed to parse body');
  }
}

class u0 extends Error {
  $;
  code = 'INVALID_COOKIE_SIGNATURE';
  status = 400;
  constructor($, W) {
    super(W ?? `"${$}" has invalid cookie signature`);
    this.key = $;
  }
}
var o = ($) => {
  if (!$) return { summary: undefined };
  const { message: W, path: X, value: Z, type: J } = $,
    j = X.slice(1).replaceAll('/', '.'),
    Q = X === '';
  switch (J) {
    case 42:
      return {
        ...$,
        summary: Q
          ? 'Value should not be provided'
          : `Property '${j}' should not be provided`,
      };
    case 45:
      return {
        ...$,
        summary: Q ? 'Value is missing' : `Property '${j}' is missing`,
      };
    case 50:
      const Y = W.indexOf("'"),
        K = W.slice(Y + 1, W.indexOf("'", Y + 1));
      return {
        ...$,
        summary: Q
          ? 'Value should be an email'
          : `Property '${j}' should be ${K}`,
      };
    case 54:
      return {
        ...$,
        summary: `${W.slice(0, 9)} property '${j}' to be ${W.slice(8)} but found: ${Z}`,
      };
    case 62:
      const B = $.schema.anyOf
        .map((U) => `'${U?.format ?? U.type}'`)
        .join(', ');
      return {
        ...$,
        summary: Q
          ? `Value should be one of ${B}`
          : `Property '${j}' should be one of: ${B}`,
      };
    default:
      return { summary: W, ...$ };
  }
};

class T extends Error {
  $;
  W;
  X;
  code = 'VALIDATION';
  status = 422;
  constructor($, W, X) {
    if (X && typeof X === 'object' && c in X) X = X.response;
    const Z = l0
        ? undefined
        : 'Errors' in W
          ? W.Errors(X).First()
          : exports_value2.Errors(W, X).First(),
      J =
        Z?.schema.error !== undefined
          ? typeof Z.schema.error === 'function'
            ? Z.schema.error({
                type: $,
                validator: W,
                value: X,
                get errors() {
                  return [...W.Errors(X)].map(o);
                },
              })
            : Z.schema.error
          : undefined,
      j = Z?.path || 'root';
    let Q = '';
    if (J !== undefined) Q = typeof J === 'object' ? JSON.stringify(J) : J + '';
    else if (l0)
      Q = JSON.stringify({
        type: 'validation',
        on: $,
        summary: o(Z).summary,
        message: Z?.message,
        found: X,
      });
    else {
      const Y = W?.schema ?? W,
        K =
          'Errors' in W
            ? [...W.Errors(X)].map(o)
            : [...exports_value2.Errors(W, X)].map(o);
      let B;
      try {
        B = exports_value2.Create(Y);
      } catch (U) {
        B = {
          type: 'Could not create expected value',
          message: U?.message,
          error: U,
        };
      }
      Q = JSON.stringify(
        {
          type: 'validation',
          on: $,
          summary: K[0]?.summary,
          property: j,
          message: Z?.message,
          expected: B,
          found: X,
          errors: K,
        },
        null,
        2
      );
    }
    super(Q);
    this.type = $;
    this.validator = W;
    this.value = X;
    Object.setPrototypeOf(this, T.prototype);
  }
  get all() {
    return 'Errors' in this.validator
      ? [...this.validator.Errors(this.value)].map(o)
      : [...exports_value2.Errors(this.validator, this.value)].map(o);
  }
  static simplifyModel($) {
    const W = 'schema' in $ ? $.schema : $;
    try {
      return exports_value2.Create(W);
    } catch {
      return W;
    }
  }
  get model() {
    return T.simplifyModel(this.validator);
  }
  toResponse($) {
    return new Response(this.message, {
      status: 400,
      headers: { ...$, 'content-type': 'application/json' },
    });
  }
}
var q1 = {
  open($) {
    $.data.open?.($);
  },
  message($, W) {
    $.data.message?.($, W);
  },
  drain($) {
    $.data.drain?.($);
  },
  close($, W, X) {
    $.data.close?.($, W, X);
  },
};

class f0 {
  $;
  W;
  validator;
  _validator;
  constructor($, W) {
    this.raw = $;
    this.data = W;
    if (((this.validator = $.data.validator), $.data.id)) this.id = $.data.id;
    else this.id = j1().toString();
  }
  get id() {
    return this.raw.data.id;
  }
  set id($) {
    this.raw.data.id = $;
  }
  get publish() {
    return ($, W = undefined, X) => {
      if (this.validator?.Check(W) === false)
        throw new T('message', this.validator, W);
      if (typeof W === 'object') W = JSON.stringify(W);
      return this.raw.publish($, W, X), this;
    };
  }
  get send() {
    return ($) => {
      if (this.validator?.Check($) === false)
        throw new T('message', this.validator, $);
      if (Buffer.isBuffer($)) return this.raw.send($), this;
      if (typeof $ === 'object') $ = JSON.stringify($);
      return this.raw.send($), this;
    };
  }
  get subscribe() {
    return ($) => {
      return this.raw.subscribe($), this;
    };
  }
  get unsubscribe() {
    return ($) => {
      return this.raw.unsubscribe($), this;
    };
  }
  get cork() {
    return ($) => {
      return this.raw.cork($), this;
    };
  }
  get close() {
    return () => {
      return this.raw.close(), this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
}
var E1 = '1.1.12';
var V0 = w1(e0(), 1);
var y0 = /\+/g;
var i0 = ($) => {
  const W = {};
  if (typeof $ !== 'string') return W;
  const X = $.length;
  let Z = '',
    J = '',
    j = -1,
    Q = -1,
    Y = false,
    K = false,
    B = false,
    U = false,
    w = false,
    F = 0;
  for (let G = 0; G < X + 1; G++) {
    if (G !== X) F = $.charCodeAt(G);
    else F = 38;
    switch (F) {
      case 38: {
        if (((w = Q > j), !w)) Q = G;
        if (((Z = $.slice(j + 1, Q)), w || Z.length > 0)) {
          if (B) Z = Z.replace(y0, ' ');
          if (Y) Z = V0.default(Z) || Z;
          if (w) {
            if (((J = $.slice(Q + 1, G)), U)) J = J.replace(y0, ' ');
            if (K) J = V0.default(J) || J;
          }
          const z = W[Z];
          if (z === undefined) W[Z] = J;
          else if (z.pop) z.push(J);
          else W[Z] = [z, J];
        }
        (J = ''),
          (j = G),
          (Q = G),
          (Y = false),
          (K = false),
          (B = false),
          (U = false);
        break;
      }
      case 61:
        if (Q <= j) Q = G;
        else K = true;
        break;
      case 43:
        if (Q > j) U = true;
        else B = true;
        break;
      case 37:
        if (Q > j) K = true;
        else Y = true;
        break;
    }
  }
  return W;
};
var z2 = w1(e0(), 1);
var n0 = Symbol('ElysiaTrace');
var F0 = () => {
  const { promise: $, resolve: W } = Promise.withResolvers(),
    { promise: X, resolve: Z } = Promise.withResolvers(),
    { promise: J, resolve: j } = Promise.withResolvers(),
    Q = [],
    Y = [];
  return [
    (K) => {
      if (K) Q.push(K);
      return $;
    },
    (K) => {
      const B = [],
        U = [];
      let w = null;
      for (let G = 0; G < (K.total ?? 0); G++) {
        const { promise: z, resolve: D } = Promise.withResolvers(),
          { promise: M, resolve: N } = Promise.withResolvers(),
          { promise: I, resolve: O } = Promise.withResolvers(),
          H = [],
          C = [];
        B.push((g) => {
          if (g) H.push(g);
          return z;
        }),
          U.push((g) => {
            const R = {
              ...g,
              end: M,
              error: I,
              index: G,
              onStop(E) {
                if (E) C.push(E);
                return M;
              },
            };
            D(R);
            for (let E = 0; E < H.length; E++) H[E](R);
            return (E = null) => {
              const k = performance.now();
              if (E) w = E;
              const b = {
                end: k,
                error: E,
                get elapsed() {
                  return k - g.begin;
                },
              };
              for (let G0 = 0; G0 < C.length; G0++) C[G0](b);
              N(k), O(E);
            };
          });
      }
      const F = {
        ...K,
        end: X,
        error: J,
        onEvent(G) {
          for (let z = 0; z < B.length; z++) B[z](G);
        },
        onStop(G) {
          if (G) Y.push(G);
          return X;
        },
      };
      W(F);
      for (let G = 0; G < Q.length; G++) Q[G](F);
      return {
        resolveChild: U,
        resolve(G = null) {
          const z = performance.now();
          if (!G && w) G = w;
          const D = {
            end: z,
            error: G,
            get elapsed() {
              return z - K.begin;
            },
          };
          for (let M = 0; M < Y.length; M++) Y[M](D);
          Z(z), j(G);
        },
      };
    },
  ];
};
var M2 = ($) => {
  return (W) => {
    const [X, Z] = F0(),
      [J, j] = F0(),
      [Q, Y] = F0(),
      [K, B] = F0(),
      [U, w] = F0(),
      [F, G] = F0(),
      [z, D] = F0(),
      [M, N] = F0(),
      [I, O] = F0();
    return (
      $({
        id: W[I0],
        context: W,
        set: W.set,
        onRequest: X,
        onParse: J,
        onTransform: Q,
        onBeforeHandle: K,
        onHandle: U,
        onAfterHandle: F,
        onMapResponse: M,
        onAfterResponse: I,
        onError: z,
      }),
      {
        request: Z,
        parse: j,
        transform: Y,
        beforeHandle: B,
        handle: w,
        afterHandle: G,
        error: D,
        mapResponse: N,
        afterResponse: O,
      }
    );
  };
};
var V3 = new Headers().toJSON;
var D2 = {
  optional: Symbol.for('TypeBox.Optional'),
  kind: Symbol.for('TypeBox.Kind'),
};
var s = ($) => {
  if (!$) return false;
  const W = $?.schema;
  return !!W && D2.optional in W;
};
var j0 = ($) => {
  if (!$) return false;
  const W = $?.schema ?? $;
  if (W.anyOf) return W.anyOf.some(j0);
  if (W.someOf) return W.someOf.some(j0);
  if (W.allOf) return W.allOf.some(j0);
  if (W.not) return W.not.some(j0);
  if (W.type === 'object') {
    const X = W.properties;
    if ('additionalProperties' in W) return W.additionalProperties;
    for (let Z of Object.keys(X)) {
      const J = X[Z];
      if (J.type === 'object') {
        if (j0(J)) return true;
      } else if (J.anyOf) {
        for (let j = 0; j < J.anyOf.length; j++)
          if (j0(J.anyOf[j])) return true;
      }
      return J.additionalProperties;
    }
    return false;
  }
  return false;
};
var R1 = ({ context: $ = 'c', trace: W, addFn: X }) => {
  if (!W.length)
    return () => {
      return {
        resolveChild() {
          return () => {};
        },
        resolve() {},
      };
    };
  for (let Z = 0; Z < W.length; Z++)
    X(
      `let report${Z}, reportChild${Z}, reportErr${Z}, reportErrChild${Z}; let trace${Z} = ${$}[ELYSIA_TRACE]?.[${Z}] ?? trace[${Z}](${$});\n`
    );
  return (Z, { name: J, total: j = 0 } = {}) => {
    if (!J) J = 'anonymous';
    const Q = Z === 'error' ? 'reportErr' : 'report';
    for (let Y = 0; Y < W.length; Y++)
      X(
        `\n${Q}${Y} = trace${Y}.${Z}({id,event: '${Z}',name: '${J}',begin: performance.now(),total: ${j}})\n`
      );
    return {
      resolve() {
        for (let Y = 0; Y < W.length; Y++) X(`\n${Q}${Y}.resolve()\n`);
      },
      resolveChild(Y) {
        for (let K = 0; K < W.length; K++)
          X(
            `${Q}Child${K} = ${Q}${K}.resolveChild?.shift()?.({id,event: '${Z}',name: '${Y}',begin: performance.now()})\n`
          );
        return (K) => {
          for (let B = 0; B < W.length; B++)
            if (K)
              X(`
                             	if (${K} instanceof Error)
                    				${Q}Child${B}?.(${K})
                           		else
                             		${Q}Child${B}?.()\n`);
            else X(`${Q}Child${B}?.()\n`);
        };
      },
    };
  };
};
var C3 = ({ injectResponse: $ = '', normalize: W = false, validator: X }) => ({
  composeValidation: (Z, J = `c.${Z}`) =>
    `c.set.status = 422; throw new ValidationError('${Z}', validator.${Z}, ${J})`,
  composeResponseValidation: (Z = 'r') => {
    let J = '\n' + $ + '\n';
    (J += `if(typeof ${Z} === "object" && ${Z} && ELYSIA_RESPONSE in ${Z}) {
			c.set.status = ${Z}[ELYSIA_RESPONSE]
			${Z} = ${Z}.response
		}

		const isResponse = ${Z} instanceof Response\n\n`),
      (J += 'switch(c.set.status) {\n');
    for (let [j, Q] of Object.entries(X.response)) {
      if (
        ((J += `\tcase ${j}:
				if (!isResponse) {\n`),
        W && 'Clean' in Q && !j0(Q))
      )
        J += `${Z} = validator.response['${j}'].Clean(${Z})\n`;
      J += `if(validator.response['${j}'].Check(${Z}) === false) {
					c.set.status = 422

					throw new ValidationError('response', validator.response['${j}'], ${Z})
				}

				c.set.status = ${j}
			}

			break\n\n`;
    }
    return (J += '\n}\n'), J;
  },
});
var d8 = Symbol.for('TypeBox.Kind');
var C0 = ($, W) => {
  if (!W) return;
  if (W.type === 'object') {
    const X = W.properties;
    if (!X) return false;
    for (let Z of Object.keys(X)) {
      const J = X[Z];
      if ($ in J) return true;
      if (J.type === 'object') {
        if (C0($, J)) return true;
      } else if (J.anyOf) {
        for (let j = 0; j < J.anyOf.length; j++)
          if (C0($, J.anyOf[j])) return true;
      }
    }
    return false;
  }
  return $ in W;
};
var H1 = Symbol.for('TypeBox.Transform');
var S0 = ($) => {
  if (!$) return;
  if ($.type === 'object' && $.properties) {
    const W = $.properties;
    for (let X of Object.keys(W)) {
      const Z = W[X];
      if (Z.type === 'object') {
        if (S0(Z)) return true;
      } else if (Z.anyOf) {
        for (let j = 0; j < Z.anyOf.length; j++)
          if (S0(Z.anyOf[j])) return true;
      }
      if (H1 in Z) return true;
    }
    return false;
  }
  return H1 in $ || ($.properties && H1 in $.properties);
};
var S3 = /(?:return|=>) \S+\(/g;
var L0 = ($) => {
  return ($?.fn ?? $).constructor.name === 'AsyncFunction';
};
var y = ($) => {
  const W = $?.fn ?? $;
  if (W.constructor.name === 'AsyncFunction') return true;
  const X = W.toString();
  if (X.includes('=> response.clone(')) return false;
  if (X.includes('await')) return true;
  if (X.includes('async')) return true;
  return !!X.match(S3);
};
var K1 = ($) => {
  const W = $?.fn ?? $;
  return (
    W.constructor.name === 'AsyncGeneratorFunction' ||
    W.constructor.name === 'GeneratorFunction'
  );
};
var N2 = ({
  app: $,
  path: W,
  method: X,
  localHook: Z,
  hooks: J,
  validator: j,
  handler: Q,
  allowMeta: Y = false,
  inference: K,
}) => {
  const B = typeof Q === 'function';
  if (!B) {
    if (
      ((Q = f(Q, { headers: $.setHeaders ?? {} })),
      J.parse.length === 0 &&
        J.transform.length === 0 &&
        J.beforeHandle.length === 0 &&
        J.afterHandle.length === 0)
    )
      return Function('a', 'return function () { return a.clone() }')(Q);
  }
  const U = B ? 'handler(c)' : 'handler',
    w = J.afterResponse.length > 0,
    F = J.trace.length > 0;
  let G = '';
  if (((K = r0(Object.assign(Z, { handler: Q }), K)), K.server))
    G += `\nObject.defineProperty(c, 'server', {
			get: function() { return getServer() }
		})\n`;
  if (K.body) G += 'let isParsing = false\n';
  j.createBody?.(),
    j.createQuery?.(),
    j.createHeaders?.(),
    j.createParams?.(),
    j.createCookie?.(),
    j.createResponse?.();
  const z = K.query || !!j.query,
    D =
      X !== '$INTERNALWS' &&
      X !== 'GET' &&
      X !== 'HEAD' &&
      (K.body || !!j.body || J.parse.length),
    M = $.setHeaders,
    N = M && !!Object.keys(M).length,
    I = K.headers || j.headers,
    O = K.cookie || !!j.cookie,
    H = O
      ? X1({
          validator: j.cookie,
          defaultConfig: $.config.cookie,
          dynamic: !!$.config.aot,
          config: j.cookie?.config ?? {},
          models: $.definitions.type,
        })
      : undefined,
    C = H?.config;
  let g = '';
  if (C?.sign) {
    if (!C.secrets)
      throw new Error(
        `t.Cookie required secret which is not set in (${X}) ${W}.`
      );
    const P = !C.secrets
      ? undefined
      : typeof C.secrets === 'string'
        ? C.secrets
        : C.secrets[0];
    if (
      ((g += `const _setCookie = c.set.cookie
		if(_setCookie) {`),
      C.sign === true)
    )
      g += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${P}')
			}`;
    else
      for (let _ of C.sign)
        g += `if(_setCookie['${_}']?.value) { c.set.cookie['${_}'].value = await signCookie(_setCookie['${_}'].value, '${P}') }\n`;
    g += '}\n';
  }
  const R = $.config.normalize,
    { composeValidation: E, composeResponseValidation: k } = C3({
      normalize: R,
      validator: j,
    });
  if (I)
    G += V3
      ? 'c.headers = c.request.headers.toJSON()\n'
      : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  if (O) {
    const P = (A, S) => {
        const L = C?.[A] ?? S;
        if (!L) return typeof S === 'string' ? `${A}: "${S}",` : `${A}: ${S},`;
        if (typeof L === 'string') return `${A}: '${L}',`;
        if (L instanceof Date) return `${A}: new Date(${L.getTime()}),`;
        return `${A}: ${L},`;
      },
      _ = C
        ? `{
			secrets: ${C.secrets !== undefined ? (typeof C.secrets === 'string' ? `'${C.secrets}'` : '[' + C.secrets.reduce((A, S) => A + `'${S}',`, '') + ']') : 'undefined'},
			sign: ${C.sign === true ? true : C.sign !== undefined ? '[' + C.sign.reduce((A, S) => A + `'${S}',`, '') + ']' : 'undefined'},
			${P('domain')}
			${P('expires')}
			${P('httpOnly')}
			${P('maxAge')}
			${P('path', '/')}
			${P('priority')}
			${P('sameSite')}
			${P('secure')}
		}`
        : 'undefined';
    if (I)
      G += `\nc.cookie = await parseCookie(c.set, c.headers.cookie, ${_})\n`;
    else
      G += `\nc.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${_})\n`;
  }
  if (z) {
    const P = [];
    if (j.query && j.query.schema.type === 'object') {
      const _ = j.query.schema.properties;
      if (!j0(j.query))
        for (let [A, S] of Object.entries(_)) {
          let L = S;
          if (L && D2.optional in L && L.type === 'array' && L.items)
            L = L.items;
          const { type: a, anyOf: q } = L,
            U0 =
              a === 'array' ||
              q?.some((h) => h.type === 'string' && h.format === 'ArrayString');
          P.push({
            key: A,
            isArray: U0,
            isNestedObjectArray:
              (U0 && L.items?.type === 'object') ||
              !!L.items?.anyOf?.some(
                (h) => h.type === 'object' || h.type === 'array'
              ),
            isObject:
              a === 'object' ||
              q?.some((h) => h.type === 'string' && h.format === 'ArrayString'),
            anyOf: !!q,
          });
        }
    }
    if (!P.length)
      G += `if(c.qi === -1) {
				c.query = {}
			} else {
				c.query = parseQueryFromURL(c.url.slice(c.qi + 1))
			}`;
    else
      G += `if(c.qi !== -1) {
				let url = '&' + c.url.slice(c.qi + 1)

				${P.map(
          (
            {
              key: _,
              isArray: A,
              isObject: S,
              isNestedObjectArray: L,
              anyOf: a,
            },
            q
          ) => {
            const U0 = `${q === 0 ? 'let' : ''} memory = url.indexOf('&${_}=')
							let a${q}\n`;
            if (A)
              return (
                U0 +
                (L
                  ? `while (memory !== -1) {
											const start = memory + ${_.length + 2}
											memory = url.indexOf('&', start)

											if(a${q} === undefined)
												a${q} = ''
											else
												a${q} += ','

											let temp

											if(memory === -1) temp = decodeURIComponent(url.slice(start))
											else temp = decodeURIComponent(url.slice(start, memory))

											const charCode = temp.charCodeAt(0)
											if(charCode !== 91 && charCode !== 123)
												temp = '"' + temp + '"'

											a${q} += temp

											if(memory === -1) break

											memory = url.indexOf('&${_}=', memory)
											if(memory === -1) break
										}

										try {
										    if(a${q}.charCodeAt(0) === 91)
												a${q} = JSON.parse(a${q})
											else
												a${q} = JSON.parse('[' + a${q} + ']')
										} catch {}\n`
                  : `while (memory !== -1) {
											const start = memory + ${_.length + 2}
											memory = url.indexOf('&', start)

											if(a${q} === undefined)
												a${q} = []

											if(memory === -1) {
												a${q}.push(decodeURIComponent(url.slice(start)))
												break
											}
											else a${q}.push(decodeURIComponent(url.slice(start, memory)))

											memory = url.indexOf('&${_}=', memory)
											if(memory === -1) break
										}\n`)
              );
            if (S)
              return (
                U0 +
                `if (memory !== -1) {
										const start = memory + ${_.length + 2}
										memory = url.indexOf('&', start)

										if(memory === -1) a${q} = decodeURIComponent(url.slice(start))
										else a${q} = decodeURIComponent(url.slice(start, memory))

										if (a${q} !== undefined) {
											try {
												a${q} = JSON.parse(a${q})
											} catch {}
										}
									}`
              );
            return (
              U0 +
              `if (memory !== -1) {
										const start = memory + ${_.length + 2}
										memory = url.indexOf('&', start)

										if(memory === -1) a${q} = decodeURIComponent(url.slice(start))
										else {
											a${q} = decodeURIComponent(url.slice(start, memory))

											${
                        a
                          ? `
											let deepMemory = url.indexOf('&${_}=', memory)

											if(deepMemory !== -1) {
												a${q} = [a${q}]
												let first = true

												while(true) {
													const start = deepMemory + ${_.length + 2}
													if(first)
														first = false
													else
														deepMemory = url.indexOf('&', start)

													let value
													if(deepMemory === -1) value = decodeURIComponent(url.slice(start))
													else value = decodeURIComponent(url.slice(start, deepMemory))

													const vStart = value.charCodeAt(0)
													const vEnd = value.charCodeAt(value.length - 1)

													if((vStart === 91 && vEnd === 93) || (vStart === 123 && vEnd === 125))
														try {
															a${q}.push(JSON.parse(value))
														} catch {
														 	a${q}.push(value)
														}

													if(deepMemory === -1) break
												}
											}
												`
                          : ''
                      }
										}
									}`
            );
          }
        ).join('\n')}

				c.query = {
					${P.map(({ key: _ }, A) => `'${_}': a${A}`).join(', ')}
				}
			} else {
				c.query = {}
			}`;
  }
  if (F) G += '\nconst id = c[ELYSIA_REQUEST_ID]\n';
  const b = R1({
    trace: J.trace,
    addFn: (P) => {
      G += P;
    },
  });
  G += '\ntry {\n';
  const G0 = typeof Q === 'function' && y(Q),
    e = F || J.afterResponse.length > 0 ? 'c.response = ' : '',
    k0 =
      O ||
      D ||
      G0 ||
      J.parse.length > 0 ||
      J.afterHandle.some(y) ||
      J.beforeHandle.some(y) ||
      J.transform.some(y) ||
      J.mapResponse.some(y),
    I2 =
      (typeof Q === 'function' ? K1(Q) : false) ||
      J.beforeHandle.some(K1) ||
      J.afterHandle.some(K1) ||
      J.transform.some(K1),
    s0 = K.cookie || K.set || I || F || j.response || (B && N) || I2,
    r = ', c.request';
  G += `c.route = \`${W}\`\n`;
  const A2 = b('parse', { total: J.parse.length });
  if (D) {
    const P = J.parse.length || K.body || j.body;
    if (((G += 'isParsing = true\n'), J.type && !J.parse.length))
      switch (J.type) {
        case 'json':
        case 'application/json':
          if (s(j.body))
            G += 'try { c.body = await c.request.json() } catch {}';
          else G += 'c.body = await c.request.json()';
          break;
        case 'text':
        case 'text/plain':
          G += 'c.body = await c.request.text()\n';
          break;
        case 'urlencoded':
        case 'application/x-www-form-urlencoded':
          G += 'c.body = parseQuery(await c.request.text())\n';
          break;
        case 'arrayBuffer':
        case 'application/octet-stream':
          G += 'c.body = await c.request.arrayBuffer()\n';
          break;
        case 'formdata':
        case 'multipart/form-data':
          if (((G += 'c.body = {}\n'), s(j.body)))
            G += 'let form; try { form = await c.request.formData() } catch {}';
          else G += 'const form = await c.request.formData()';
          G += `\nif(form)
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						} else form = {}\n`;
          break;
      }
    else if (P) {
      if (
        ((G += '\n'),
        (G += I
          ? "let contentType = c.headers['content-type']"
          : "let contentType = c.request.headers.get('content-type')"),
        (G += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)\n
					c.contentType = contentType\n`),
        J.parse.length)
      ) {
        G += 'let used = false\n';
        const _ = b('parse', { total: J.parse.length });
        for (let A = 0; A < J.parse.length; A++) {
          const S = _.resolveChild(J.parse[A].fn.name),
            L = `bo${A}`;
          if (A !== 0) G += 'if(!used) {\n';
          if (
            ((G += `let ${L} = parse[${A}](c, contentType)\n`),
            (G += `if(${L} instanceof Promise) ${L} = await ${L}\n`),
            (G += `if(${L} !== undefined) { c.body = ${L}; used = true }\n`),
            S(),
            A !== 0)
          )
            G += '}';
        }
        _.resolve();
      }
      if (((G += '\ndelete c.contentType\n'), J.parse.length))
        G += 'if (!used) {';
      if (J.type && !Array.isArray(J.type))
        switch (J.type) {
          case 'json':
          case 'application/json':
            if (s(j.body))
              G += 'try { c.body = await c.request.json() } catch {}';
            else G += 'c.body = await c.request.json()';
            break;
          case 'text':
          case 'text/plain':
            G += 'c.body = await c.request.text()\n';
            break;
          case 'urlencoded':
          case 'application/x-www-form-urlencoded':
            G += 'c.body = parseQuery(await c.request.text())\n';
            break;
          case 'arrayBuffer':
          case 'application/octet-stream':
            G += 'c.body = await c.request.arrayBuffer()\n';
            break;
          case 'formdata':
          case 'multipart/form-data':
            G += `c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}\n`;
            break;
        }
      else
        G += `
					switch (contentType) {
						case 'application/json':
							${s(j.body) ? 'try { c.body = await c.request.json() } catch {}' : 'c.body = await c.request.json()'}
							break

						case 'text/plain':
							c.body = await c.request.text()
							break

						case 'application/x-www-form-urlencoded':
							c.body = parseQuery(await c.request.text())
							break

						case 'application/octet-stream':
							c.body = await c.request.arrayBuffer();
							break

						case 'multipart/form-data':
							c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}

							break
					}`;
      if (J.parse.length) G += '}';
      G += '}\n';
    }
    G += '\nisParsing = false\n';
  }
  if ((A2.resolve(), J?.transform)) {
    const P = b('transform', { total: J.transform.length });
    if (J.transform.length) G += '\nlet transformed\n';
    for (let _ = 0; _ < J.transform.length; _++) {
      const A = J.transform[_],
        S = P.resolveChild(A.fn.name);
      if (
        ((G += y(A)
          ? `transformed = await transform[${_}](c)\n`
          : `transformed = transform[${_}](c)\n`),
        A.subType === 'mapDerive')
      )
        G += `if(transformed?.[ELYSIA_RESPONSE])
					throw transformed
				else {
					transformed.request = c.request
					transformed.store = c.store
					transformed.qi = c.qi
					transformed.path = c.path
					transformed.url = c.url
					transformed.redirect = c.redirect
					transformed.set = c.set
					transformed.error = c.error

					c = transformed
			}`;
      else
        G += `if(transformed?.[ELYSIA_RESPONSE])
					throw transformed
				else
					Object.assign(c, transformed)\n`;
      S();
    }
    P.resolve();
  }
  if (j) {
    if (((G += '\n'), j.headers)) {
      if (R && 'Clean' in j.headers && !j0(j.headers))
        G += 'c.headers = validator.headers.Clean(c.headers);\n';
      if (C0('default', j.headers.schema))
        for (let [P, _] of Object.entries(
          exports_value2.Default(j.headers.schema, {})
        )) {
          const A =
            typeof _ === 'object'
              ? JSON.stringify(_)
              : typeof _ === 'string'
                ? `'${_}'`
                : _;
          if (A !== undefined) G += `c.headers['${P}'] ??= ${A}\n`;
        }
      if (s(j.headers)) G += 'if(isNotEmpty(c.headers)) {';
      if (
        ((G += `if(validator.headers.Check(c.headers) === false) {
				${E('headers')}
			}`),
        S0(j.headers.schema))
      )
        G += 'c.headers = validator.headers.Decode(c.headers)\n';
      if (s(j.headers)) G += '}';
    }
    if (j.params) {
      if (C0('default', j.params.schema))
        for (let [P, _] of Object.entries(
          exports_value2.Default(j.params.schema, {})
        )) {
          const A =
            typeof _ === 'object'
              ? JSON.stringify(_)
              : typeof _ === 'string'
                ? `'${_}'`
                : _;
          if (A !== undefined) G += `c.params['${P}'] ??= ${A}\n`;
        }
      if (
        ((G += `if(validator.params.Check(c.params) === false) {
				${E('params')}
			}`),
        S0(j.params.schema))
      )
        G += '\nc.params = validator.params.Decode(c.params)\n';
    }
    if (j.query) {
      if (R && 'Clean' in j.query && !j0(j.query))
        G += 'c.query = validator.query.Clean(c.query);\n';
      if (C0('default', j.query.schema))
        for (let [P, _] of Object.entries(
          exports_value2.Default(j.query.schema, {})
        )) {
          const A =
            typeof _ === 'object'
              ? JSON.stringify(_)
              : typeof _ === 'string'
                ? `'${_}'`
                : _;
          if (A !== undefined)
            G += `if(c.query['${P}'] === undefined) c.query['${P}'] = ${A}\n`;
        }
      if (s(j.query)) G += 'if(isNotEmpty(c.query)) {';
      if (
        ((G += `if(validator.query.Check(c.query) === false) {
          		${E('query')}
			}`),
        S0(j.query.schema))
      )
        G += '\nc.query = validator.query.Decode(Object.assign({}, c.query))\n';
      if (s(j.query)) G += '}';
    }
    if (j.body) {
      if (R && 'Clean' in j.body && !j0(j.body))
        G += 'c.body = validator.body.Clean(c.body);\n';
      const P = S0(j.body.schema);
      if (P || s(j.body))
        G +=
          '\nconst isNotEmptyObject = c.body && (typeof c.body === "object" && isNotEmpty(c.body))\n';
      if (C0('default', j.body.schema)) {
        const _ = exports_value2.Default(
            j.body.schema,
            j.body.schema.type === 'object' ? {} : undefined
          ),
          A =
            typeof _ === 'object'
              ? JSON.stringify(_)
              : typeof _ === 'string'
                ? `'${_}'`
                : _;
        if (
          ((G += `if(validator.body.Check(c.body) === false) {
					if (typeof c.body === 'object') {
						c.body = Object.assign(${A}, c.body)
					} else { c.body = ${A} }`),
          s(j.body))
        )
          G += `
					    if(isNotEmptyObject && validator.body.Check(c.body) === false) {
            				${E('body')}
             			}
                    }`;
        else
          G += `
    				if(validator.body.Check(c.body) === false) {
        				${E('body')}
         			}
                }`;
      } else if (s(j.body))
        G += `if(isNotEmptyObject && validator.body.Check(c.body) === false) {
         			${E('body')}
          		}`;
      else
        G += `if(validator.body.Check(c.body) === false) {
         			${E('body')}
          		}`;
      if (P)
        G += '\nif(isNotEmptyObject) c.body = validator.body.Decode(c.body)\n';
    }
    if (n(H?.schema?.properties ?? H?.schema?.schema ?? {})) {
      if (
        ((G += `const cookieValue = {}
    			for(const [key, value] of Object.entries(c.cookie))
    				cookieValue[key] = value.value\n`),
        C0('default', H.schema))
      )
        for (let [P, _] of Object.entries(exports_value2.Default(H.schema, {})))
          G += `cookieValue['${P}'] = ${typeof _ === 'object' ? JSON.stringify(_) : _}\n`;
      if (s(j.cookie)) G += 'if(isNotEmpty(c.cookie)) {';
      if (
        ((G += `if(validator.cookie.Check(cookieValue) === false) {
				${E('cookie', 'cookieValue')}
			}`),
        S0(j.cookie.schema))
      )
        G += `\nfor(const [key, value] of Object.entries(validator.cookie.Decode(cookieValue)))
					c.cookie[key].value = value\n`;
      if (s(j.cookie)) G += '}';
    }
  }
  if (J?.beforeHandle) {
    const P = b('beforeHandle', { total: J.beforeHandle.length });
    let _ = false;
    for (let A = 0; A < J.beforeHandle.length; A++) {
      const S = J.beforeHandle[A],
        L = P.resolveChild(S.fn.name),
        a = E0(S);
      if (S.subType === 'resolve' || S.subType === 'mapResolve') {
        if (!_) (_ = true), (G += '\nlet resolved\n');
        if (
          ((G += y(S)
            ? `resolved = await beforeHandle[${A}](c);\n`
            : `resolved = beforeHandle[${A}](c);\n`),
          S.subType === 'mapResolve')
        )
          G += `if(resolved[ELYSIA_RESPONSE])
						throw resolved
					else {
						resolved.request = c.request
						resolved.store = c.store
						resolved.qi = c.qi
						resolved.path = c.path
						resolved.url = c.url
						resolved.redirect = c.redirect
						resolved.set = c.set
						resolved.error = c.error

						c = resolved
					}`;
        else
          G += `if(resolved[ELYSIA_RESPONSE])
						throw resolved
					else
						Object.assign(c, resolved)\n`;
      } else if (!a)
        (G += y(S)
          ? `await beforeHandle[${A}](c);\n`
          : `beforeHandle[${A}](c);\n`),
          L();
      else {
        if (
          ((G += y(S)
            ? `be = await beforeHandle[${A}](c);\n`
            : `be = beforeHandle[${A}](c);\n`),
          L('be'),
          (G += 'if(be !== undefined) {\n'),
          P.resolve(),
          J.afterHandle?.length)
        ) {
          b('handle', { name: B ? Q.name : undefined }).resolve();
          const h = b('afterHandle', { total: J.afterHandle.length });
          for (let Y0 = 0; Y0 < J.afterHandle.length; Y0++) {
            const T0 = J.afterHandle[Y0],
              O2 = E0(T0),
              V2 = h.resolveChild(T0.fn.name);
            if (((G += 'c.response = be\n'), !O2))
              G += y(T0.fn)
                ? `await afterHandle[${Y0}](c, be)\n`
                : `afterHandle[${Y0}](c, be)\n`;
            else
              (G += y(T0.fn)
                ? `af = await afterHandle[${Y0}](c)\n`
                : `af = afterHandle[${Y0}](c)\n`),
                (G += 'if(af !== undefined) { c.response = be = af }\n');
            V2('af');
          }
          h.resolve();
        }
        if (j.response) G += k('be');
        const U0 = b('mapResponse', { total: J.mapResponse.length });
        if (J.mapResponse.length) {
          G += '\nc.response = be\n';
          for (let h = 0; h < J.mapResponse.length; h++) {
            const Y0 = J.mapResponse[h],
              T0 = U0.resolveChild(Y0.fn.name);
            (G += `\nif(mr === undefined) {
							mr = ${L0(Y0) ? 'await' : ''} onMapResponse[${h}](c)
							if(mr !== undefined) be = c.response = mr
						}\n`),
              T0();
          }
        }
        U0.resolve(),
          (G += g),
          (G += `return mapEarlyResponse(${e} be, c.set ${r})}\n`);
      }
    }
    P.resolve();
  }
  if (J?.afterHandle.length) {
    const P = b('handle', { name: B ? Q.name : undefined });
    if (J.afterHandle.length)
      G += G0
        ? `let r = c.response = await ${U};\n`
        : `let r = c.response = ${U};\n`;
    else G += G0 ? `let r = await ${U};\n` : `let r = ${U};\n`;
    P.resolve();
    const _ = b('afterHandle', { total: J.afterHandle.length });
    for (let S = 0; S < J.afterHandle.length; S++) {
      const L = J.afterHandle[S],
        a = E0(L),
        q = _.resolveChild(L.fn.name);
      if (!a)
        (G += y(L.fn)
          ? `await afterHandle[${S}](c)\n`
          : `afterHandle[${S}](c)\n`),
          q();
      else if (
        ((G += y(L.fn)
          ? `af = await afterHandle[${S}](c)\n`
          : `af = afterHandle[${S}](c)\n`),
        q('af'),
        j.response)
      )
        (G += 'if(af !== undefined) {'),
          _.resolve(),
          (G += k('af')),
          (G += 'c.response = af }');
      else
        (G += 'if(af !== undefined) {'),
          _.resolve(),
          (G += 'c.response = af}\n');
    }
    if ((_.resolve(), (G += 'r = c.response\n'), j.response)) G += k();
    G += g;
    const A = b('mapResponse', { total: J.mapResponse.length });
    if (J.mapResponse.length)
      for (let S = 0; S < J.mapResponse.length; S++) {
        const L = J.mapResponse[S],
          a = A.resolveChild(L.fn.name);
        (G += `\nmr = ${L0(L) ? 'await' : ''} onMapResponse[${S}](c)
				if(mr !== undefined) r = c.response = mr\n`),
          a();
      }
    if ((A.resolve(), s0)) G += `return mapResponse(${e} r, c.set ${r})\n`;
    else G += `return mapCompactResponse(${e} r ${r})\n`;
  } else {
    const P = b('handle', { name: B ? Q.name : undefined });
    if (j.response || J.mapResponse.length) {
      if (
        ((G += G0 ? `let r = await ${U};\n` : `let r = ${U};\n`),
        P.resolve(),
        j.response)
      )
        G += k();
      b('afterHandle').resolve();
      const _ = b('mapResponse', { total: J.mapResponse.length });
      if (J.mapResponse.length) {
        G += '\nc.response = r\n';
        for (let A = 0; A < J.mapResponse.length; A++) {
          const S = J.mapResponse[A],
            L = _.resolveChild(S.fn.name);
          (G += `\nif(mr === undefined) {
						mr = ${L0(S) ? 'await' : ''} onMapResponse[${A}](c)
    					if(mr !== undefined) r = c.response = mr
					}\n`),
            L();
        }
      }
      if ((_.resolve(), (G += g), Q instanceof Response))
        (G += K.set
          ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${e} ${U}.clone(), c.set ${r})
				else
					return ${U}.clone()`
          : `return ${U}.clone()`),
          (G += '\n');
      else if (s0) G += `return mapResponse(${e} r, c.set ${r})\n`;
      else G += `return mapCompactResponse(${e} r ${r})\n`;
    } else if (O || F) {
      (G += G0 ? `let r = await ${U};\n` : `let r = ${U};\n`),
        P.resolve(),
        b('afterHandle').resolve();
      const _ = b('mapResponse', { total: J.mapResponse.length });
      if (J.mapResponse.length) {
        G += '\nc.response = r\n';
        for (let A = 0; A < J.mapResponse.length; A++) {
          const S = J.mapResponse[A],
            L = _.resolveChild(S.fn.name);
          (G += `\nif(mr === undefined) {
							mr = ${L0(S) ? 'await' : ''} onMapResponse[${A}](c)
    						if(mr !== undefined) r = c.response = mr
						}\n`),
            L();
        }
      }
      if ((_.resolve(), (G += g), s0))
        G += `return mapResponse(${e} r, c.set ${r})\n`;
      else G += `return mapCompactResponse(${e} r ${r})\n`;
    } else {
      P.resolve();
      const _ = G0 ? `await ${U}` : U;
      if ((b('afterHandle').resolve(), Q instanceof Response))
        (G += K.set
          ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${e} ${U}.clone(), c.set ${r})
				else
					return ${U}.clone()`
          : `return ${U}.clone()`),
          (G += '\n');
      else if (s0) G += `return mapResponse(${e} ${_}, c.set ${r})\n`;
      else G += `return mapCompactResponse(${e} ${_} ${r})\n`;
    }
  }
  if (((G += '\n} catch(error) {'), D))
    G += '\nif(isParsing) error = new ParseError()\n';
  if (!k0) G += '\nreturn (async () => {\n';
  if (
    ((G +=
      '\nconst set = c.set\nif (!set.status || set.status < 300) set.status = error?.status || 500\n'),
    F)
  )
    for (let P = 0; P < J.trace.length; P++)
      G += `report${P}?.resolve(error);reportChild${P}?.(error);\n`;
  const U1 = b('error', { total: J.error.length });
  if (J.error.length) {
    G += `
				c.error = error
				c.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
				let er
			`;
    for (let P = 0; P < J.error.length; P++) {
      const _ = U1.resolveChild(J.error[P].fn.name);
      if (y(J.error[P])) G += `\ner = await handleErrors[${P}](c)\n`;
      else
        G += `\ner = handleErrors[${P}](c)\nif (er instanceof Promise) er = await er\n`;
      _();
      const A = b('mapResponse', { total: J.mapResponse.length });
      if (J.mapResponse.length)
        for (let S = 0; S < J.mapResponse.length; S++) {
          const L = J.mapResponse[S],
            a = A.resolveChild(L.fn.name);
          (G += `\nc.response = er\n
							er = ${L0(L) ? 'await' : ''} onMapResponse[${S}](c)
							if(er instanceof Promise) er = await er\n`),
            a();
        }
      if (
        (A.resolve(),
        (G += `er = mapEarlyResponse(er, set ${r})\n`),
        (G += 'if (er) {'),
        F)
      ) {
        for (let S = 0; S < J.trace.length; S++)
          G += `\nreport${S}.resolve()\n`;
        U1.resolve();
      }
      G += 'return er\n}\n';
    }
  }
  if ((U1.resolve(), (G += 'return handleError(c, error, true)\n'), !k0))
    G += '})()';
  if (((G += '}'), w || F)) {
    if (((G += ' finally { '), !k0)) G += ';(async () => {';
    const P = b('afterResponse', { total: J.afterResponse.length });
    if (w)
      for (let _ = 0; _ < J.afterResponse.length; _++) {
        const A = P.resolveChild(J.afterResponse[_].fn.name);
        (G += `\nawait afterResponse[${_}](c);\n`), A();
      }
    if ((P.resolve(), !k0)) G += '})();';
    G += '}';
  }
  G = `const {
		handler,
		handleError,
		hooks: {
			transform,
			resolve,
			beforeHandle,
			afterHandle,
			mapResponse: onMapResponse,
			parse,
			error: handleErrors,
			afterResponse,
			trace: _trace
		},
		validator,
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery,
			parseQueryFromURL,
			isNotEmpty
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError,
			ParseError
		},
		schema,
		definitions,
		ERROR_CODE,
		parseCookie,
		signCookie,
		decodeURIComponent,
		ELYSIA_RESPONSE,
		ELYSIA_TRACE,
		ELYSIA_REQUEST_ID,
		getServer
	} = hooks

	const trace = _trace.map(x => typeof x === 'function' ? x : x.fn)

	return ${k0 ? 'async' : ''} function handle(c) {
		${J.beforeHandle.length ? 'let be' : ''}
		${J.afterHandle.length ? 'let af' : ''}
		${J.mapResponse.length ? 'let mr' : ''}

		${Y ? 'c.schema = schema; c.defs = definitions' : ''}
		${G}
	}`;
  try {
    return Function(
      'hooks',
      G
    )({
      handler: Q,
      hooks: L1(J),
      validator: j,
      handleError: $.handleError,
      utils: {
        mapResponse: f,
        mapCompactResponse: Z0,
        mapEarlyResponse: v,
        parseQuery: i0,
        parseQueryFromURL: B1,
        isNotEmpty: n,
      },
      error: {
        NotFoundError: O0,
        ValidationError: T,
        InternalServerError: G1,
        ParseError: Y1,
      },
      schema: $.router.history,
      definitions: $.definitions.type,
      ERROR_CODE: A0,
      parseCookie: $1,
      signCookie: g0,
      decodeURIComponent: z2.default,
      ELYSIA_RESPONSE: c,
      ELYSIA_TRACE: n0,
      ELYSIA_REQUEST_ID: I0,
      getServer: () => $.getServer(),
    });
  } catch {
    const P = L1(J);
    console.log('[Composer] failed to generate optimized handler'),
      console.log(
        'Please report the following to SaltyAom privately as it may include sensitive information about your codebase:'
      ),
      console.log('---'),
      console.log({
        handler: typeof Q === 'function' ? Q.toString() : Q,
        hooks: {
          ...P,
          transform: P?.transform?.map?.((_) => _.toString()),
          resolve: P?.resolve?.map?.((_) => _.toString()),
          beforeHandle: P?.beforeHandle?.map?.((_) => _.toString()),
          afterHandle: P?.afterHandle?.map?.((_) => _.toString()),
          mapResponse: P?.mapResponse?.map?.((_) => _.toString()),
          parse: P?.parse?.map?.((_) => _.toString()),
          error: P?.error?.map?.((_) => _.toString()),
          afterResponse: P?.afterResponse?.map?.((_) => _.toString()),
          stop: P?.stop?.map?.((_) => _.toString()),
        },
        validator: j,
        definitions: $.definitions.type,
      }),
      console.log('---'),
      process.exit(1);
  }
};
var b1 = ($) => {
  const W = $.config.handler?.standardHostname ?? true;
  let X = '',
    Z = '';
  const J = $.setHeaders;
  for (let D of Object.keys($.singleton.decorator))
    X += `,${D}: app.singleton.decorator.${D}`;
  const j = $.router,
    Q = $.event.trace.length > 0;
  let Y = `
	const route = router.find(request.method, path) ${j.http.root.ALL ? '?? router.find("ALL", path)' : ''}

	if (route === null)
		return ${
      $.event.error.length
        ? 'app.handleError(ctx, notFound)'
        : $.event.request.length
          ? `new Response(error404Message, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})`
          : 'error404.clone()'
    }

	ctx.params = route.params\n`;
  Y += `if(route.store.handler) return route.store.handler(ctx)
	return (route.store.handler = route.store.compile())(ctx)\n`;
  let K = '';
  for (let [D, { code: M, all: N, static: I }] of Object.entries(
    j.static.http.map
  )) {
    if (I)
      K += `case '${D}':\nswitch(request.method) {\n${M}\n${N ?? 'default: break map'}}\n\n`;
    K += `case '${D}':\nswitch(request.method) {\n${M}\n${N ?? 'default: break map'}}\n\n`;
  }
  const B = $.event.request.some(y);
  if (
    ((Z += `const {
		app,
		mapEarlyResponse,
		NotFoundError,
		randomId,
		handleError,
		error,
		redirect,
		ELYSIA_TRACE,
		ELYSIA_REQUEST_ID,
		getServer
	} = data

	const store = app.singleton.store
	const staticRouter = app.router.static.http
	const st = staticRouter.handlers
	const wsRouter = app.router.ws
	const router = app.router.http
	const trace = app.event.trace.map(x => typeof x === 'function' ? x : x.fn)

	const notFound = new NotFoundError()
	const hoc = app.extender.higherOrderFunctions.map(x => x.fn)

	${$.event.request.length ? 'const onRequest = app.event.request.map(x => x.fn)' : ''}
	${
    $.event.error.length
      ? ''
      : `\nconst error404Message = notFound.message.toString()
	const error404 = new Response(error404Message, { status: 404 });\n`
  }

	${$.event.trace.length ? `const ${$.event.trace.map((D, M) => `tr${M} = app.event.trace[${M}].fn`).join(',')}` : ''}

	${B ? 'async' : ''} function map(request) {\n`),
    $.event.request.length)
  )
    Z += 'let re';
  if (
    ((Z += `\nconst url = request.url
		const s = url.indexOf('/', ${W ? 11 : 7})
		const qi = url.indexOf('?', s + 1)
		let path
		if(qi === -1)
			path = url.substring(s)
		else
			path = url.substring(s, qi)\n`),
    (Z += `${Q ? 'const id = randomId()' : ''}
		const ctx = {
			request,
			store,
			qi,
			path,
			url,
			redirect,
			set: {
				headers: ${Object.keys(J ?? {}).length ? 'Object.assign({}, app.setHeaders)' : '{}'},
				status: 200
			},
			error
			${
        $.inference.server
          ? `, get server() {
							return getServer()
						}`
          : ''
      }
			${Q ? ',[ELYSIA_REQUEST_ID]: id' : ''}
			${X}
		}\n`),
    $.event.trace.length)
  )
    Z += `\nctx[ELYSIA_TRACE] = [${$.event.trace.map((D, M) => `tr${M}(ctx)`).join(',')}]\n`;
  const w = R1({
    context: 'ctx',
    trace: $.event.trace,
    addFn(D) {
      Z += D;
    },
  })('request', { attribute: 'ctx', total: $.event.request.length });
  if ($.event.request.length) {
    Z += '\n try {\n';
    for (let D = 0; D < $.event.request.length; D++) {
      const M = $.event.request[D],
        N = E0(M),
        I = y(M),
        O = w.resolveChild($.event.request[D].fn.name);
      if (N)
        (Z += `re = mapEarlyResponse(
					${I ? 'await' : ''} onRequest[${D}](ctx),
					ctx.set,
					request
				)\n`),
          O('re'),
          (Z += 'if(re !== undefined) return re\n');
      else (Z += `${I ? 'await' : ''} onRequest[${D}](ctx)\n`), O();
    }
    Z += `} catch (error) {
			return app.handleError(ctx, error)
		}`;
  }
  w.resolve();
  const F = $.router.static.ws,
    G = $.router.ws;
  if (Object.keys(F).length || G.history.length) {
    Z += `
			if(request.method === 'GET') {
				switch(path) {`;
    for (let [D, M] of Object.entries(F))
      Z += `
					case '${D}':
						if(request.headers.get('upgrade') === 'websocket')
							return st[${M}](ctx)

						break`;
    Z += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = wsRouter.find('ws', path)

						if(route) {
							ctx.params = route.params

							if(route.store.handler)
							    return route.store.handler(ctx)

							return (route.store.handler = route.store.compile())(ctx)
						}
					}

					break
			}
		}\n`;
  }
  if (
    ((Z += `
		map: switch(path) {
			${K}

			default:
				break
		}

		${Y}
	}\n`),
    $.extender.higherOrderFunctions.length)
  ) {
    let D = 'map';
    for (let M = 0; M < $.extender.higherOrderFunctions.length; M++)
      D = `hoc[${M}](${D}, request)`;
    Z += `return function hocMap(request) { return ${D}(request) }`;
  } else Z += 'return map';
  const z = x1($);
  return (
    ($.handleError = z),
    Function(
      'data',
      Z
    )({
      app: $,
      mapEarlyResponse: v,
      NotFoundError: O0,
      randomId: j1,
      handleError: z,
      error: T1,
      redirect: c0,
      ELYSIA_TRACE: n0,
      ELYSIA_REQUEST_ID: I0,
      getServer: () => $.getServer(),
    })
  );
};
var x1 = ($) => {
  const W = $.event;
  let X = '';
  X += `const {
		app: { event: { error: onErrorContainer, afterResponse: resContainer, mapResponse: _onMapResponse, trace: _trace } },
		mapResponse,
		ERROR_CODE,
		ELYSIA_RESPONSE,
		ELYSIA_TRACE,
		ELYSIA_REQUEST_ID
	} = inject

	const trace = _trace.map(x => typeof x === 'function' ? x : x.fn)
	const onMapResponse = []

	for(let i = 0; i < _onMapResponse.length; i++)
		onMapResponse.push(_onMapResponse[i].fn ?? _onMapResponse[i])

	delete _onMapResponse

	const onError = onErrorContainer.map(x => x.fn)
	const res = resContainer.map(x => x.fn)

	return ${$.event.error.find(y) || $.event.mapResponse.find(y) ? 'async' : ''} function(context, error, skipGlobal) {`;
  const Z = $.event.trace.length > 0;
  if (Z) X += '\nconst id = context[ELYSIA_REQUEST_ID]\n';
  const J = R1({
    context: 'context',
    trace: W.trace,
    addFn: (Y) => {
      X += Y;
    },
  });
  X += `
		const set = context.set
		let r

		if(!context.code)
			context.code = error.code ?? error[ERROR_CODE]

		if(!(context.error instanceof Error))
			context.error = error

		if(typeof error === "object" && error && ELYSIA_RESPONSE in error) {
			error.status = error[ELYSIA_RESPONSE]
			error.message = error.response
		}\n`;
  const j =
    Z || W.afterResponse.length > 0 || W.afterResponse.length > 0
      ? 'context.response = '
      : '';
  for (let Y = 0; Y < $.event.error.length; Y++) {
    const K = $.event.error[Y],
      B = `${y(K) ? 'await ' : ''}onError[${Y}](context)`;
    if (((X += '\nif(skipGlobal !== true) {\n'), E0(K))) {
      X += `r = ${B}; if(r !== undefined) {
				if(r instanceof Response) return r

				if(r[ELYSIA_RESPONSE]) {
					error.status = error[ELYSIA_RESPONSE]
					error.message = error.response
				}

				if(set.status === 200) set.status = error.status\n`;
      const U = J('mapResponse', {
        total: W.mapResponse.length,
        name: 'context',
      });
      if (W.mapResponse.length)
        for (let w = 0; w < W.mapResponse.length; w++) {
          const F = W.mapResponse[w],
            G = U.resolveChild(F.fn.name);
          (X += `\ncontext.response = r
						r = ${L0(F) ? 'await' : ''} onMapResponse[${w}](context)\n`),
            G();
        }
      U.resolve(), (X += `return mapResponse(${j} r, set, context.request)}\n`);
    } else X += B + '\n';
    X += '\n}\n';
  }
  X += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
		set.status = error.status ?? 422
		return new Response(
			error.message,
			{
				headers: Object.assign(
					{ 'content-type': 'application/json'},
					set.headers
				),
				status: set.status
			}
		)
	} else {
		if(error.code && typeof error.status === "number")
			return new Response(
				error.message,
				{ headers: set.headers, status: error.status }
			)\n`;
  const Q = J('mapResponse', { total: W.mapResponse.length, name: 'context' });
  if (W.mapResponse.length)
    for (let Y = 0; Y < W.mapResponse.length; Y++) {
      const K = W.mapResponse[Y],
        B = Q.resolveChild(K.fn.name);
      (X += `\ncontext.response = error
			error = ${L0(K) ? 'await' : ''} onMapResponse[${Y}](context)\n`),
        B();
    }
  return (
    Q.resolve(),
    (X += `\nreturn mapResponse(${j} error, set, context.request)\n}\n}`),
    Function(
      'inject',
      X
    )({
      app: $,
      mapResponse: f,
      ERROR_CODE: A0,
      ELYSIA_RESPONSE: c,
      ELYSIA_TRACE: n0,
      ELYSIA_REQUEST_ID: I0,
    })
  );
};
var g1 = ($) => async (W) => {
  const X = W.url,
    Z = X.indexOf('/', 11),
    J = X.indexOf('?', Z + 1),
    j = J === -1 ? X.substring(Z) : X.substring(Z, J),
    Q = { cookie: {}, status: 200, headers: {} },
    Y = Object.assign({}, $.singleton.decorator, {
      set: Q,
      store: $.singleton.store,
      request: W,
      path: j,
      qi: J,
      redirect: c0,
    });
  try {
    for (let N = 0; N < $.event.request.length; N++) {
      const I = $.event.request[N].fn;
      let O = I(Y);
      if (O instanceof Promise) O = await O;
      if (((O = v(O, Q)), O)) return (Y.response = O);
    }
    const K =
      $.router.dynamic.find(W.method, j) ?? $.router.dynamic.find('ALL', j);
    if (!K) throw new O0();
    const { handle: B, hooks: U, validator: w, content: F } = K.store;
    let G;
    if (W.method !== 'GET' && W.method !== 'HEAD')
      if (F)
        switch (F) {
          case 'application/json':
            G = await W.json();
            break;
          case 'text/plain':
            G = await W.text();
            break;
          case 'application/x-www-form-urlencoded':
            G = i0(await W.text());
            break;
          case 'application/octet-stream':
            G = await W.arrayBuffer();
            break;
          case 'multipart/form-data':
            G = {};
            const N = await W.formData();
            for (let I of N.keys()) {
              if (G[I]) continue;
              const O = N.getAll(I);
              if (O.length === 1) G[I] = O[0];
              else G[I] = O;
            }
            break;
        }
      else {
        let N = W.headers.get('content-type');
        if (N) {
          const I = N.indexOf(';');
          if (I !== -1) N = N.slice(0, I);
          Y.contentType = N;
          for (let O = 0; O < U.parse.length; O++) {
            const H = U.parse[O].fn;
            let C = H(Y, N);
            if (C instanceof Promise) C = await C;
            if (C) {
              G = C;
              break;
            }
          }
          if ((delete Y.contentType, G === undefined))
            switch (N) {
              case 'application/json':
                G = await W.json();
                break;
              case 'text/plain':
                G = await W.text();
                break;
              case 'application/x-www-form-urlencoded':
                G = i0(await W.text());
                break;
              case 'application/octet-stream':
                G = await W.arrayBuffer();
                break;
              case 'multipart/form-data':
                G = {};
                const O = await W.formData();
                for (let H of O.keys()) {
                  if (G[H]) continue;
                  const C = O.getAll(H);
                  if (C.length === 1) G[H] = C[0];
                  else G[H] = C;
                }
                break;
            }
        }
      }
    (Y.body = G),
      (Y.params = K?.params || undefined),
      (Y.query = J === -1 ? {} : B1(X.substring(J + 1))),
      (Y.headers = {});
    for (let [N, I] of W.headers.entries()) Y.headers[N] = I;
    const z = Object.assign({}, $.config?.cookie, w?.cookie?.config),
      D = W.headers.get('cookie');
    Y.cookie = await $1(
      Y.set,
      D,
      z
        ? {
            secrets:
              z.secrets !== undefined
                ? typeof z.secrets === 'string'
                  ? z.secrets
                  : z.secrets.join(',')
                : undefined,
            sign:
              z.sign === true
                ? true
                : z.sign !== undefined
                  ? typeof z.sign === 'string'
                    ? z.sign
                    : z.sign.join(',')
                  : undefined,
          }
        : undefined
    );
    for (let N = 0; N < U.transform.length; N++) {
      const I = U.transform[N],
        O = I.fn(Y);
      if (I.subType === 'derive')
        if (O instanceof Promise) Object.assign(Y, await O);
        else Object.assign(Y, O);
      else if (O instanceof Promise) await O;
    }
    if (w) {
      if (w.createHeaders?.()) {
        const N = {};
        for (let I in W.headers) N[I] = W.headers.get(I);
        if (w.headers.Check(N) === false) throw new T('header', w.headers, N);
      } else if (w.headers?.Decode) Y.headers = w.headers.Decode(Y.headers);
      if (w.createParams?.()?.Check(Y.params) === false)
        throw new T('params', w.params, Y.params);
      else if (w.params?.Decode) Y.params = w.params.Decode(Y.params);
      if (w.createQuery?.()?.Check(Y.query) === false)
        throw new T('query', w.query, Y.query);
      else if (w.query?.Decode) Y.query = w.query.Decode(Y.query);
      if (w.createCookie?.()) {
        let N = {};
        for (let [I, O] of Object.entries(Y.cookie)) N[I] = O.value;
        if (w.cookie.Check(N) === false) throw new T('cookie', w.cookie, N);
        else if (w.cookie?.Decode) N = w.cookie.Decode(N);
      }
      if (w.createBody?.()?.Check(G) === false) throw new T('body', w.body, G);
      else if (w.body?.Decode) Y.body = w.body.Decode(G);
    }
    for (let N = 0; N < U.beforeHandle.length; N++) {
      let I = U.beforeHandle[N].fn(Y);
      if (I instanceof Promise) I = await I;
      if (I !== undefined) {
        Y.response = I;
        for (let H = 0; H < U.afterHandle.length; H++) {
          let C = U.afterHandle[H].fn(Y);
          if (C instanceof Promise) C = await C;
          if (C) I = C;
        }
        const O = v(I, Y.set);
        if (O) return (Y.response = O);
      }
    }
    let M = B(Y);
    if (M instanceof Promise) M = await M;
    if (!U.afterHandle.length) {
      const N =
          M?.[c] ??
          (Q.status
            ? typeof Q.status === 'string'
              ? _0[Q.status]
              : Q.status
            : 200),
        I = w?.createResponse?.()?.[N];
      if (I?.Check(M) === false) throw new T('response', I, M);
      else if (I?.Decode) M = I.Decode(M);
    } else {
      Y.response = M;
      for (let N = 0; N < U.afterHandle.length; N++) {
        let I = U.afterHandle[N].fn(Y);
        if (I instanceof Promise) I = await I;
        const O = v(I, Y.set);
        if (O !== undefined) {
          const H = w?.response?.[O.status];
          if (H?.Check(O) === false) throw new T('response', H, O);
          else if (H?.Decode) M = H.Decode(M);
          return (Y.response = O);
        }
      }
    }
    if (Y.set.cookie && z?.sign) {
      const N = !z.secrets
        ? undefined
        : typeof z.secrets === 'string'
          ? z.secrets
          : z.secrets[0];
      if (z.sign === true)
        for (let [I, O] of Object.entries(Y.set.cookie))
          Y.set.cookie[I].value = await g0(O.value, '${secret}');
      else {
        const I = w?.cookie?.schema?.properties;
        for (let O of z.sign) {
          if (!(O in I)) continue;
          if (Y.set.cookie[O]?.value)
            Y.set.cookie[O].value = await g0(Y.set.cookie[O].value, N);
        }
      }
    }
    return (Y.response = f(M, Y.set));
  } catch (K) {
    if (K.status) Q.status = K.status;
    return $.handleError(Y, K);
  } finally {
    for (let K of $.event.afterResponse) await K.fn(Y);
  }
};
var P2 = ($) => async (W, X) => {
  const Z = Object.assign(W, { error: X, code: X.code });
  Z.set = W.set;
  for (let J = 0; J < $.event.error.length; J++) {
    let Q = $.event.error[J].fn(Z);
    if (Q instanceof Promise) Q = await Q;
    if (Q !== undefined && Q !== null) return (W.response = f(Q, W.set));
  }
  return new Response(typeof X.cause === 'string' ? X.cause : X.message, {
    headers: W.set.headers,
    status: X.status ?? 500,
  });
};

class Q0 {
  config;
  server = null;
  dependencies = {};
  _routes = {};
  _types = {
    Prefix: '',
    Scoped: false,
    Singleton: {},
    Definitions: {},
    Metadata: {},
  };
  _ephemeral = {};
  _volatile = {};
  static version = E1;
  version = E1;
  singleton = { decorator: {}, store: {}, derive: {}, resolve: {} };
  get store() {
    return this.singleton.store;
  }
  get decorator() {
    return this.singleton.decorator;
  }
  get _scoped() {
    return this.config.scoped;
  }
  definitions = { type: {}, error: {} };
  extender = { macros: [], higherOrderFunctions: [] };
  validator = {
    global: null,
    scoped: null,
    local: null,
    getCandidate() {
      return x0(x0(this.global, this.scoped), this.local);
    },
  };
  event = {
    start: [],
    request: [],
    parse: [],
    transform: [],
    beforeHandle: [],
    afterHandle: [],
    mapResponse: [],
    afterResponse: [],
    trace: [],
    error: [],
    stop: [],
  };
  telemetry = { stack: undefined };
  router = {
    http: new M0(),
    ws: new M0(),
    dynamic: new M0(),
    static: { http: { static: {}, handlers: [], map: {}, all: '' }, ws: {} },
    history: [],
  };
  routeTree = new Map();
  get routes() {
    return this.router.history;
  }
  getGlobalRoutes() {
    return this.router.history;
  }
  inference = {
    body: false,
    cookie: false,
    headers: false,
    query: false,
    set: false,
    server: false,
  };
  getServer() {
    return this.server;
  }
  _promisedModules;
  get promisedModules() {
    if (!this._promisedModules) this._promisedModules = new S1();
    return this._promisedModules;
  }
  constructor($ = {}) {
    if ($.tags)
      if (!$.detail) $.detail = { tags: $.tags };
      else $.detail.tags = $.tags;
    if ($.nativeStaticResponse === undefined) $.nativeStaticResponse = true;
    if (
      ((this.config = {}),
      this.applyConfig($ ?? {}),
      $?.analytic && ($?.name || $?.seed !== undefined))
    )
      this.telemetry.stack = new Error().stack;
  }
  env($, W = Bun?.env ?? process.env) {
    if (
      d($, { dynamic: true, additionalProperties: true, coerce: true }).Check(
        W
      ) === false
    ) {
      const Z = new T('env', $, W);
      throw new Error(Z.all.map((J) => J.summary).join('\n'));
    }
    return this;
  }
  wrap($) {
    return (
      this.extender.higherOrderFunctions.push({
        checksum: P0(
          JSON.stringify({
            name: this.config.name,
            seed: this.config.seed,
            content: $.toString(),
          })
        ),
        fn: $,
      }),
      this
    );
  }
  applyMacro($) {
    if (this.extender.macros.length) {
      const W = w2({ globalHook: this.event, localHook: $ }),
        X = {
          events: { global: this.event, local: $ },
          onParse: W('parse'),
          onTransform: W('transform'),
          onBeforeHandle: W('beforeHandle'),
          onAfterHandle: W('afterHandle'),
          mapResponse: W('mapResponse'),
          onAfterResponse: W('afterResponse'),
          onError: W('error'),
        };
      for (let Z of this.extender.macros) U2(Z.fn(X), $);
    }
  }
  applyConfig($) {
    return (
      (this.config = {
        prefix: '',
        aot: true,
        strictPath: false,
        global: false,
        analytic: false,
        normalize: true,
        ...$,
        cookie: { path: '/', ...$?.cookie },
        experimental: $?.experimental ?? {},
        seed: $?.seed === undefined ? '' : $?.seed,
      }),
      this
    );
  }
  get models() {
    const $ = {};
    for (let [W, X] of Object.entries(this.definitions.type)) $[W] = d(X);
    return $;
  }
  add(
    $,
    W,
    X,
    Z,
    { allowMeta: J = false, skipPrefix: j = false } = {
      allowMeta: false,
      skipPrefix: false,
    }
  ) {
    if (((Z = _2(Z)), W !== '' && W.charCodeAt(0) !== 47)) W = '/' + W;
    if (this.config.prefix && !j && !this.config.scoped)
      W = this.config.prefix + W;
    if (Z?.type)
      switch (Z.type) {
        case 'text':
          Z.type = 'text/plain';
          break;
        case 'json':
          Z.type = 'application/json';
          break;
        case 'formdata':
          Z.type = 'multipart/form-data';
          break;
        case 'urlencoded':
          Z.type = 'application/x-www-form-urlencoded';
          break;
        case 'arrayBuffer':
          Z.type = 'application/octet-stream';
          break;
        default:
          break;
      }
    const Q = this.definitions.type,
      Y = !this.config.aot,
      K = { ...this.validator.getCandidate() },
      B = {
        body: Z?.body ?? K?.body,
        headers: Z?.headers ?? K?.headers,
        params: Z?.params ?? K?.params,
        query: Z?.query ?? K?.query,
        cookie: Z?.cookie ?? K?.cookie,
        response: Z?.response ?? K?.response,
      },
      U = () =>
        B.cookie
          ? X1({
              validator: B.cookie,
              defaultConfig: this.config.cookie,
              config: B.cookie?.config ?? {},
              dynamic: Y,
              models: Q,
            })
          : undefined,
      w = this.config.normalize,
      F =
        this.config.precompile === true ||
        (typeof this.config.precompile === 'object' &&
          this.config.precompile.schema === true)
          ? {
              body: d(B.body, { dynamic: Y, models: Q, normalize: w }),
              headers: d(B.headers, {
                dynamic: Y,
                models: Q,
                additionalProperties: !this.config.normalize,
                coerce: true,
                additionalCoerce: D0(),
              }),
              params: d(B.params, {
                dynamic: Y,
                models: Q,
                coerce: true,
                additionalCoerce: D0(),
              }),
              query: d(B.query, {
                dynamic: Y,
                models: Q,
                normalize: w,
                coerce: true,
                additionalCoerce: D0(),
              }),
              cookie: U(),
              response: W1(B.response, { dynamic: Y, models: Q, normalize: w }),
            }
          : {
              createBody() {
                if (this.body) return this.body;
                return (this.body = d(B.body, {
                  dynamic: Y,
                  models: Q,
                  normalize: w,
                }));
              },
              createHeaders() {
                if (this.headers) return this.headers;
                return (this.headers = d(B.headers, {
                  dynamic: Y,
                  models: Q,
                  additionalProperties: !w,
                  coerce: true,
                  additionalCoerce: D0(),
                }));
              },
              createParams() {
                if (this.params) return this.params;
                return (this.params = d(B.params, {
                  dynamic: Y,
                  models: Q,
                  coerce: true,
                  additionalCoerce: D0(),
                }));
              },
              createQuery() {
                if (this.query) return this.query;
                return (this.query = d(B.query, {
                  dynamic: Y,
                  models: Q,
                  coerce: true,
                  additionalCoerce: D0(),
                }));
              },
              createCookie() {
                if (this.cookie) return this.cookie;
                return (this.cookie = U());
              },
              createResponse() {
                if (this.response) return this.response;
                return (this.response = W1(B.response, {
                  dynamic: Y,
                  models: Q,
                  normalize: w,
                }));
              },
            },
      G = W.endsWith('/') ? W.slice(0, W.length - 1) : W + '/';
    if (((Z = i(Z, K)), Z.tags))
      if (!Z.detail) Z.detail = { tags: Z.tags };
      else Z.detail.tags = Z.tags;
    if (n(this.config.detail))
      Z.detail = p(Object.assign({}, this.config.detail), Z.detail);
    this.applyMacro(Z);
    const z = i(this.event, Z);
    if (this.config.aot === false) {
      if (
        (this.router.dynamic.add($, W, {
          validator: F,
          hooks: z,
          content: Z?.type,
          handle: X,
        }),
        this.config.strictPath === false)
      )
        this.router.dynamic.add($, G, {
          validator: F,
          hooks: z,
          content: Z?.type,
          handle: X,
        });
      this.router.history.push({
        method: $,
        path: W,
        composed: null,
        handler: X,
        hooks: z,
      });
      return;
    }
    const D =
        this.config.precompile === true ||
        (typeof this.config.precompile === 'object' &&
          this.config.precompile.compose === true),
      M = d0(this.inference),
      N = typeof X !== 'function' ? J2(X, z, this.setHeaders) : undefined;
    if (
      this.config.nativeStaticResponse === true &&
      N &&
      ($ === 'GET' || $ === 'ALL')
    )
      this.router.static.http.static[W] = N();
    const I = () =>
        N2({
          app: this,
          path: W,
          method: $,
          localHook: i(Z),
          hooks: z,
          validator: F,
          handler: X,
          allowMeta: J,
          inference: M,
        }),
      O = D
        ? I()
        : (R) => {
            return I()(R);
          },
      H = this.router.history.length;
    if (this.routeTree.has($ + W))
      for (let R = 0; R < this.router.history.length; R++) {
        const E = this.router.history[R];
        if (E.path === W && E.method === $) {
          const k = this.router.history.splice(R, 1)[0];
          if (k && this.routeTree.has(k?.method + k?.path))
            this.routeTree.delete(k.method + k.path);
        }
      }
    else this.routeTree.set($ + W, H);
    this.router.history.push({
      method: $,
      path: W,
      composed: O,
      handler: X,
      hooks: z,
    });
    const C = this.router.static.http,
      g = { handler: D ? O : undefined, compile: I };
    if ($ === '$INTERNALWS') {
      const R = this.config.strictPath
        ? undefined
        : W.endsWith('/')
          ? W.slice(0, W.length - 1)
          : W + '/';
      if (W.indexOf(':') === -1 && W.indexOf('*') === -1) {
        const E = C.handlers.length;
        if (
          (C.handlers.push((k) => (C.handlers[E] = I())(k)),
          (this.router.static.ws[W] = E),
          R)
        )
          this.router.static.ws[R] = E;
      } else if ((this.router.ws.add('ws', W, g), R))
        this.router.ws.add('ws', R, g);
      return;
    }
    if (W.indexOf(':') === -1 && W.indexOf('*') === -1) {
      const R = C.handlers.length;
      if ((C.handlers.push(N ?? ((k) => (C.handlers[R] = I())(k))), !C.map[W]))
        C.map[W] = { code: '' };
      const E = N ? '' : 'ctx';
      if ($ === 'ALL') C.map[W].all = `default: return st[${R}](${E})\n`;
      else
        C.map[W].code = `case '${$}': return st[${R}](${E})\n${C.map[W].code}`;
      if (!this.config.strictPath) {
        if (!C.map[G]) C.map[G] = { code: '' };
        if (
          this.config.nativeStaticResponse === true &&
          N &&
          ($ === 'GET' || $ === 'ALL')
        )
          this.router.static.http.static[G] = N();
        if ($ === 'ALL') C.map[G].all = `default: return st[${R}](${E})\n`;
        else
          C.map[G].code =
            `case '${$}': return st[${R}](${E})\n${C.map[G].code}`;
      }
    } else if ((this.router.http.add($, W, g), !this.config.strictPath)) {
      const R = W.endsWith('/') ? W.slice(0, W.length - 1) : W + '/';
      if (
        this.config.nativeStaticResponse === true &&
        N &&
        ($ === 'GET' || $ === 'ALL')
      )
        this.router.static.http.static[R] = N();
      this.router.http.add($, R, g);
    }
  }
  setHeaders;
  headers($) {
    if (!$) return this;
    if (!this.setHeaders) this.setHeaders = {};
    return (this.setHeaders = p(this.setHeaders, $)), this;
  }
  onStart($) {
    return this.on('start', $), this;
  }
  onRequest($) {
    return this.on('request', $), this;
  }
  onParse($, W) {
    if (!W) return this.on('parse', $);
    return this.on($, 'parse', W);
  }
  onTransform($, W) {
    if (!W) return this.on('transform', $);
    return this.on($, 'transform', W);
  }
  resolve($, W) {
    if (!W) (W = $), ($ = { as: 'local' });
    const X = { subType: 'resolve', fn: W };
    return this.onBeforeHandle($, X);
  }
  mapResolve($, W) {
    if (!W) (W = $), ($ = { as: 'local' });
    const X = { subType: 'mapResolve', fn: W };
    return this.onBeforeHandle($, X);
  }
  onBeforeHandle($, W) {
    if (!W) return this.on('beforeHandle', $);
    return this.on($, 'beforeHandle', W);
  }
  onAfterHandle($, W) {
    if (!W) return this.on('afterHandle', $);
    return this.on($, 'afterHandle', W);
  }
  mapResponse($, W) {
    if (!W) return this.on('mapResponse', $);
    return this.on($, 'mapResponse', W);
  }
  onAfterResponse($, W) {
    if (!W) return this.on('afterResponse', $);
    return this.on($, 'afterResponse', W);
  }
  trace($, W) {
    if (!W) (W = $), ($ = { as: 'local' });
    if (!Array.isArray(W)) W = [W];
    for (let X of W) this.on($, 'trace', M2(X));
    return this;
  }
  error($, W) {
    switch (typeof $) {
      case 'string':
        return (W.prototype[A0] = $), (this.definitions.error[$] = W), this;
      case 'function':
        return (this.definitions.error = $(this.definitions.error)), this;
    }
    for (let [X, Z] of Object.entries($))
      (Z.prototype[A0] = X), (this.definitions.error[X] = Z);
    return this;
  }
  onError($, W) {
    if (!W) return this.on('error', $);
    return this.on($, 'error', W);
  }
  onStop($) {
    return this.on('stop', $), this;
  }
  on($, W, X) {
    let Z;
    switch (typeof $) {
      case 'string':
        (Z = $), (X = W);
        break;
      case 'object':
        if (((Z = W), !Array.isArray(W) && typeof W === 'object')) X = W;
        break;
    }
    if (Array.isArray(X)) X = t(X);
    else if (typeof X === 'function') X = [{ fn: X }];
    else X = [X];
    const J = X;
    for (let j of J)
      j.scope = typeof $ === 'string' ? 'local' : ($?.as ?? 'local');
    if (Z !== 'trace') r0({ [Z]: J.map((j) => j.fn) }, this.inference);
    for (let j of J) {
      const Q = K2(j, 'global', { skipIfHasType: true });
      switch (Z) {
        case 'start':
          this.event.start.push(Q);
          break;
        case 'request':
          this.event.request.push(Q);
          break;
        case 'parse':
          this.event.parse.push(Q);
          break;
        case 'transform':
          this.event.transform.push(Q);
          break;
        case 'beforeHandle':
          this.event.beforeHandle.push(Q);
          break;
        case 'afterHandle':
          this.event.afterHandle.push(Q);
          break;
        case 'mapResponse':
          this.event.mapResponse.push(Q);
          break;
        case 'afterResponse':
          this.event.afterResponse.push(Q);
          break;
        case 'trace':
          this.event.trace.push(Q);
          break;
        case 'error':
          this.event.error.push(Q);
          break;
        case 'stop':
          this.event.stop.push(Q);
          break;
      }
    }
    return this;
  }
  propagate() {
    return (
      u(this.event.parse),
      u(this.event.transform),
      u(this.event.beforeHandle),
      u(this.event.afterHandle),
      u(this.event.mapResponse),
      u(this.event.afterResponse),
      u(this.event.trace),
      u(this.event.error),
      this
    );
  }
  as($) {
    const W = { plugin: 'scoped', global: 'global' }[$];
    if (
      (u(this.event.parse, W),
      u(this.event.transform, W),
      u(this.event.beforeHandle, W),
      u(this.event.afterHandle, W),
      u(this.event.mapResponse, W),
      u(this.event.afterResponse, W),
      u(this.event.trace, W),
      u(this.event.error, W),
      $ === 'plugin')
    )
      (this.validator.scoped = x0(this.validator.scoped, this.validator.local)),
        (this.validator.local = null);
    else if ($ === 'global')
      (this.validator.global = x0(
        this.validator.global,
        x0(this.validator.scoped, this.validator.local)
      )),
        (this.validator.scoped = null),
        (this.validator.local = null);
    return this;
  }
  group($, W, X) {
    const Z = new Q0({ ...this.config, prefix: '' });
    (Z.singleton = { ...this.singleton }),
      (Z.definitions = { ...this.definitions }),
      (Z.getServer = () => this.getServer()),
      (Z.inference = d0(this.inference)),
      (Z.extender = { ...this.extender });
    const J = typeof W === 'object',
      j = (J ? X : W)(Z);
    if (
      ((this.singleton = p(this.singleton, Z.singleton)),
      (this.definitions = p(this.definitions, Z.definitions)),
      j.event.request.length)
    )
      this.event.request = [
        ...(this.event.request || []),
        ...(j.event.request || []),
      ];
    if (j.event.mapResponse.length)
      this.event.mapResponse = [
        ...(this.event.mapResponse || []),
        ...(j.event.mapResponse || []),
      ];
    return (
      this.model(j.definitions.type),
      Object.values(Z.router.history).forEach(
        ({ method: Q, path: Y, handler: K, hooks: B }) => {
          if (((Y = (J ? '' : this.config.prefix) + $ + Y), J)) {
            const U = W,
              w = B;
            this.add(
              Q,
              Y,
              K,
              i(U, {
                ...(w || {}),
                error: !w.error
                  ? j.event.error
                  : Array.isArray(w.error)
                    ? [...(w.error || {}), ...(j.event.error || {})]
                    : [w.error, ...(j.event.error || {})],
              })
            );
          } else
            this.add(Q, Y, K, i(B, { error: j.event.error }), {
              skipPrefix: true,
            });
        }
      ),
      this
    );
  }
  guard($, W) {
    if (!W) {
      if (typeof $ === 'object') {
        this.applyMacro($);
        const J = $.as ?? 'local';
        if (
          ((this.validator[J] = {
            body: $.body ?? this.validator[J]?.body,
            headers: $.headers ?? this.validator[J]?.headers,
            params: $.params ?? this.validator[J]?.params,
            query: $.query ?? this.validator[J]?.query,
            response: $.response ?? this.validator[J]?.response,
            cookie: $.cookie ?? this.validator[J]?.cookie,
          }),
          $.parse)
        )
          this.on({ as: J }, 'parse', $.parse);
        if ($.transform) this.on({ as: J }, 'transform', $.transform);
        if ($.beforeHandle) this.on({ as: J }, 'beforeHandle', $.beforeHandle);
        if ($.afterHandle) this.on({ as: J }, 'afterHandle', $.afterHandle);
        if ($.mapResponse) this.on({ as: J }, 'mapResponse', $.mapResponse);
        if ($.afterResponse)
          this.on({ as: J }, 'afterResponse', $.afterResponse);
        if ($.error) this.on({ as: J }, 'error', $.error);
        if ($.detail)
          if (this.config.detail)
            this.config.detail = p(
              Object.assign({}, this.config.detail),
              $.detail
            );
          else this.config.detail = $.detail;
        if ($?.tags)
          if (!this.config.detail) this.config.detail = { tags: $.tags };
          else this.config.detail.tags = $.tags;
        return this;
      }
      return this.guard({}, $);
    }
    const X = new Q0({ ...this.config, prefix: '' });
    (X.singleton = { ...this.singleton }),
      (X.definitions = { ...this.definitions }),
      (X.inference = d0(this.inference)),
      (X.extender = { ...this.extender });
    const Z = W(X);
    if (
      ((this.singleton = p(this.singleton, X.singleton)),
      (this.definitions = p(this.definitions, X.definitions)),
      (Z.getServer = () => this.server),
      Z.event.request.length)
    )
      this.event.request = [
        ...(this.event.request || []),
        ...(Z.event.request || []),
      ];
    if (Z.event.mapResponse.length)
      this.event.mapResponse = [
        ...(this.event.mapResponse || []),
        ...(Z.event.mapResponse || []),
      ];
    return (
      this.model(Z.definitions.type),
      Object.values(X.router.history).forEach(
        ({ method: J, path: j, handler: Q, hooks: Y }) => {
          this.add(
            J,
            j,
            Q,
            i($, {
              ...(Y || {}),
              error: !Y.error
                ? Z.event.error
                : Array.isArray(Y.error)
                  ? [...(Y.error || {}), ...(Z.event.error || [])]
                  : [Y.error, ...(Z.event.error || [])],
            })
          );
        }
      ),
      this
    );
  }
  use($, W) {
    if (W?.scoped) return this.guard({}, (X) => X.use($));
    if (Array.isArray($)) {
      let X = this;
      for (let Z of $) X = this.use(Z);
      return X;
    }
    if ($ instanceof Promise)
      return (
        this.promisedModules.add(
          $.then((X) => {
            if (typeof X === 'function') return X(this);
            if (X instanceof Q0) return this._use(X).compile();
            if (typeof X.default === 'function') return X.default(this);
            if (X.default instanceof Q0) return this._use(X.default);
            throw new Error(
              'Invalid plugin type. Expected Elysia instance, function, or module with "default" as Elysia instance or function that returns Elysia instance.'
            );
          }).then((X) => X.compile())
        ),
        this
      );
    return this._use($);
  }
  _use($) {
    if (typeof $ === 'function') {
      const J = $(this);
      if (J instanceof Promise)
        return (
          this.promisedModules.add(
            J.then((j) => {
              if (j instanceof Q0) {
                (j.getServer = () => this.getServer()),
                  (j.getGlobalRoutes = () => this.getGlobalRoutes()),
                  j.model(this.definitions.type),
                  j.error(this.definitions.error);
                for (let {
                  method: Q,
                  path: Y,
                  handler: K,
                  hooks: B,
                } of Object.values(j.router.history))
                  this.add(Q, Y, K, i(B, { error: j.event.error }));
                return j.compile(), j;
              }
              if (typeof j === 'function') return j(this);
              if (typeof j.default === 'function') return j.default(this);
              return this._use(j);
            }).then((j) => j.compile())
          ),
          this
        );
      return J;
    }
    const { name: W, seed: X } = $.config;
    ($.getServer = () => this.getServer()),
      ($.getGlobalRoutes = () => this.getGlobalRoutes()),
      $.model(this.definitions.type),
      $.error(this.definitions.error);
    const Z = $.config.scoped;
    if (Z) {
      if (W) {
        if (!(W in this.dependencies)) this.dependencies[W] = [];
        const j = X !== undefined ? P0(W + JSON.stringify(X)) : 0;
        if (this.dependencies[W].some(({ checksum: Q }) => j === Q))
          return this;
        this.dependencies[W].push(
          !this.config?.analytic
            ? {
                name: $.config.name,
                seed: $.config.seed,
                checksum: j,
                dependencies: $.dependencies,
              }
            : {
                name: $.config.name,
                seed: $.config.seed,
                checksum: j,
                dependencies: $.dependencies,
                stack: $.telemetry.stack,
                routes: $.router.history,
                decorators: $.singleton.decorator,
                store: $.singleton.store,
                type: $.definitions.type,
                error: $.definitions.error,
                derive: $.event.transform
                  .filter((Q) => Q.subType === 'derive')
                  .map((Q) => ({
                    fn: Q.fn.toString(),
                    stack: new Error().stack ?? '',
                  })),
                resolve: $.event.transform
                  .filter((Q) => Q.subType === 'derive')
                  .map((Q) => ({
                    fn: Q.fn.toString(),
                    stack: new Error().stack ?? '',
                  })),
              }
        );
      }
      $.extender.macros = this.extender.macros.concat($.extender.macros);
      const J = [];
      for (let j = 0; j < $.extender.macros.length; j++) {
        const Q = this.extender.macros[j];
        if (J.includes(Q.checksum)) $.extender.macros.splice(j, 1), j--;
        J.push(Q.checksum);
      }
      if (
        ($.onRequest((j) => {
          Object.assign(j, this.singleton.decorator),
            Object.assign(j.store, this.singleton.store);
        }),
        $.event.trace.length)
      )
        $.event.trace.push(...$.event.trace);
      if (!$.config.prefix)
        console.warn(
          "It's recommended to use scoped instance with a prefix to prevent collision routing with other instance."
        );
      if ($.event.error.length) $.event.error.push(...this.event.error);
      if ($.config.aot) $.compile();
      if (Z === true && $.config.prefix) {
        this.mount($.config.prefix + '/', $.fetch);
        for (let j of $.router.history)
          this.routeTree.set(
            j.method + `${$.config.prefix}${j.path}`,
            this.router.history.length
          ),
            this.router.history.push({
              ...j,
              path: `${$.config.prefix}${j.path}`,
              hooks: i(j.hooks, { error: this.event.error }),
            });
      } else {
        this.mount($.fetch);
        for (let j of $.router.history)
          this.routeTree.set(
            j.method + `${$.config.prefix}${j.path}`,
            this.router.history.length
          ),
            this.router.history.push({
              ...j,
              path: `${$.config.prefix}${j.path}`,
              hooks: i(j.hooks, { error: this.event.error }),
            });
      }
      return this;
    } else {
      if ((this.headers($.setHeaders), W)) {
        if (!(W in this.dependencies)) this.dependencies[W] = [];
        const j = X !== undefined ? P0(W + JSON.stringify(X)) : 0;
        if (!this.dependencies[W].some(({ checksum: Q }) => j === Q))
          (this.extender.macros = this.extender.macros.concat(
            $.extender.macros
          )),
            (this.extender.higherOrderFunctions =
              this.extender.higherOrderFunctions.concat(
                $.extender.higherOrderFunctions
              ));
      } else
        (this.extender.macros = this.extender.macros.concat($.extender.macros)),
          (this.extender.higherOrderFunctions =
            this.extender.higherOrderFunctions.concat(
              $.extender.higherOrderFunctions
            ));
      Q1(this.extender.macros), Q1(this.extender.higherOrderFunctions);
      const J = [];
      for (let j = 0; j < this.extender.higherOrderFunctions.length; j++) {
        const Q = this.extender.higherOrderFunctions[j];
        if (Q.checksum) {
          if (J.includes(Q.checksum))
            this.extender.higherOrderFunctions.splice(j, 1), j--;
          J.push(Q.checksum);
        }
      }
      this.inference = {
        body: this.inference.body || $.inference.body,
        cookie: this.inference.cookie || $.inference.cookie,
        headers: this.inference.headers || $.inference.headers,
        query: this.inference.query || $.inference.query,
        set: this.inference.set || $.inference.set,
        server: this.inference.server || $.inference.server,
      };
    }
    this.decorate($.singleton.decorator),
      this.state($.singleton.store),
      this.model($.definitions.type),
      this.error($.definitions.error),
      ($.extender.macros = this.extender.macros.concat($.extender.macros));
    for (let { method: J, path: j, handler: Q, hooks: Y } of Object.values(
      $.router.history
    ))
      this.add(J, j, Q, i(Y, { error: $.event.error }));
    if (!Z)
      if (W) {
        if (!(W in this.dependencies)) this.dependencies[W] = [];
        const J = X !== undefined ? P0(W + JSON.stringify(X)) : 0;
        if (this.dependencies[W].some(({ checksum: j }) => J === j))
          return this;
        this.dependencies[W].push(
          !this.config?.analytic
            ? {
                name: $.config.name,
                seed: $.config.seed,
                checksum: J,
                dependencies: $.dependencies,
              }
            : {
                name: $.config.name,
                seed: $.config.seed,
                checksum: J,
                dependencies: $.dependencies,
                stack: $.telemetry.stack,
                routes: $.router.history,
                decorators: $.singleton,
                store: $.singleton.store,
                type: $.definitions.type,
                error: $.definitions.error,
                derive: $.event.transform
                  .filter((j) => j?.subType === 'derive')
                  .map((j) => ({
                    fn: j.toString(),
                    stack: new Error().stack ?? '',
                  })),
                resolve: $.event.transform
                  .filter((j) => j?.subType === 'resolve')
                  .map((j) => ({
                    fn: j.toString(),
                    stack: new Error().stack ?? '',
                  })),
              }
        ),
          (this.event = V1(this.event, C1($.event), J));
      } else this.event = V1(this.event, C1($.event));
    return (
      (this.validator.global = i(this.validator.global, {
        ...$.validator.global,
      })),
      (this.validator.local = i(this.validator.local, {
        ...$.validator.scoped,
      })),
      this
    );
  }
  macro($) {
    const W = {
      checksum: P0(
        JSON.stringify({
          name: this.config.name,
          seed: this.config.seed,
          content: $.toString(),
        })
      ),
      fn: $,
    };
    return this.extender.macros.push(W), this;
  }
  mount($, W) {
    if (
      $ instanceof Q0 ||
      typeof $ === 'function' ||
      $.length === 0 ||
      $ === '/'
    ) {
      const J =
          typeof $ === 'function'
            ? $
            : $ instanceof Q0
              ? $.compile().fetch
              : W instanceof Q0
                ? W.compile().fetch
                : W,
        j = async ({ request: Q, path: Y }) => {
          if (
            Q.method === 'GET' ||
            Q.method === 'HEAD' ||
            !Q.headers.get('content-type')
          )
            return J(new Request(b0(Q.url, Y || '/'), Q));
          return J(
            new Request(b0(Q.url, Y || '/'), {
              ...Q,
              body: await Q.arrayBuffer(),
            })
          );
        };
      return this.all('/*', j, { type: 'none' }), this;
    }
    const X = $.length;
    if (W instanceof Q0) W = W.compile().fetch;
    const Z = async ({ request: J, path: j }) => {
      if (
        J.method === 'GET' ||
        J.method === 'HEAD' ||
        !J.headers.get('content-type')
      )
        return W(new Request(b0(J.url, j.slice(X) || '/'), J));
      return W(
        new Request(b0(J.url, j.slice(X) || '/'), {
          ...J,
          body: await J.arrayBuffer(),
        })
      );
    };
    return (
      this.all($, Z, { type: 'none' }),
      this.all($ + ($.endsWith('/') ? '*' : '/*'), Z, { type: 'none' }),
      this
    );
  }
  get($, W, X) {
    return this.add('GET', $, W, X), this;
  }
  post($, W, X) {
    return this.add('POST', $, W, X), this;
  }
  put($, W, X) {
    return this.add('PUT', $, W, X), this;
  }
  patch($, W, X) {
    return this.add('PATCH', $, W, X), this;
  }
  delete($, W, X) {
    return this.add('DELETE', $, W, X), this;
  }
  options($, W, X) {
    return this.add('OPTIONS', $, W, X), this;
  }
  all($, W, X) {
    return this.add('ALL', $, W, X), this;
  }
  head($, W, X) {
    return this.add('HEAD', $, W, X), this;
  }
  connect($, W, X) {
    return this.add('CONNECT', $, W, X), this;
  }
  route($, W, X, Z) {
    return this.add($.toUpperCase(), W, X, Z, Z?.config), this;
  }
  ws($, W) {
    const X = W.transformMessage
      ? Array.isArray(W.transformMessage)
        ? W.transformMessage
        : [W.transformMessage]
      : undefined;
    let Z = null;
    const J = d(W?.body, {
        models: this.definitions.type,
        normalize: this.config.normalize,
      }),
      j = d(W?.response, {
        models: this.definitions.type,
        normalize: this.config.normalize,
      }),
      Q = (Y) => {
        if (typeof Y === 'string') {
          const K = Y?.charCodeAt(0);
          if (K === 47 || K === 123)
            try {
              Y = JSON.parse(Y);
            } catch {}
          else if (J1(Y)) Y = +Y;
        }
        if (X?.length)
          for (let K = 0; K < X.length; K++) {
            const B = X[K](Y);
            if (B !== undefined) Y = B;
          }
        return Y;
      };
    return (
      this.route(
        '$INTERNALWS',
        $,
        (Y) => {
          const { set: K, path: B, qi: U, headers: w, query: F, params: G } = Y;
          if (Z === null) Z = this.getServer();
          if (
            Z?.upgrade(Y.request, {
              headers:
                typeof W.upgrade === 'function' ? W.upgrade(Y) : W.upgrade,
              data: {
                validator: j,
                open(z) {
                  W.open?.(new f0(z, Y));
                },
                message: (z, D) => {
                  const M = Q(D);
                  if (J?.Check(M) === false)
                    return void z.send(new T('message', J, M).message);
                  W.message?.(new f0(z, Y), M);
                },
                drain(z) {
                  W.drain?.(new f0(z, Y));
                },
                close(z, D, M) {
                  W.close?.(new f0(z, Y), D, M);
                },
              },
            })
          )
            return;
          return (K.status = 400), 'Expected a websocket connection';
        },
        {
          beforeHandle: W.beforeHandle,
          transform: W.transform,
          headers: W.headers,
          params: W.params,
          query: W.query,
        }
      ),
      this
    );
  }
  state($, W, X) {
    if (W === undefined) (X = $), ($ = { as: 'append' }), (W = '');
    else if (X === undefined) {
      if (typeof $ === 'string') (X = W), (W = $), ($ = { as: 'append' });
      else if (typeof $ === 'object') (X = W), (W = '');
    }
    const { as: Z } = $;
    if (typeof W !== 'string') return this;
    switch (typeof X) {
      case 'object':
        if (W) {
          if (W in this.singleton.store)
            this.singleton.store[W] = p(this.singleton.store[W], X, {
              override: Z === 'override',
            });
          else this.singleton.store[W] = X;
          return this;
        }
        if (X === null) return this;
        return (
          (this.singleton.store = p(this.singleton.store, X, {
            override: Z === 'override',
          })),
          this
        );
      case 'function':
        if (W) {
          if (Z === 'override' || !(W in this.singleton.store))
            this.singleton.store[W] = X;
        } else this.singleton.store = X(this.singleton.store);
        return this;
      default:
        if (Z === 'override' || !(W in this.singleton.store))
          this.singleton.store[W] = X;
        return this;
    }
  }
  decorate($, W, X) {
    if (W === undefined) (X = $), ($ = { as: 'append' }), (W = '');
    else if (X === undefined) {
      if (typeof $ === 'string') (X = W), (W = $), ($ = { as: 'append' });
      else if (typeof $ === 'object') (X = W), (W = '');
    }
    const { as: Z } = $;
    if (typeof W !== 'string') return this;
    switch (typeof X) {
      case 'object':
        if (W) {
          if (W in this.singleton.decorator)
            this.singleton.decorator[W] = p(this.singleton.decorator[W], X, {
              override: Z === 'override',
            });
          else this.singleton.decorator[W] = X;
          return this;
        }
        if (X === null) return this;
        return (
          (this.singleton.decorator = p(this.singleton.decorator, X, {
            override: Z === 'override',
          })),
          this
        );
      case 'function':
        if (W) {
          if (Z === 'override' || !(W in this.singleton.decorator))
            this.singleton.decorator[W] = X;
        } else this.singleton.decorator = X(this.singleton.decorator);
        return this;
      default:
        if (Z === 'override' || !(W in this.singleton.decorator))
          this.singleton.decorator[W] = X;
        return this;
    }
  }
  derive($, W) {
    if (!W) (W = $), ($ = { as: 'local' });
    const X = { subType: 'derive', fn: W };
    return this.onTransform($, X);
  }
  model($, W) {
    switch (typeof $) {
      case 'object':
        return (
          Object.entries($).forEach(([X, Z]) => {
            if (!(X in this.definitions.type)) this.definitions.type[X] = Z;
          }),
          this
        );
      case 'function':
        return (this.definitions.type = $(this.definitions.type)), this;
    }
    return (this.definitions.type[$] = W), this;
  }
  mapDerive($, W) {
    if (!W) (W = $), ($ = { as: 'local' });
    const X = { subType: 'mapDerive', fn: W };
    return this.onTransform($, X);
  }
  affix($, W, X) {
    if (X === '') return this;
    const Z = ['_', '-', ' '],
      J = (K) => K[0].toUpperCase() + K.slice(1),
      j =
        $ === 'prefix'
          ? (K, B) => (Z.includes(K.at(-1) ?? '') ? K + B : K + J(B))
          : Z.includes(X.at(-1) ?? '')
            ? (K, B) => B + K
            : (K, B) => B + J(K),
      Q = (K) => {
        const B = {};
        switch (K) {
          case 'decorator':
            for (let U in this.singleton.decorator)
              B[j(X, U)] = this.singleton.decorator[U];
            this.singleton.decorator = B;
            break;
          case 'state':
            for (let U in this.singleton.store)
              B[j(X, U)] = this.singleton.store[U];
            this.singleton.store = B;
            break;
          case 'model':
            for (let U in this.definitions.type)
              B[j(X, U)] = this.definitions.type[U];
            this.definitions.type = B;
            break;
          case 'error':
            for (let U in this.definitions.error)
              B[j(X, U)] = this.definitions.error[U];
            this.definitions.error = B;
            break;
        }
      },
      Y = Array.isArray(W) ? W : [W];
    for (let K of Y.some((B) => B === 'all')
      ? ['decorator', 'state', 'model', 'error']
      : Y)
      Q(K);
    return this;
  }
  prefix($, W) {
    return this.affix('prefix', $, W);
  }
  suffix($, W) {
    return this.affix('suffix', $, W);
  }
  compile() {
    if (
      ((this.fetch = this.config.aot ? b1(this) : g1(this)),
      typeof this.server?.reload === 'function')
    )
      this.server.reload({ ...(this.server || {}), fetch: this.fetch });
    return this;
  }
  handle = async ($) => this.fetch($);
  fetch = ($) => {
    return (this.fetch = this.config.aot ? b1(this) : g1(this))($);
  };
  handleError = async ($, W) =>
    (this.handleError = this.config.aot ? x1(this) : P2(this))($, W);
  outerErrorHandler = ($) =>
    new Response($.message || $.name || 'Error', { status: $?.status ?? 500 });
  listen = ($, W) => {
    if (typeof Bun === 'undefined')
      throw new Error(
        '.listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch'
      );
    if ((this.compile(), typeof $ === 'string')) {
      if (!J1($)) throw new Error('Port must be a numeric value');
      $ = parseInt($);
    }
    const X = this.fetch,
      Z =
        typeof $ === 'object'
          ? {
              development: !l0,
              reusePort: true,
              ...(this.config.serve || {}),
              ...($ || {}),
              static: this.router.static.http.static,
              websocket: { ...(this.config.websocket || {}), ...(q1 || {}) },
              fetch: X,
              error: this.outerErrorHandler,
            }
          : {
              development: !l0,
              reusePort: true,
              ...(this.config.serve || {}),
              static: this.router.static.http.static,
              websocket: { ...(this.config.websocket || {}), ...(q1 || {}) },
              port: $,
              fetch: X,
              error: this.outerErrorHandler,
            };
    this.server = Bun?.serve(Z);
    for (let J = 0; J < this.event.start.length; J++)
      this.event.start[J].fn(this);
    if (W) W(this.server);
    return (
      process.on('beforeExit', () => {
        if (this.server) {
          this.server.stop(), (this.server = null);
          for (let J = 0; J < this.event.stop.length; J++)
            this.event.stop[J].fn(this);
        }
      }),
      this.promisedModules.then(() => {
        Bun?.gc(false);
      }),
      this
    );
  };
  stop = async ($) => {
    if (!this.server)
      throw new Error(
        "Elysia isn't running. Call `app.listen` to start the server."
      );
    if (this.server) {
      if ((this.server.stop($), (this.server = null), this.event.stop.length))
        for (let W = 0; W < this.event.stop.length; W++)
          this.event.stop[W].fn(this);
    }
  };
  get modules() {
    return Promise.all(this.promisedModules.promises);
  }
}

// src/index.ts
var app = new Q0().get('/', () => 'Hello Elysia').listen(3000);
console.log(
  `\uD83E\uDD8A Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
