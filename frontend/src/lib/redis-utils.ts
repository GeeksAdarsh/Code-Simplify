export interface RedisArgSpec {
  name: string;
  placeholder: string;
  optional?: boolean;
}

export interface RedisCommandSpec {
  command: string;
  description: string;
  args: RedisArgSpec[];
}

export const REDIS_COMMANDS: RedisCommandSpec[] = [
  { command: "SET", description: "Set a string key to a value, with optional expiry.", args: [{ name: "key", placeholder: "session:123" }, { name: "value", placeholder: "abc" }, { name: "EX seconds", placeholder: "3600", optional: true }] },
  { command: "GET", description: "Get the value of a string key.", args: [{ name: "key", placeholder: "session:123" }] },
  { command: "DEL", description: "Delete one or more keys.", args: [{ name: "key(s)", placeholder: "session:123 session:456" }] },
  { command: "EXPIRE", description: "Set a key's time-to-live in seconds.", args: [{ name: "key", placeholder: "session:123" }, { name: "seconds", placeholder: "3600" }] },
  { command: "TTL", description: "Get the remaining time-to-live of a key.", args: [{ name: "key", placeholder: "session:123" }] },
  { command: "INCR", description: "Increment the integer value of a key by 1.", args: [{ name: "key", placeholder: "page:views" }] },
  { command: "INCRBY", description: "Increment the integer value of a key by an amount.", args: [{ name: "key", placeholder: "page:views" }, { name: "amount", placeholder: "5" }] },
  { command: "HSET", description: "Set field(s) in a hash.", args: [{ name: "key", placeholder: "user:1" }, { name: "field", placeholder: "name" }, { name: "value", placeholder: "Alice" }] },
  { command: "HGET", description: "Get a field's value from a hash.", args: [{ name: "key", placeholder: "user:1" }, { name: "field", placeholder: "name" }] },
  { command: "HGETALL", description: "Get all fields and values in a hash.", args: [{ name: "key", placeholder: "user:1" }] },
  { command: "LPUSH", description: "Prepend one or more values to a list.", args: [{ name: "key", placeholder: "queue:jobs" }, { name: "value(s)", placeholder: "job1 job2" }] },
  { command: "RPUSH", description: "Append one or more values to a list.", args: [{ name: "key", placeholder: "queue:jobs" }, { name: "value(s)", placeholder: "job1 job2" }] },
  { command: "LRANGE", description: "Get a range of elements from a list.", args: [{ name: "key", placeholder: "queue:jobs" }, { name: "start", placeholder: "0" }, { name: "stop", placeholder: "-1" }] },
  { command: "LPOP", description: "Remove and return the first element of a list.", args: [{ name: "key", placeholder: "queue:jobs" }] },
  { command: "SADD", description: "Add one or more members to a set.", args: [{ name: "key", placeholder: "tags:post:1" }, { name: "member(s)", placeholder: "redis cache" }] },
  { command: "SMEMBERS", description: "Get all members of a set.", args: [{ name: "key", placeholder: "tags:post:1" }] },
  { command: "SISMEMBER", description: "Check if a value is a member of a set.", args: [{ name: "key", placeholder: "tags:post:1" }, { name: "member", placeholder: "redis" }] },
  { command: "ZADD", description: "Add member(s) with scores to a sorted set.", args: [{ name: "key", placeholder: "leaderboard" }, { name: "score", placeholder: "100" }, { name: "member", placeholder: "player1" }] },
  { command: "ZRANGE", description: "Get a range of members from a sorted set by index.", args: [{ name: "key", placeholder: "leaderboard" }, { name: "start", placeholder: "0" }, { name: "stop", placeholder: "-1" }] },
  { command: "KEYS", description: "Find all keys matching a pattern (avoid in production; use SCAN instead).", args: [{ name: "pattern", placeholder: "session:*" }] },
  { command: "SCAN", description: "Incrementally iterate keys matching a pattern.", args: [{ name: "cursor", placeholder: "0" }, { name: "MATCH pattern", placeholder: "session:*", optional: true }] },
  { command: "EXISTS", description: "Check if a key exists.", args: [{ name: "key", placeholder: "session:123" }] },
  { command: "TYPE", description: "Get the data type stored at a key.", args: [{ name: "key", placeholder: "session:123" }] },
  { command: "RENAME", description: "Rename a key.", args: [{ name: "key", placeholder: "old:key" }, { name: "newkey", placeholder: "new:key" }] },
  { command: "PUBLISH", description: "Publish a message to a channel.", args: [{ name: "channel", placeholder: "notifications" }, { name: "message", placeholder: "hello" }] },
  { command: "SUBSCRIBE", description: "Subscribe to a channel.", args: [{ name: "channel", placeholder: "notifications" }] },
  { command: "FLUSHDB", description: "Delete all keys in the current database (use with caution).", args: [] },
];

export function buildRedisCommand(spec: RedisCommandSpec, values: string[]): string {
  const parts = [spec.command];
  spec.args.forEach((arg, i) => {
    const value = (values[i] ?? "").trim();
    if (!value) return;
    if (arg.name.includes(" ")) {
      const [flag] = arg.name.split(" ");
      parts.push(flag.toUpperCase(), value);
    } else {
      parts.push(value);
    }
  });
  return parts.join(" ");
}
