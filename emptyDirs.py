#!/usr/bin/env python3
import shutil, os, errno, stat

students = [
  { 
    'dir': 'gerard', 
    'user': 'juhrard'
  },
  {
    'dir': 'hudson',
    'user': 'hudson-m-c'
  },
  {
    'dir': 'humayun',
    'user': 'itshum'
  },
  {
    'dir': 'igor',
    'user': 'embiggenerd'
  },
  {
    'dir': 'jacob',
    'user': 'bremerjp'
  },
  {
    'dir': 'michael',
    'user': 'mphelps1978'
  },
  {
    'dir': 'nicholas',
    'user': 'Nsandomeno'
  }];

# run this if file read only
def handleRemoveReadonly(func, path, exc):
  excvalue = exc[1]
  if func in (os.rmdir, os.remove) and excvalue.errno == errno.EACCES:
      os.chmod(path, stat.S_IRWXU| stat.S_IRWXG| stat.S_IRWXO) # 0777
      func(path)
  else:
      raise

def clear_directories(folder):
  for filename in os.listdir(folder):
    file_path = os.path.join(folder, filename)
    try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path, ignore_errors=False, onerror=handleRemoveReadonly)
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (file_path, e))



for i in students:
  clear_directories('../' + i['dir'] + '/')
  print (i['dir'])