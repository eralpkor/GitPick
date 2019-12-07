#!/usr/bin/env python3
import shutil, errno, os, stat

# shutil.rmtree('../brandon/')
def handleRemoveReadonly(func, path, exc):
  excvalue = exc[1]
  if func in (os.rmdir, os.remove) and excvalue.errno == errno.EACCES:
    os.chmod(path, stat.S_IRWXU| stat.S_IRWXG| stat.S_IRWXO) # 0777
    func(path)
  else:
    raise

shutil.rmtree('../brandon/', ignore_errors=False, onerror=handleRemoveReadonly)